import type { Session } from '@shared/types'
import { nowMs } from '@/lib/clock'
import { SAMPLE_COMPLETED_SESSION } from '../config/cohort'

export type SessionTiming = 'completed' | 'past' | 'upcoming'

/** Completed sample (S01), other past sessions, or upcoming against the demo clock. */
export function sessionTiming(s: Session): SessionTiming {
  if (s.id === SAMPLE_COMPLETED_SESSION) return 'completed'
  return Date.parse(s.end) < nowMs() ? 'past' : 'upcoming'
}

/** Calendar day key in Syria time (seed times carry +03:00). */
export function dayKey(iso: string): string {
  return iso.slice(0, 10)
}
