import type { CareerRoute, CourseId, Dimension } from '@shared/types'

/** Recommended sequences per route (brief §5). Courses come only from the catalogue. */
export const ROUTE_PATHS: Record<CareerRoute, CourseId[]> = {
  employment: ['C01', 'C02', 'C03', 'C05', 'C06', 'C13'],
  enterprise: ['C01', 'C02', 'C03', 'C07', 'C08', 'C09', 'C16'],
  freelance: ['C01', 'C02', 'C03', 'C10', 'C11', 'C12', 'C15'],
}
export const OPTIONAL_COURSES: CourseId[] = ['C04', 'C14']

export const ROUTE_MILESTONES: Record<CareerRoute, string[]> = {
  employment: ['profile', 'cv', 'interview', 'evidence', 'application'],
  enterprise: ['problem', 'customerEvidence', 'businessModel', 'cashPlan', 'pitch'],
  freelance: ['serviceProfile', 'workSample', 'proposal', 'clientDiscussion', 'assignment'],
}

/** Generated plan = route sequence, keeping already completed courses; optional extras last. */
export function generatePlan(route: CareerRoute, top: Dimension[]): CourseId[] {
  const plan = [...ROUTE_PATHS[route]]
  if (top.includes('O') || top.includes('P')) plan.push('C14')
  return plan
}
