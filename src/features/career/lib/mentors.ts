import type { Mentor, MentorBooking, Youth } from '@shared/types'
import { cohortTrainerIds } from './youth'

/** Programme allocation: the mentor is also a trainer of one of the youth's cohorts. */
export function hasAllocation(y: Youth, m: Mentor): boolean {
  return !!m.trainerId && cohortTrainerIds(y).includes(m.trainerId)
}

export type SlotState = 'available' | 'mine' | 'taken'

export function slotState(
  m: Mentor,
  y: Youth,
  bookings: MentorBooking[],
  bookedSlots: string[],
): SlotState {
  if (bookings.some((b) => b.mentorId === m.id && b.youthId === y.id && b.status === 'booked'))
    return 'mine'
  return bookedSlots.includes(m.id) ? 'taken' : 'available'
}
