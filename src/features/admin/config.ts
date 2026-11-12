import type { CourseId, Governorate, OpportunityId } from '@shared/types'

/**
 * Seeded operational alert (brief §18): sample vacancies whose requested skill matches an
 * identified skills gap for the same location in the labour-market sample (SKILL_GAPS).
 */
export const VACANCY_GAPS: {
  opportunityId: OpportunityId
  governorate: Governorate
  gapIndex: number
  courseId: CourseId
}[] = [
  { opportunityId: 'O01', governorate: 'Damascus', gapIndex: 0, courseId: 'C03' },
  { opportunityId: 'O02', governorate: 'Damascus', gapIndex: 1, courseId: 'C14' },
]

/** Completion below this share of cohort-course enrolments raises a low-completion alert. */
export const LOW_COMPLETION = 50
