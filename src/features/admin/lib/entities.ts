import { CHART } from '@/components/charts'

/** Fixed entity colours: a filter never repaints the survivors. */
export const ENTITY_COLOR: Record<string, string> = {
  Damascus: CHART.primary,
  Aleppo: CHART.secondary,
  Homs: CHART.accent,
  T01: CHART.primary,
  T02: CHART.secondary,
  T03: CHART.accent,
  P01: CHART.primary,
  P02: CHART.secondary,
  employment: CHART.primary,
  freelance: CHART.secondary,
  enterprise: CHART.accent,
  female: CHART.primary,
  male: CHART.secondary,
  yes: CHART.primary,
  no: CHART.secondary,
  notDisclosed: CHART.neutral,
}

export const ORDER = {
  governorate: ['Damascus', 'Aleppo', 'Homs'],
  route: ['employment', 'freelance', 'enterprise'],
  gender: ['female', 'male'],
  ageGroup: ['18-20', '21-22', '23-24'],
  disability: ['yes', 'no', 'notDisclosed'],
  centreId: ['T01', 'T02', 'T03'],
  partnerId: ['P01', 'P02'],
  programmeId: ['PR01', 'PR02', 'PR03'],
} as const
