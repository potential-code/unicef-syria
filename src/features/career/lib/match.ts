import type { Application, CourseId, Localized, Opportunity, Youth } from '@shared/types'
import { trackFor } from '@/domain/application-stages'
import { EVIDENCE_RULE, routeForType } from '../config/opportunities'

/**
 * Recommendation explanation (brief §15 Y14): names the evidence that matches and the gaps.
 * Uses only the youth's demo record and the sample opportunity; never a score or probability.
 */
export type ToolkitItem = 'cv' | 'serviceProfile' | 'proposal' | 'businessConcept'

export type MatchItem =
  | { kind: 'route' }
  | { kind: 'course'; courseId: CourseId }
  | { kind: 'toolkit'; item: ToolkitItem }
  | { kind: 'skill'; mine: string; skill: Localized }

export type GapItem =
  | { kind: 'course'; courseId: CourseId }
  | { kind: 'toolkit'; item: ToolkitItem }

export interface MatchExplanation {
  matches: MatchItem[]
  gaps: GapItem[]
  recommended: boolean
}

function done(y: Youth, id: CourseId) {
  return Boolean(y.progress[id]?.completedAt)
}

/** Toolkit items an opportunity's track asks for, and whether the youth has saved each one. */
export function toolkitFor(y: Youth, opp: Opportunity): { item: ToolkitItem; ready: boolean }[] {
  const track = trackFor(opp.type)
  if (track === 'freelance') {
    return [
      { item: 'serviceProfile', ready: Boolean(y.toolkit.freelanceProfile) },
      { item: 'proposal', ready: y.toolkit.proposals.length > 0 },
    ]
  }
  if (track === 'enterprise')
    return [{ item: 'businessConcept', ready: Boolean(y.toolkit.business) }]
  return [{ item: 'cv', ready: Boolean(y.toolkit.cv) }]
}

const words = (s: string) =>
  s
    .toLowerCase()
    .split(/[^a-z؀-ۿ]+/)
    .filter((w) => w.length > 3)

export function explainMatch(y: Youth, opp: Opportunity): MatchExplanation {
  const matches: MatchItem[] = []
  const gaps: GapItem[] = []
  const routeMatch = y.route === routeForType(opp.type)
  if (routeMatch) matches.push({ kind: 'route' })
  for (const c of opp.evidenceCourses) {
    if (done(y, c)) matches.push({ kind: 'course', courseId: c })
    else gaps.push({ kind: 'course', courseId: c })
  }
  for (const t of toolkitFor(y, opp)) {
    if (t.ready) matches.push({ kind: 'toolkit', item: t.item })
    else gaps.push({ kind: 'toolkit', item: t.item })
  }
  const mine = [...y.profile.skills, ...y.profile.interests]
  for (const skill of opp.skills) {
    const target = words(skill.en)
    const hit = mine.find((m) =>
      words(m).some((w) => target.some((t) => t.startsWith(w) || w.startsWith(t))),
    )
    if (hit) matches.push({ kind: 'skill', mine: hit, skill })
  }
  const courseHits = matches.filter((m) => m.kind === 'course').length
  return { matches, gaps, recommended: opp.status === 'open' && (routeMatch || courseHits > 0) }
}

// ---------------------------------------------------------------- application requirements

export type RequirementKey =
  | 'cv'
  | 'courses'
  | 'motivation'
  | 'availability'
  | 'workSample'
  | 'serviceProfile'
  | 'portfolio'
  | 'proposal'
  | 'businessConcept'

export interface ApplyForm {
  attachCv: boolean
  attachBusiness: boolean
  motivation: string
  portfolioFile: string | null
  workSampleFile: string | null
  proposalId: string
}

export interface Requirement {
  key: RequirementKey
  met: boolean
  /** Where to fix it, when unmet. */
  fix?: 'toolkit' | 'courses' | 'profile' | 'form'
}

