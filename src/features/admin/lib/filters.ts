import type {
  AnalyticsRow,
  CareerRoute,
  CentreId,
  CohortId,
  Governorate,
  PartnerId,
  Persona,
  ProgrammeId,
} from '@shared/types'
import { CENTRES, COHORTS, PARTNERS, PROGRAMMES } from '@/data/orgs'
import type { KpiFilters } from '@/domain/kpi'

/** Report period. The historical sample is one cumulative snapshot (1 Nov 2026). */
export type Period = 'toDate' | 'q4'

/** Every report filter (brief §19). Kept in the URL so drilldown links carry them. */
export interface AdminFilters {
  governorate?: Governorate
  partnerId?: PartnerId
  centreId?: CentreId
  programmeId?: ProgrammeId
  cohortId?: CohortId
  route?: CareerRoute
  gender?: AnalyticsRow['gender']
  ageGroup?: AnalyticsRow['ageGroup']
  disability?: AnalyticsRow['disability']
  period?: Period
}
export type AdminFilterKey = keyof AdminFilters

export const FILTER_OPTIONS = {
  governorate: ['Damascus', 'Aleppo', 'Homs'],
  partnerId: PARTNERS.map((p) => p.id),
  centreId: CENTRES.map((c) => c.id),
  programmeId: PROGRAMMES.map((p) => p.id),
  cohortId: COHORTS.map((c) => c.id),
  route: ['employment', 'freelance', 'enterprise'],
  gender: ['female', 'male'],
  ageGroup: ['18-20', '21-22', '23-24'],
  disability: ['yes', 'no', 'notDisclosed'],
  period: ['toDate', 'q4'],
} as const satisfies Record<AdminFilterKey, readonly string[]>

export const FILTER_KEYS = Object.keys(FILTER_OPTIONS) as AdminFilterKey[]

/** Read filters from URL search params, ignoring anything that is not a known value. */
export function parseFilters(search: Record<string, unknown>): AdminFilters {
  const out: Record<string, string> = {}
  for (const k of FILTER_KEYS) {
    const v = search[k]
    if (typeof v === 'string' && (FILTER_OPTIONS[k] as readonly string[]).includes(v)) out[k] = v
  }
  return out as AdminFilters
}

/** Scope a role may not change: centre admins see their centre, partners their network. */
export function lockedScope(p: Persona): AdminFilters {
  if (p.role === 'centre' && p.centreId) {
    const c = CENTRES.find((x) => x.id === p.centreId)
    return { centreId: p.centreId, partnerId: c?.partnerId }
  }
  if (p.role === 'partner' && p.partnerId) return { partnerId: p.partnerId }
  return {}
}

/** Options a scoped role may pick (partner admins only see their own centres). */
export function optionsFor(key: AdminFilterKey, p: Persona): readonly string[] {
  if (p.role === 'partner' && p.partnerId) {
    const centres = PARTNERS.find((x) => x.id === p.partnerId)?.centreIds ?? []
    if (key === 'centreId') return centres
    if (key === 'governorate')
      return CENTRES.filter((c) => centres.includes(c.id)).map((c) => c.governorate)
    if (key === 'cohortId')
      return COHORTS.filter((c) => centres.includes(c.centreId)).map((c) => c.id)
  }
  if (p.role === 'centre' && p.centreId) {
    if (key === 'governorate')
      return CENTRES.filter((c) => c.id === p.centreId).map((c) => c.governorate)
    if (key === 'cohortId') return COHORTS.filter((c) => c.centreId === p.centreId).map((c) => c.id)
  }
  return FILTER_OPTIONS[key]
}

/** Filters that apply to the historical rows (cohort and period are handled separately). */
export function toKpiFilters(f: AdminFilters): KpiFilters {
  const { cohortId: _c, period: _p, ...rest } = f
  return rest
}

export type HistoricalAvailability = 'ok' | 'cohort' | 'period'

/** Why the historical layer cannot answer this filter, if it cannot. */
export function historicalAvailability(f: AdminFilters): HistoricalAvailability {
  if (f.cohortId) return 'cohort'
  if (f.period === 'q4') return 'period'
  return 'ok'
}

/** Active filters as chip entries (period excluded; it is shown separately). */
export function activeFilters(f: AdminFilters): [AdminFilterKey, string][] {
  return FILTER_KEYS.filter((k) => k !== 'period' && f[k] !== undefined).map((k) => [
    k,
    f[k] as string,
  ])
}
