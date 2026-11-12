import type { Application, ApplicationStage, OpportunityType } from '@shared/types'
import type { Tone } from '@/components/shared/StatusBadge'

/** Stages that end an application: no further employer actions. */
export const FINAL_STAGES: ApplicationStage[] = ['hired', 'completed', 'notSelected', 'withdrawn']

/** Badge tone per stage (text label always shown). */
export function stageTone(stage: ApplicationStage): Tone {
  if (stage === 'hired' || stage === 'completed') return 'success'
  if (stage === 'notSelected' || stage === 'withdrawn') return 'neutral'
  if (
    stage === 'offer' ||
    stage === 'selected' ||
    stage === 'accepted' ||
    stage === 'participating' ||
    stage === 'inDelivery'
  )
    return 'brand'
  if (stage === 'interview' || stage === 'clientDiscussion' || stage === 'shortlisted')
    return 'info'
  return 'notice'
}

/** Stages that count as "pending interview or discussion" on the dashboard. */
export const PENDING_INTERVIEW: ApplicationStage[] = ['interview', 'clientDiscussion']
const SHORTLIST_MARKS: ApplicationStage[] = ['shortlisted', 'clientDiscussion', 'accepted']

/** Reached the shortlist (or client discussion, or acceptance) and is still active or placed. */
export function reachedShortlist(a: Application): boolean {
  return (
    a.stage !== 'notSelected' &&
    a.stage !== 'withdrawn' &&
    a.timeline.some((e) => SHORTLIST_MARKS.includes(e.stage))
  )
}

/** Target stages that open a details form before moving. */
export const DETAIL_STAGES: ApplicationStage[] = [
  'interview',
  'clientDiscussion',
  'hired',
  'selected',
  'inDelivery',
  'completed',
]

export const OPP_TYPES: OpportunityType[] = [
  'job',
  'internship',
  'partTime',
  'freelance',
  'enterprise',
]
export const WORK_FORMATS = ['onsite', 'hybrid', 'remote'] as const
export const HOURS = ['fullTime', 'partTime'] as const
export const GOVERNORATES = ['Damascus', 'Aleppo', 'Homs', 'Remote'] as const
export const WORK_TYPES = ['fullTime', 'partTime', 'internship', 'contract'] as const