export const MOTIVATION_MIN = 20
export const MOTIVATION_MAX = 500

export function motivationOk(text: string) {
  const n = text.trim().length
  return n >= MOTIVATION_MIN && n <= MOTIVATION_MAX
}

/** Evidence courses: O01 needs all listed courses, others any one (brief §15 table). */
export function coursesMet(y: Youth, opp: Opportunity): boolean {
  if (opp.evidenceCourses.length === 0) return true
  const rule = EVIDENCE_RULE[opp.id] ?? 'any'
  return rule === 'all'
    ? opp.evidenceCourses.every((c) => done(y, c))
    : opp.evidenceCourses.some((c) => done(y, c))
}

/** Required evidence per track (brief §15, §22 "Submit application"). */
export function requirementsFor(y: Youth, opp: Opportunity, f: ApplyForm): Requirement[] {
  const track = trackFor(opp.type)
  if (track === 'freelance') {
    return [
      { key: 'serviceProfile', met: Boolean(y.toolkit.freelanceProfile), fix: 'toolkit' },
      { key: 'portfolio', met: Boolean(f.portfolioFile), fix: 'form' },
      {
        key: 'proposal',
        met: Boolean(f.proposalId),
        fix: y.toolkit.proposals.length ? 'form' : 'toolkit',
      },
    ]
  }
  if (track === 'enterprise') {
    return [
      {
        key: 'businessConcept',
        met: Boolean(y.toolkit.business) && f.attachBusiness,
        fix: y.toolkit.business ? 'form' : 'toolkit',
      },
      { key: 'motivation', met: motivationOk(f.motivation), fix: 'form' },
    ]
  }
  const list: Requirement[] = [
    { key: 'cv', met: Boolean(y.toolkit.cv) && f.attachCv, fix: y.toolkit.cv ? 'form' : 'toolkit' },
    { key: 'courses', met: coursesMet(y, opp), fix: 'courses' },
  ]
  if (opp.type === 'internship' || opp.type === 'partTime') {
    list.push({ key: 'availability', met: Boolean(y.profile.availability.trim()), fix: 'profile' })
  }
  if (opp.type === 'partTime')
    list.push({ key: 'workSample', met: Boolean(f.workSampleFile), fix: 'form' })
  list.push({ key: 'motivation', met: motivationOk(f.motivation), fix: 'form' })
  return list
}

/** Initial form state from an existing draft and the youth's toolkit. */
export function initialForm(y: Youth, app: Application | undefined): ApplyForm {
  const d = app?.documents ?? {}
  return {
    attachCv: d.cv ?? Boolean(y.toolkit.cv),
    attachBusiness: d.businessConcept ?? Boolean(y.toolkit.business),
    motivation: app?.motivation ?? '',
    portfolioFile: d.portfolio ? 'sample-portfolio.pdf' : null,
    workSampleFile: d.portfolio ? 'sample-work-schedule.pdf' : null,
    proposalId: d.proposal ? (y.toolkit.proposals[0]?.id ?? 'attached') : '',
  }
}

export function documentsFrom(opp: Opportunity, f: ApplyForm, y: Youth): Application['documents'] {
  const track = trackFor(opp.type)
  if (track === 'freelance')
    return { portfolio: Boolean(f.portfolioFile), proposal: Boolean(f.proposalId) }
  if (track === 'enterprise')
    return { businessConcept: f.attachBusiness && Boolean(y.toolkit.business) }
  return { cv: f.attachCv && Boolean(y.toolkit.cv), portfolio: Boolean(f.workSampleFile) }
}

/** Stable React key for a match or gap item. */
export function itemKey(m: MatchItem | GapItem): string {
  if (m.kind === 'route') return 'route'
  if (m.kind === 'course') return `course-${m.courseId}`
  if (m.kind === 'toolkit') return `toolkit-${m.item}`
  return `skill-${m.skill.en}`
}
