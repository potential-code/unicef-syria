import type { Course, CourseProgress, UnitStatus } from '@shared/types'

export const QUIZ_PASS = 80
export const QUIZ_ATTEMPTS = 2

export function emptyProgress(course: Course): CourseProgress {
  return {
    courseId: course.id,
    units: course.units.map(() => 'todo' as UnitStatus),
    quizAttempts: [],
    practical: 'none',
  }
}

export function unitsDone(p: CourseProgress | undefined): number {
  return p ? p.units.filter((u) => u === 'done').length : 0
}

export function quizPassed(p: CourseProgress | undefined): boolean {
  return (p?.quizBest ?? 0) >= QUIZ_PASS
}

/** True when the two demo attempts are used without a pass: show trainer-support guidance. */
export function needsTrainerSupport(p: CourseProgress | undefined): boolean {
  return !!p && p.quizAttempts.length >= QUIZ_ATTEMPTS && !quizPassed(p)
}

/** Self-paced practical tasks count once submitted; cohort tasks need trainer approval. */
export function practicalDone(p: CourseProgress | undefined, reviewed = false): boolean {
  return p?.practical === 'approved' || (!reviewed && p?.practical === 'submitted')
}

/** What is still missing before the course counts as complete (brief §5 progress rules). */
export function missingRequirements(
  p: CourseProgress | undefined,
  reviewed = false,
): ('units' | 'quiz' | 'practical')[] {
  const out: ('units' | 'quiz' | 'practical')[] = []
  if (!p || p.units.some((u) => u !== 'done')) out.push('units')
  if (!quizPassed(p)) out.push('quiz')
  if (!practicalDone(p, reviewed)) out.push('practical')
  return out
}

export function isComplete(p: CourseProgress | undefined, reviewed = false): boolean {
  return missingRequirements(p, reviewed).length === 0
}

export type CourseStatus = 'todo' | 'inProgress' | 'completed'
export function courseStatus(p: CourseProgress | undefined): CourseStatus {
  if (p?.completedAt) return 'completed'
  if (p && (p.units.some((u) => u !== 'todo') || p.quizAttempts.length > 0)) return 'inProgress'
  return 'todo'
}

/** Practical rubric (brief §17 T04): three criteria 0–2; at least 4 of 6 meets the threshold. */
export const RUBRIC_PASS = 4
export function rubricPasses(scores: number[]): boolean {
  return scores.reduce((a, b) => a + b, 0) >= RUBRIC_PASS
}
