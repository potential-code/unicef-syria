import { POINTS } from '@/domain/points'

/** A second sample time shown as unavailable, to demonstrate the unavailable-slot state. */
export const UNAVAILABLE_SLOT_DAYS_LATER = 2

/** Activities that earn points toward a mentor session (brief §14 Y12). */
export const UNLOCK_ACTIVITIES = [
  { key: 'profile', points: POINTS.profile, once: true },
  { key: 'assessment', points: POINTS.assessment, once: true },
  { key: 'course', points: POINTS.course, once: false },
  { key: 'practical', points: POINTS.practical, once: false },
  { key: 'attendance', points: POINTS.attendance, once: false },
] as const
