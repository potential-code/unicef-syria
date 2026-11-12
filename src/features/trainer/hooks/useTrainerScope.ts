import type { CohortId, CourseId, Session, Youth } from '@shared/types'
import { COHORT_COURSES, COHORTS } from '@/data/orgs'
import { canSeeYouth, cohortsInScope } from '@/domain/access'
import { needsTrainerSupport, unitsDone } from '@/domain/completion'
import { useSessions } from '@/store/actions/sessions'
import { useAllYouth } from '@/store/actions/youth'
import { useDb } from '@/store/db'
import { useMe } from '@/store/hooks'

export interface LearnerStats {
  youth: Youth
  cohortId: CohortId
  /** Cohort-course unit progress, 0 to 100. */
  progress: number
  present: number
  absent: number
  excused: number
  /** Present over (present + absent); excused tracked separately. Null when nothing is marked. */
  attendanceRate: number | null
  /** Practical submissions awaiting review (any course). */
  pendingPracticals: CourseId[]
  assessment: 'passed' | 'pending' | 'needsSupport' | 'notStarted'
  followUp: boolean
  reminders: number
}

/** Everything a trainer may see: assigned cohorts only (brief §17, §18). */
export function useTrainerScope() {
  const me = useMe()
  const youth = useAllYouth()
  const sessions = useSessions()
  const reminders = useDb((db) => db.reminders)
  const cohortIds = cohortsInScope(me)
  const cohorts = COHORTS.filter((c) => cohortIds.includes(c.id))
  const mySessions: Session[] = sessions.filter((s) => s.cohortId && cohortIds.includes(s.cohortId))
  const learners = Object.values(youth).filter((y) =>
    y.cohortIds.some((k) => cohortIds.includes(k)),
  )
  const applicants = Object.values(youth).filter(
    (y) =>
      !!y.trainingApplication &&
      canSeeYouth(me, y) &&
      cohorts.some((c) => c.programmeId === y.trainingApplication?.programmeId),
  )

  const stats: LearnerStats[] = learners.map((y) => {
    const cohortId = y.cohortIds.find((k) => cohortIds.includes(k)) as CohortId
    const courses = COHORT_COURSES[cohortId]
    const totalUnits = courses.length * 4
    const done = courses.reduce((n, c) => n + unitsDone(y.progress[c]), 0)
    const cohortSessionIds = mySessions
      .filter((s) => s.cohortId === cohortId)
      .map((s) => s.id as string)
    const marks = Object.entries(y.attendance)
      .filter(([sid]) => cohortSessionIds.includes(sid))
      .map(([, m]) => m)
    const present = marks.filter((m) => m === 'present').length
    const absent = marks.filter((m) => m === 'absent').length
    const excused = marks.filter((m) => m === 'excused').length
    const pendingPracticals = (
      Object.values(y.progress).filter((p) => p?.practical === 'submitted') as {
        courseId: CourseId
      }[]
    ).map((p) => p.courseId)
    const cohortProgress = courses.map((c) => y.progress[c])
    const assessment = cohortProgress.some((p) => needsTrainerSupport(p))
      ? 'needsSupport'
      : cohortProgress.every((p) => (p?.quizBest ?? 0) >= 80)
        ? 'passed'
        : cohortProgress.some(
              (p) => p && (p.units.some((u) => u !== 'todo') || p.quizAttempts.length > 0),
            )
          ? 'pending'
          : 'notStarted'
    const myReminders = reminders.filter((r) => r.youthId === y.id).length
    return {
      youth: y,
      cohortId,
      progress: totalUnits ? Math.round((done / totalUnits) * 100) : 0,
      present,
      absent,
      excused,
      attendanceRate:
        present + absent > 0 ? Math.round((present / (present + absent)) * 100) : null,
      pendingPracticals,
      assessment,
      followUp: absent > 0 || myReminders > 0 || !!y.supportFlag || assessment === 'needsSupport',
      reminders: myReminders,
    }
  })

  return { me, cohortIds, cohorts, sessions: mySessions, learners, applicants, stats }
}

export type TrainerScope = ReturnType<typeof useTrainerScope>

/** Panel totals. Attendance = present / (present + absent); excused is reported separately. */
export function summarise(stats: LearnerStats[]) {
  const present = stats.reduce((n, s) => n + s.present, 0)
  const absent = stats.reduce((n, s) => n + s.absent, 0)
  const excused = stats.reduce((n, s) => n + s.excused, 0)
  const courseSlots = stats.reduce((n, s) => n + COHORT_COURSES[s.cohortId].length, 0)
  const completed = stats.reduce(
    (n, s) => n + COHORT_COURSES[s.cohortId].filter((c) => s.youth.progress[c]?.completedAt).length,
    0,
  )
  return {
    learners: stats.length,
    present,
    absent,
    excused,
    attendanceRate: present + absent > 0 ? Math.round((present / (present + absent)) * 100) : null,
    completed,
    courseSlots,
    completionRate: courseSlots ? Math.round((completed / courseSlots) * 100) : 0,
    pendingGrading: stats.reduce((n, s) => n + s.pendingPracticals.length, 0),
    followUp: stats.filter((s) => s.followUp).length,
  }
}
