import type {
  Application,
  ApplicationStage,
  Opportunity,
  OpportunityId,
  OrgId,
  Outcome,
  YouthId,
} from '@shared/types'
import { OPPORTUNITIES } from '@/data/opportunities'
import { isPlacement, trackFor } from '@/domain/application-stages'
import { now } from '@/lib/clock'
import { type DemoDb, getDb, update, useDb } from '../db'

export function allOpportunities(db: DemoDb): Opportunity[] {
  return [...OPPORTUNITIES, ...db.newOpportunities].map((o) => ({
    ...o,
    status: db.opportunityStatus[o.id] ?? o.status,
  }))
}
export function useOpportunities(): Opportunity[] {
  const created = useDb((db) => db.newOpportunities)
  const status = useDb((db) => db.opportunityStatus)
  return [...OPPORTUNITIES, ...created].map((o) => ({ ...o, status: status[o.id] ?? o.status }))
}
export function useApplications() {
  return useDb((db) => db.applications)
}

function setApp(id: string, fn: (a: Application) => Application) {
  update((db) => ({ ...db, applications: db.applications.map((a) => (a.id === id ? fn(a) : a)) }))
}

/** Save or update a draft (one application per youth and opportunity). */
export function saveDraft(
  youthId: YouthId,
  opportunityId: OpportunityId,
  patch: Partial<Application>,
) {
  const db = getDb()
  const existing = db.applications.find(
    (a) => a.youthId === youthId && a.opportunityId === opportunityId,
  )
  if (existing) {
    setApp(existing.id, (a) => ({ ...a, ...patch }))
    return existing.id
  }
  const opp = allOpportunities(db).find((o) => o.id === opportunityId)
  const id = `A-${opportunityId}-${youthId}`
  const app: Application = {
    id,
    youthId,
    opportunityId,
    track: trackFor(opp?.type ?? 'job'),
    stage: 'draft',
    timeline: [{ stage: 'draft', at: now(), by: 'youth' }],
    documents: {},
    ...patch,
  }
  update((d) => ({ ...d, applications: [...d.applications, app] }))
  return id
}

export function submitApplication(id: string) {
  setApp(id, (a) =>
    a.stage === 'draft'
      ? {
          ...a,
          stage: 'submitted',
          timeline: [...a.timeline, { stage: 'submitted', at: now(), by: 'youth' }],
        }
      : a,
  )
}

export function withdrawApplication(id: string) {
  setApp(id, (a) => ({
    ...a,
    stage: 'withdrawn',
    timeline: [...a.timeline, { stage: 'withdrawn', at: now(), by: 'youth' }],
  }))
}

/**
 * Employer or client moves an application. The same record updates the learner timeline.
 * Hiring records a confirmed job start; an offer alone is not a placement (brief §16 E03).
 * Freelance selection and completion are recorded separately.
 */
export function moveApplication(
  id: string,
  stage: ApplicationStage,
  note?: string,
  feedback?: string,
) {
  update((db) => {
    const app = db.applications.find((a) => a.id === id)
    if (!app) return db
    const at = now()
    const applications = db.applications.map((a) =>
      a.id === id
        ? {
            ...a,
            stage,
            feedback: feedback ?? a.feedback,
            timeline: [...a.timeline, { stage, at, by: 'employer' as const, note }],
          }
        : a,
    )
    const opp = allOpportunities(db).find((o) => o.id === app.opportunityId)
    let outcome: Outcome | null = null
    if (isPlacement(stage))
      outcome = {
        id: `OUT-${id}`,
        youthId: app.youthId,
        type: opp?.type === 'internship' ? 'internship' : 'job',
        opportunityId: app.opportunityId,
        date: at,
        source: 'employer',
        confirmed: true,
      }
    if (app.track === 'freelance' && stage === 'selected')
      outcome = {
        id: `OUT-${id}-sel`,
        youthId: app.youthId,
        type: 'freelanceSelected',
        opportunityId: app.opportunityId,
        date: at,
        source: 'employer',
        confirmed: true,
      }
    if (app.track === 'freelance' && stage === 'completed')
      outcome = {
        id: `OUT-${id}-done`,
        youthId: app.youthId,
        type: 'freelanceCompleted',
        opportunityId: app.opportunityId,
        date: at,
        source: 'employer',
        confirmed: true,
      }
    if (app.track === 'enterprise' && stage === 'accepted')
      outcome = {
        id: `OUT-${id}-acc`,
        youthId: app.youthId,
        type: 'enterpriseAccepted',
        opportunityId: app.opportunityId,
        date: at,
        source: 'employer',
        confirmed: true,
      }
    const outcomes =
      outcome && !db.outcomes.some((o) => o.id === outcome.id)
        ? [...db.outcomes, outcome]
        : db.outcomes
    const notices = [
      ...db.notices,
      {
        id: `N${db.notices.length + 1}`,
        to: app.youthId,
        text: `application:${stage}:${app.opportunityId}`,
        at,
        read: false,
      },
    ]
    return { ...db, applications, outcomes, notices }
  })
}

export function createOpportunity(o: Omit<Opportunity, 'id' | 'status'>) {
  update((db) => ({
    ...db,
    newOpportunities: [
      ...db.newOpportunities,
      {
        ...o,
        id: `O${String(7 + db.newOpportunities.length).padStart(2, '0')}` as OpportunityId,
        status: 'open',
      },
    ],
  }))
}

export function setOpportunityStatus(id: string, status: Opportunity['status']) {
  update((db) => ({ ...db, opportunityStatus: { ...db.opportunityStatus, [id]: status } }))
}

export function approveOrganisation(orgId: OrgId) {
  update((db) => ({ ...db, orgApproved: { ...db.orgApproved, [orgId]: true } }))
}

export function saveEmployerFeedback(
  orgId: OrgId,
  strengths: string,
  missing: string,
  needs: string,
) {
  update((db) => ({
    ...db,
    employerFeedback: [...db.employerFeedback, { orgId, strengths, missing, needs, at: now() }],
  }))
}
