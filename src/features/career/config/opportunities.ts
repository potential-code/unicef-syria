import type {
  Application,
  ApplicationStage,
  ApplicationTrack,
  CareerRoute,
  CourseId,
  Opportunity,
  OpportunityId,
  OpportunityType,
} from '@shared/types'
import type { Tone } from '@/components/shared/StatusBadge'
import { ORGANISATIONS } from '@/data/orgs'
import { STAGES } from '@/domain/application-stages'

/** Brief §15 Y14: three hub tabs. */
export type HubTab = 'jobs' | 'flex' | 'enterprise'
export type FilterKey = 'type' | 'location' | 'format' | 'deadline'

export interface HubTabConfig {
  id: HubTab
  types: OpportunityType[]
  filters: FilterKey[]
}
export const HUB_TAB_BY_ID: Record<HubTab, HubTabConfig> = {
  jobs: { id: 'jobs', types: ['job', 'internship'], filters: ['type', 'location', 'format'] },
  flex: { id: 'flex', types: ['partTime', 'freelance'], filters: ['type', 'format', 'deadline'] },
  enterprise: { id: 'enterprise', types: ['enterprise'], filters: ['location'] },
}
export const HUB_TABS: HubTabConfig[] = Object.values(HUB_TAB_BY_ID)

export const TAB_FOR_ROUTE: Record<CareerRoute, HubTab> = {
  employment: 'jobs',
  freelance: 'flex',
  enterprise: 'enterprise',
}

/** The career route an opportunity type serves ("Freelancing or part-time" covers both). */
export function routeForType(type: OpportunityType): CareerRoute {
  if (type === 'enterprise') return 'enterprise'
  if (type === 'freelance' || type === 'partTime') return 'freelance'
  return 'employment'
}

// O01 lists C03 and C13 evidence; the main walkthrough (§23 step 5) submits after one course, so
// any listed course counts and the other shows as a gap in the match explanation.
export const EVIDENCE_RULE: Partial<Record<OpportunityId, 'all' | 'any'>> = {}

/** Days ahead that count as a "closing soon" deadline in the part-time and freelance filter. */
export const SOON_DAYS = 14

/** Accent per type: colour block + icon tile (always paired with a text label). */
export const TYPE_ACCENT: Record<OpportunityType, { bar: string; tile: string }> = {
  job: { bar: 'bg-blue', tile: 'bg-blue text-white' },
  internship: { bar: 'bg-cyan', tile: 'bg-cyan text-ink' },
  partTime: { bar: 'bg-yellow', tile: 'bg-yellow text-ink' },
  freelance: { bar: 'bg-orange', tile: 'bg-orange text-white' },
  enterprise: { bar: 'bg-navy', tile: 'bg-navy text-white' },
}

export const SIMULATED_FILES = {
  portfolio: 'sample-portfolio.pdf',
  workSample: 'sample-work-schedule.pdf',
} as const

/** Stages where the learner can no longer withdraw. */
export const FINAL_STAGES: ApplicationStage[] = ['hired', 'completed', 'notSelected', 'withdrawn']

export function stageTone(stage: ApplicationStage): Tone {
  if (stage === 'draft' || stage === 'withdrawn') return 'neutral'
  if (stage === 'notSelected') return 'danger'
  if (['hired', 'completed', 'accepted', 'selected', 'participating', 'offer'].includes(stage))
    return 'success'
  if (['shortlisted', 'interview', 'clientDiscussion', 'inDelivery'].includes(stage)) return 'brand'
  return 'info'
}

/** Learning suggested after a Not selected outcome when no evidence course is missing. */
export const FALLBACK_COURSE: Record<ApplicationTrack, CourseId> = {
  employment: 'C06',
  freelance: 'C12',
  enterprise: 'C16',
}

/** Organisation display name, tolerant of employer-created opportunities. */
export function orgOf(orgId: string) {
  return ORGANISATIONS.find((o) => o.id === orgId)
}

export interface HubFilters {
  type: string
  location: string
  format: string
  deadline: string
  recommended: boolean
}
export const NO_FILTERS: HubFilters = {
  type: 'all',
  location: 'all',
  format: 'all',
  deadline: 'all',
  recommended: false,
}

const DAY = 86_400_000

/** Pure filter used by the hub; `recommended` comes from the match explanation. */
export function passesFilters(
  o: Opportunity,
  f: HubFilters,
  nowMs: number,
  recommended: boolean,
): boolean {
  if (f.type !== 'all' && o.type !== f.type) return false
  if (f.location !== 'all' && o.location.en !== f.location) return false
  if (f.format === 'inPerson' && o.workFormat === 'remote') return false
  if (f.format !== 'all' && f.format !== 'inPerson' && o.workFormat !== f.format) return false
  if (f.deadline !== 'all') {
    const days = (Date.parse(o.deadline) - nowMs) / DAY
    if (f.deadline === 'soon' && days > SOON_DAYS) return false
    if (f.deadline === 'later' && days <= SOON_DAYS) return false
  }
  if (f.recommended && !recommended) return false
  return true
}

/** Furthest forward stage reached, also on the Not selected and Withdrawn branches. */
export function reachedIndex(app: Application): number {
  const list = STAGES[app.track]
  const direct = list.indexOf(app.stage)
  if (direct >= 0) return direct
  return app.timeline.reduce((max, e) => Math.max(max, list.indexOf(e.stage)), 0)
}
