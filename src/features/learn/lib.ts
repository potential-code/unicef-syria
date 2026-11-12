import type { CourseId, CourseProgress, Youth, YouthId } from '@shared/types'
import { COURSE_BY_ID } from '@/data/courses'
import { isComplete } from '@/domain/completion'
import { isCohortCourse } from '@/store/actions/learning'

/** Deterministic demonstration certificate ID. */
export function certificateId(courseId: CourseId, youthId: YouthId): string {
  return `UNY-${courseId}-${youthId}`
}

export function isCourseId(id: string): id is CourseId {
  return id in COURSE_BY_ID
}

/** Where to resume a course: first unit not done (1-based), else the quiz. */
export function resumeTarget(p: CourseProgress | undefined): number | 'quiz' {
  if (!p) return 1
  const i = p.units.findIndex((u) => u !== 'done')
  return i === -1 ? 'quiz' : i + 1
}

/** Practical and quiz done but the course is waiting for trainer review. */
export function awaitingReview(y: Youth, courseId: CourseId): boolean {
  const p = y.progress[courseId]
  return (
    !!p &&
    !p.completedAt &&
    isCohortCourse(y, courseId) &&
    p.practical === 'submitted' &&
    isComplete({ ...p, practical: 'approved' }, true)
  )
}
