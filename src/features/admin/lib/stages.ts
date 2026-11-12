import type { ApplicationStage } from '@shared/types'
import { CHART } from '@/components/charts'

export type StageGroup = 'draft' | 'review' | 'advanced' | 'outcome' | 'closed'

export const STAGE_GROUP: Record<ApplicationStage, StageGroup> = {
  draft: 'draft',
  submitted: 'review',
  underReview: 'review',
  review: 'review',
  clientDiscussion: 'review',
  shortlisted: 'advanced',
  interview: 'advanced',
  offer: 'advanced',
  selected: 'advanced',
  accepted: 'advanced',
  inDelivery: 'advanced',
  participating: 'advanced',
  hired: 'outcome',
  completed: 'outcome',
  notSelected: 'closed',
  withdrawn: 'closed',
}

export const STAGE_GROUPS: StageGroup[] = ['draft', 'review', 'advanced', 'outcome', 'closed']
export const STAGE_COLOR: Record<StageGroup, string> = {
  draft: CHART.neutral,
  review: CHART.secondary,
  advanced: CHART.primary,
  outcome: CHART.deep,
  closed: CHART.accent,
}
