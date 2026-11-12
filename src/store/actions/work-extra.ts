import type { Session } from '@shared/types'
import { getDb, update, useDb } from '../db'

/**
 * Trainer session extras (brief §17 T03): joining placeholder or centre room, resources and the
 * linked assignment. Stored inside `sessionNotes` under `details:<sessionId>` so Reset demo clears
 * them with every other record. Seeded sessions keep their catalogue fields; created ones are editable.
 */
export interface SessionDetails {
  room: string
  link: string
  resources: string
  assignment: string
}

const detailsKey = (sessionId: string) => `details:${sessionId}`
const EMPTY: SessionDetails = { room: '', link: '', resources: '', assignment: '' }

export function parseSessionDetails(raw: string | undefined): SessionDetails {
  if (!raw) return EMPTY
  try {
    return { ...EMPTY, ...(JSON.parse(raw) as Partial<SessionDetails>) }
  } catch {
    return EMPTY
  }
}

/** Raw JSON string (stable reference for useSyncExternalStore); parse with parseSessionDetails. */
export function useSessionDetailsRaw(sessionId: string) {
  return useDb((db) => db.sessionNotes[detailsKey(sessionId)])
}

export function saveSessionDetails(sessionId: string, details: SessionDetails) {
  update((db) => ({
    ...db,
    sessionNotes: { ...db.sessionNotes, [detailsKey(sessionId)]: JSON.stringify(details) },
  }))
}

/** Edit a trainer-created session (seeded sample sessions are read-only catalogue data). */
export function updateCreatedSession(id: string, patch: Partial<Omit<Session, 'id'>>) {
  update((db) => ({
    ...db,
    newSessions: db.newSessions.map((s) => (s.id === id ? { ...s, ...patch } : s)),
  }))
}

/** The id the next createSession call will assign, so details can be saved alongside it. */
export function nextCreatedSessionId() {
  return `SX${getDb().newSessions.length + 1}`
}

/** Rubric scores and feedback for one practical review (brief §17 T04), kept with the demo db. */
export interface PracticalReview {
  scores: number[]
  feedback: string
  approved: boolean
  at: string
}
const reviewKey = (youthId: string, courseId: string) => `review:${youthId}:${courseId}`

export function useReviewRaw(youthId: string, courseId: string) {
  return useDb((db) => db.sessionNotes[reviewKey(youthId, courseId)])
}
export function parseReview(raw: string | undefined): PracticalReview | null {
  if (!raw) return null
  try {
    return JSON.parse(raw) as PracticalReview
  } catch {
    return null
  }
}
export function saveReview(youthId: string, courseId: string, review: PracticalReview) {
  update((db) => ({
    ...db,
    sessionNotes: { ...db.sessionNotes, [reviewKey(youthId, courseId)]: JSON.stringify(review) },
  }))
}
