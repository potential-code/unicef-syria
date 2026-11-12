import type {
  AnalyticsRow,
  CareerRoute,
  CentreId,
  Governorate,
  PartnerId,
  ProgrammeId,
} from '@shared/types'

/**
 * Synthetic historical dataset, snapshot 1 November 2026 (brief §20). Separate from the three
 * named youth. Built as disjoint partition rows (route × centre × gender × age × disability) by
 * largest-remainder apportionment, so every filter combination sums exactly and national totals
 * match the brief. Deterministic: no randomness.
 */
export const SNAPSHOT_DATE = '2026-11-01'

type Metric = Exclude<
  keyof AnalyticsRow,
  | 'partnerId'
  | 'centreId'
  | 'governorate'
  | 'programmeId'
  | 'route'
  | 'gender'
  | 'ageGroup'
  | 'disability'
>

const ROUTE_TOTALS: Record<CareerRoute, Partial<Record<Metric, number>>> = {
  employment: {
    registered: 600,
    active: 432,
    enrolments: 720,
    completedEnrolments: 540,
    graduates: 240,
    guided: 192,
    jobStarts: 140,
    internships: 40,
    bothPlacements: 10,
    m3Eligible: 200,
    m3Responses: 180,
    m3Employed: 120,
    m6Eligible: 120,
    m6Responses: 100,
    m6Employed: 66,
    m12Eligible: 60,
    m12Responses: 50,
    m12Employed: 30,
    daysToJobSum: 5880,
    retentionEligible: 100,
    retentionResponses: 90,
    retained: 75,
  },
  freelance: {
    registered: 250,
    active: 180,
    enrolments: 300,
    completedEnrolments: 225,
    graduates: 100,
    guided: 80,
    freelanceCompleted: 80,
    freelanceEarners: 50,
    repeatClients: 15,
  },
  enterprise: {
    registered: 150,
    active: 108,
    enrolments: 180,
    completedEnrolments: 135,
    graduates: 60,
    guided: 48,
    businessConcepts: 90,
    customerTests: 35,
    clinicAcceptances: 20,
    firstSales: 8,
  },
}

const CENTRES: {
  centreId: CentreId
  partnerId: PartnerId
  governorate: Governorate
  share: number
}[] = [
  { centreId: 'T01', partnerId: 'P01', governorate: 'Damascus', share: 0.45 },
  { centreId: 'T02', partnerId: 'P02', governorate: 'Aleppo', share: 0.3 },
  { centreId: 'T03', partnerId: 'P01', governorate: 'Homs', share: 0.25 },
]
const GENDERS = [
  { v: 'female', share: 0.52 },
  { v: 'male', share: 0.48 },
] as const
const AGES = [
  { v: '18-20', share: 0.35 },
  { v: '21-22', share: 0.35 },
  { v: '23-24', share: 0.3 },
] as const
const DISABILITY = [
  { v: 'yes', share: 0.06 },
  { v: 'no', share: 0.74 },
  { v: 'notDisclosed', share: 0.2 },
] as const
const PROGRAMME: Record<CareerRoute, ProgrammeId> = {
  employment: 'PR01',
  enterprise: 'PR02',
  freelance: 'PR03',
}

const METRICS: Metric[] = [
  'registered',
  'active',
  'enrolments',
  'completedEnrolments',
  'graduates',
  'guided',
  'jobStarts',
  'internships',
  'bothPlacements',
  'm3Eligible',
  'm3Responses',
  'm3Employed',
  'm6Eligible',
  'm6Responses',
  'm6Employed',
  'm12Eligible',
  'm12Responses',
  'm12Employed',
  'daysToJobSum',
  'retentionEligible',
  'retentionResponses',
  'retained',
  'freelanceCompleted',
  'freelanceEarners',
  'repeatClients',
  'businessConcepts',
  'customerTests',
  'clinicAcceptances',
  'firstSales',
]

/** Split an integer total across weights so the parts sum exactly (largest remainder). */
export function apportion(total: number, weights: number[]): number[] {
  const sum = weights.reduce((a, b) => a + b, 0)
  const raw = weights.map((w) => (total * w) / sum)
  const parts = raw.map(Math.floor)
  let left = total - parts.reduce((a, b) => a + b, 0)
  const order = raw
    .map((r, i) => ({ i, rem: r - Math.floor(r) }))
    .sort((a, b) => b.rem - a.rem || a.i - b.i)
  for (const { i } of order) {
    if (left <= 0) break
    parts[i] = (parts[i] ?? 0) + 1
    left--
  }
  return parts
}

function build(): AnalyticsRow[] {
  const rows: AnalyticsRow[] = []
  for (const route of ['employment', 'freelance', 'enterprise'] as const) {
    const cells: Omit<AnalyticsRow, Metric>[] = []
    const weights: number[] = []
    for (const c of CENTRES)
      for (const g of GENDERS)
        for (const a of AGES)
          for (const d of DISABILITY) {
            cells.push({
              partnerId: c.partnerId,
              centreId: c.centreId,
              governorate: c.governorate,
              programmeId: PROGRAMME[route],
              route,
              gender: g.v,
              ageGroup: a.v,
              disability: d.v,
            })
            weights.push(c.share * g.share * a.share * d.share)
          }
    const split = Object.fromEntries(
      METRICS.map((m) => [m, apportion(ROUTE_TOTALS[route][m] ?? 0, weights)]),
    ) as Record<Metric, number[]>
    cells.forEach((cell, i) => {
      const row = { ...cell } as AnalyticsRow
      for (const m of METRICS) row[m] = split[m][i] ?? 0
      rows.push(row)
    })
  }
  return rows
}

export const ANALYTICS_ROWS: AnalyticsRow[] = build()
