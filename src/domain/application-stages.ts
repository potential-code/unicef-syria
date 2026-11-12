import type { ApplicationStage, ApplicationTrack, OpportunityType } from '@shared/types'

/** Brief §15 Y15: stages differ per track. */
export const STAGES: Record<ApplicationTrack, ApplicationStage[]> = {
  employment: ['draft', 'submitted', 'underReview', 'shortlisted', 'interview', 'offer', 'hired'],
  freelance: ['draft', 'submitted', 'clientDiscussion', 'selected', 'inDelivery', 'completed'],
  enterprise: ['draft', 'submitted', 'review', 'accepted', 'participating', 'completed'],
}
export const END_BRANCHES: ApplicationStage[] = ['notSelected', 'withdrawn']

export function trackFor(type: OpportunityType): ApplicationTrack {
  if (type === 'freelance') return 'freelance'
  if (type === 'enterprise') return 'enterprise'
  return 'employment'
}

/** The next forward stage, or null at the end or on a closed branch. */
export function nextStage(track: ApplicationTrack, stage: ApplicationStage): ApplicationStage | null {
  const list = STAGES[track]
  const i = list.indexOf(stage)
  if (i < 0 || i === list.length - 1) return null
  return list[i + 1] ?? null
}

export function stageIndex(track: ApplicationTrack, stage: ApplicationStage): number {
  return STAGES[track].indexOf(stage)
}

/** Hiring is a confirmed placement; an offer alone is not (brief §16 E03). */
export function isPlacement(stage: ApplicationStage): boolean {
  return stage === 'hired'
}
