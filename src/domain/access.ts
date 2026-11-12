import type { CentreId, CohortId, Persona, Role, Youth } from '@shared/types'
import { CENTRES, COHORTS, PARTNERS, TRAINERS } from '@/data/orgs'

/**
 * Role scope for the front-end prototype (brief §18 Role boundaries). Production enforcement
 * would need backend controls; this only decides what each view displays.
 */
export function centresInScope(p: Persona): CentreId[] {
  if (p.role === 'centre' && p.centreId) return [p.centreId]
  if (p.role === 'partner' && p.partnerId) return PARTNERS.find((x) => x.id === p.partnerId)?.centreIds ?? []
  if (p.role === 'unicef' || p.role === 'viewer') return CENTRES.map((c) => c.id)
  if (p.role === 'trainer') return COHORTS.filter((c) => cohortsInScope(p).includes(c.id)).map((c) => c.centreId)
  return []
}

export function cohortsInScope(p: Persona): CohortId[] {
  if (p.role === 'trainer') return TRAINERS.find((t) => t.id === p.trainerId)?.cohortIds ?? []
  const centres = centresInScope(p)
  return COHORTS.filter((c) => centres.includes(c.centreId)).map((c) => c.id)
}

/** Can this persona open this youth's individual record? Viewer never sees individuals. */
export function canSeeYouth(p: Persona, y: Youth): boolean {
  if (p.role === 'youth') return p.youthId === y.id
  if (p.role === 'viewer' || p.role === 'employer') return false
  if (p.role === 'unicef') return true
  const cohorts = cohortsInScope(p)
  if (y.cohortIds.some((c) => cohorts.includes(c))) return true
  // Applicants to a programme run at a centre in scope (trainer screening, centre admin).
  const programme = y.trainingApplication?.programmeId
  return !!programme && COHORTS.some((c) => c.programmeId === programme && cohorts.includes(c.id))
}

/** Fields an employer may see: applicant-approved career evidence only (brief §16 E02, §22). */
export const EMPLOYER_HIDDEN_FIELDS = ['assessment', 'disability', 'support', 'coachingNotes'] as const

export const ROLE_HOME: Record<Role, string> = {
  youth: '/youth',
  trainer: '/trainer',
  employer: '/employer',
  centre: '/centre',
  partner: '/partner',
  unicef: '/unicef',
  viewer: '/viewer',
}
