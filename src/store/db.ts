import type {
  Application,
  CommunityPost,
  FollowUp,
  MentorBooking,
  Opportunity,
  OrgId,
  Outcome,
  PersonaId,
  Prefs,
  ResourceLink,
  Session,
  SessionId,
  Youth,
  YouthId,
} from '@shared/types'
import { useSyncExternalStore } from 'react'
import { COMMUNITY_POSTS } from '@/data/community'
import { seedApplications, seedFollowUps, seedOutcomes, seedYouth } from '@/data/youth'

/**
 * One versioned demo database in localStorage. Every role reads the same records with stable IDs,
 * so a change made as one role shows when the presenter switches roles. Reset restores the seeded
 * snapshot (applications, points, course state and attendance together) and keeps the session.
 */
const KEY = 'unicef-syria-demo-db'
const VERSION = 3

export type NoticeKind =
  | 'programmeApplied'
  | 'programmeDecision'
  | 'cohortAssigned'
  | 'practicalReviewed'
  | 'certificateIssued'
  | 'graduated'
  | 'applicationStage'
  | 'applicationSubmitted'

/** In-app notification (brief §16: notifications are simulated in-app only). */
export interface InAppNotice {
  id: string
  /** A persona id (staff) or youth id (learner). */
  to: PersonaId | YouthId
  kind: NoticeKind
  params: Record<string, string>
  /** Where clicking the notice goes. */
  link?: string
  at: string
  read: boolean
}

export interface DemoDb {
  version: number
  session: { personaId: PersonaId | null }
  prefs: Prefs
  youth: Record<YouthId, Youth>
  applications: Application[]
  outcomes: Outcome[]
  followUps: FollowUp[]
  bookings: MentorBooking[]
  /** Opportunities created by employers in the demo, plus status overrides on seeded ones. */
  newOpportunities: Opportunity[]
  opportunityStatus: Partial<Record<string, Opportunity['status']>>
  orgApproved: Partial<Record<OrgId, boolean>>
  /** Sessions created by trainers in the demo. */
  newSessions: Session[]
  sessionNotes: Partial<Record<SessionId | string, string>>
  /** Trainer resource links (T04); optional so saved demos from before still load. */
  resourceLinks?: ResourceLink[]
  /** Per-session support reminders created by Absent marks. */
  reminders: { youthId: YouthId; sessionId: string; at: string }[]
  posts: CommunityPost[]
  notices: InAppNotice[]
  employerFeedback: {
    orgId: OrgId
    strengths: string
    missing: string
    needs: string
    at: string
  }[]
  /** Booked mentor slots (one booking per slot). */
  bookedSlots: string[]
}

function seed(keep?: Pick<DemoDb, 'session' | 'prefs'>): DemoDb {
  return {
    version: VERSION,
    session: keep?.session ?? { personaId: null },
    prefs: keep?.prefs ?? { lang: 'en', reducedMotion: false },
    youth: seedYouth(),
    applications: seedApplications(),
    outcomes: seedOutcomes(),
    followUps: seedFollowUps(),
    bookings: [],
    newOpportunities: [],
    opportunityStatus: {},
    orgApproved: {},
    newSessions: [],
    sessionNotes: {},
    reminders: [],
    posts: COMMUNITY_POSTS,
    notices: [],
    employerFeedback: [],
    bookedSlots: [],
  }
}

function load(): DemoDb {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return seed()
    const parsed = JSON.parse(raw) as DemoDb
    return parsed?.version === VERSION ? parsed : seed()
  } catch {
    return seed()
  }
}

let state: DemoDb = load()
const listeners = new Set<() => void>()

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // Storage blocked (private mode): the demo still works for this visit.
  }
}
persist()

export function getDb(): DemoDb {
  return state
}

/** Immutable update: pass a function that returns the next state. */
export function update(fn: (db: DemoDb) => DemoDb) {
  state = fn(state)
  persist()
  for (const l of listeners) l()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** Select a slice. Keep selectors returning stable references (no new arrays/objects). */
export function useDb<T>(selector: (db: DemoDb) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(state),
    () => selector(state),
  )
}

/** Reset demo: every connected record returns to the seeded baseline. */
export function resetDemo() {
  update((db) => seed({ session: db.session, prefs: db.prefs }))
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key !== KEY) return
    state = load()
    for (const l of listeners) l()
  })
}

/** Shallow helper: replace one youth record. */
export function withYouth(db: DemoDb, id: YouthId, fn: (y: Youth) => Youth): DemoDb {
  const y = db.youth[id]
  return y ? { ...db, youth: { ...db.youth, [id]: fn(y) } } : db
}
