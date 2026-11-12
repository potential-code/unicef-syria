import type { CertificateState, CourseId, CourseProgress, UnitStatus, Youth, YouthId } from '@shared/types'
import { COURSE_BY_ID } from '@/data/courses'
import { L } from '@/data/l'
import { COHORT_COURSES } from '@/data/orgs'
import { emptyProgress, isComplete, QUIZ_ATTEMPTS } from '@/domain/completion'
import { award, POINTS } from '@/domain/points'
import { now } from '@/lib/clock'
import { update, withYouth } from '../db'
import { refreshBadges } from './youth'

/** True when this course is delivered inside one of the youth's cohorts (reviewed + approved). */
export function isCohortCourse(y: Youth, courseId: CourseId): boolean {
  return y.cohortIds.some((k) => COHORT_COURSES[k].includes(courseId))
}

function progressOf(y: Youth, courseId: CourseId): CourseProgress {
  return y.progress[courseId] ?? emptyProgress(COURSE_BY_ID[courseId])
}

/** Marks completion, awards course points once and starts the certificate flow. */
function settle(y: Youth, courseId: CourseId): Youth {
  const reviewed = isCohortCourse(y, courseId)
  const p = progressOf(y, courseId)
  if (p.completedAt || !isComplete(p, reviewed)) return y
  const certificate: CertificateState = reviewed ? 'pendingReview' : 'issued'
  const done: CourseProgress = { ...p, completedAt: now(), certificate }
  const title = COURSE_BY_ID[courseId].title
  const next = { ...y, progress: { ...y.progress, [courseId]: done } }
  return refreshBadges(
    award(next, `course:${courseId}`, 'course', POINTS.course, { en: `Course completed: ${title.en}`, ar: `إكمال الدورة: ${title.ar}` }, now()),
  )
}

function patch(id: YouthId, courseId: CourseId, fn: (p: CourseProgress, y: Youth) => CourseProgress) {
  update((db) =>
    withYouth(db, id, (y) => {
      const p = fn(progressOf(y, courseId), y)
      return settle({ ...y, progress: { ...y.progress, [courseId]: p } }, courseId)
    }),
  )
}

export function startCourse(id: YouthId, courseId: CourseId) {
  patch(id, courseId, (p) => (p.units.every((u) => u === 'todo') ? { ...p, units: p.units.map((u, i) => (i === 0 ? 'inProgress' : u)) } : p))
}

export function setUnitStatus(id: YouthId, courseId: CourseId, index: number, status: UnitStatus) {
  patch(id, courseId, (p) => {
    const units = p.units.map((u, i) => (i === index ? status : u))
    // Opening the next unit marks it in progress.
    if (status === 'done' && units[index + 1] === 'todo') units[index + 1] = 'inProgress'
    return { ...p, units }
  })
}

/** Records one quiz attempt. Two demo attempts, then trainer-support guidance. */
export function submitQuiz(id: YouthId, courseId: CourseId, score: number) {
  patch(id, courseId, (p) => {
    if (p.quizAttempts.length >= QUIZ_ATTEMPTS && (p.quizBest ?? 0) < 80) return p
    return { ...p, quizAttempts: [...p.quizAttempts, score], quizBest: Math.max(p.quizBest ?? 0, score) }
  })
}

/** Self-paced: counts on submission. Cohort course: waits for trainer review. */
export function submitPractical(id: YouthId, courseId: CourseId) {
  patch(id, courseId, (p) => ({ ...p, practical: 'submitted' }))
}

/** Trainer rubric review (brief §17 T04). Approval awards practical points once. */
export function reviewPractical(id: YouthId, courseId: CourseId, approved: boolean) {
  update((db) =>
    withYouth(db, id, (y) => {
      const p = progressOf(y, courseId)
      let next: Youth = { ...y, progress: { ...y.progress, [courseId]: { ...p, practical: approved ? 'approved' : 'returned' } } }
      if (approved) {
        next = award(next, `practical:${courseId}`, 'practical', POINTS.practical, L('Practical output approved', 'اعتماد المهمة العملية'), now())
      }
      return settle(next, courseId)
    }),
  )
}

/** Trainer recommends → centre approves → issued (brief §17 T05). */
export function setCertificate(id: YouthId, courseId: CourseId, state: CertificateState) {
  update((db) =>
    withYouth(db, id, (y) => {
      const p = y.progress[courseId]
      return p?.completedAt ? { ...y, progress: { ...y.progress, [courseId]: { ...p, certificate: state } } } : y
    }),
  )
}

/** Presenter shortcut: finish every remaining unit, pass the quiz and submit the practical. */
export function completeCourseShortcut(id: YouthId, courseId: CourseId) {
  patch(id, courseId, (p) => ({
    ...p,
    units: p.units.map(() => 'done'),
    quizAttempts: p.quizBest && p.quizBest >= 80 ? p.quizAttempts : [...p.quizAttempts, 100],
    quizBest: Math.max(p.quizBest ?? 0, 100),
    practical: p.practical === 'approved' ? 'approved' : 'submitted',
  }))
}
