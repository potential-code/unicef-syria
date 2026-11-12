import type { AnalyticsRow, CareerRoute, CentreId, Governorate, PartnerId, ProgrammeId } from '@shared/types'

export interface KpiFilters {
  governorate?: Governorate
  partnerId?: PartnerId
  centreId?: CentreId
  programmeId?: ProgrammeId
  route?: CareerRoute
  gender?: AnalyticsRow['gender']
  ageGroup?: AnalyticsRow['ageGroup']
  disability?: AnalyticsRow['disability']
}
export type FilterKey = keyof KpiFilters

type Num = Exclude<keyof AnalyticsRow, FilterKey>
export type Totals = Record<Num, number>

/** Filters intersect (AND). Rows are disjoint, so sums never double count. */
export function filterRows(rows: AnalyticsRow[], f: KpiFilters): AnalyticsRow[] {
  return rows.filter((r) =>
    (Object.keys(f) as FilterKey[]).every((k) => f[k] === undefined || r[k] === f[k]),
  )
}

export function sumRows(rows: AnalyticsRow[]): Totals {
  const t = {} as Totals
  for (const r of rows) {
    for (const [k, v] of Object.entries(r)) {
      if (typeof v === 'number') t[k as Num] = (t[k as Num] ?? 0) + v
    }
  }
  return t
}

export function pct(num: number, den: number): number | null {
  return den > 0 ? Math.round((num / den) * 1000) / 10 : null
}

export interface Rate {
  value: number | null
  numerator: number
  denominator: number
}
const rate = (n: number, d: number): Rate => ({ value: pct(n, d), numerator: n, denominator: d })

/** All brief §19 KPIs, with explicit numerators and denominators. */
export function kpis(t: Totals) {
  const tot = (k: Num) => t[k] ?? 0
  return {
    registered: tot('registered'),
    active: tot('active'),
    completionRate: rate(tot('completedEnrolments'), tot('enrolments')),
    guidanceCoverage: rate(tot('guided'), tot('graduates')),
    graduates: tot('graduates'),
    jobStarts: tot('jobStarts'),
    internships: tot('internships'),
    uniquePlaced: tot('jobStarts') + tot('internships') - tot('bothPlacements'),
    employment: ([3, 6, 12] as const).map((m) => ({
      months: m,
      rate: rate(tot(`m${m}Employed` as Num), tot(`m${m}Eligible` as Num)),
      coverage: rate(tot(`m${m}Responses` as Num), tot(`m${m}Eligible` as Num)),
      unknown: tot(`m${m}Eligible` as Num) - tot(`m${m}Responses` as Num),
    })),
    avgDaysToJob: tot('jobStarts') > 0 ? Math.round(tot('daysToJobSum') / tot('jobStarts')) : null,
    retention: {
      rate: rate(tot('retained'), tot('retentionEligible')),
      unknown: tot('retentionEligible') - tot('retentionResponses'),
    },
    freelance: {
      completed: tot('freelanceCompleted'),
      earners: tot('freelanceEarners'),
      repeatClients: tot('repeatClients'),
    },
    enterprise: {
      concepts: tot('businessConcepts'),
      tests: tot('customerTests'),
      acceptances: tot('clinicAcceptances'),
      firstSales: tot('firstSales'),
    },
  }
}
export type Kpis = ReturnType<typeof kpis>

/** Group distinct registered youth by one dimension (for participation charts). */
export function breakdown<K extends FilterKey>(rows: AnalyticsRow[], key: K, metric: Num = 'registered') {
  const out = new Map<AnalyticsRow[K], number>()
  for (const r of rows) out.set(r[key], (out.get(r[key]) ?? 0) + r[metric])
  return [...out.entries()].map(([k, v]) => ({ key: k, value: v }))
}
