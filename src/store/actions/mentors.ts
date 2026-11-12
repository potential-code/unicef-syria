import type { MentorBooking, MentorId, YouthId } from '@shared/types'
import { L } from '@/data/l'
import { MENTORS } from '@/data/mentors'
import { award, balance, MENTOR_COST } from '@/domain/points'
import { now } from '@/lib/clock'
import { getDb, update, useDb, withYouth } from '../db'

export function useBookings(youthId?: YouthId) {
  const all = useDb((db) => db.bookings)
  return youthId ? all.filter((b) => b.youthId === youthId) : all
}

export type BookResult = 'ok' | 'slotTaken' | 'insufficientPoints' | 'alreadyBooked'

/** Book a sample slot: deduct 100 points once, or use the programme allocation. */
export function bookMentor(youthId: YouthId, mentorId: MentorId, goal: string, question: string, method: 'points' | 'allocation'): BookResult {
  const db = getDb()
  const y = db.youth[youthId]
  if (!y) return 'insufficientPoints'
  if (db.bookings.some((b) => b.youthId === youthId && b.mentorId === mentorId && b.status === 'booked')) return 'alreadyBooked'
  if (db.bookedSlots.includes(mentorId)) return 'slotTaken'
  if (method === 'points' && balance(y) < MENTOR_COST) return 'insufficientPoints'
  const id = `B-${mentorId}-${youthId}-${db.bookings.length + 1}`
  const booking: MentorBooking = { id, mentorId, youthId, goal, question, method, status: 'booked' }
  const mentor = MENTORS.find((m) => m.id === mentorId)
  update((d) => {
    let next = { ...d, bookings: [...d.bookings, booking], bookedSlots: [...d.bookedSlots, mentorId] }
    if (method === 'points') {
      next = withYouth(next, youthId, (yy) =>
        award(yy, `mentor:${id}`, 'mentor', -MENTOR_COST, { en: `Mentor session: ${mentor?.name.en ?? ''}`, ar: `جلسة إرشاد: ${mentor?.name.ar ?? ''}` }, now()),
      )
    }
    return next
  })
  return 'ok'
}

/** Cancel before the session: points come back once. */
export function cancelBooking(bookingId: string) {
  update((db) => {
    const b = db.bookings.find((x) => x.id === bookingId)
    if (!b || b.status !== 'booked') return db
    let next = {
      ...db,
      bookings: db.bookings.map((x) => (x.id === bookingId ? { ...x, status: 'cancelled' as const } : x)),
      bookedSlots: db.bookedSlots.filter((s) => s !== b.mentorId),
    }
    if (b.method === 'points') {
      next = withYouth(next, b.youthId, (y) => award(y, `refund:${b.id}`, 'mentorRefund', MENTOR_COST, L('Mentor booking cancelled, points returned', 'إلغاء حجز الإرشاد، إعادة النقاط'), now()))
    }
    return next
  })
}

/** Simulate a completed session with mentor feedback and two agreed actions. */
export function completeBooking(bookingId: string, rating?: number) {
  update((db) => ({
    ...db,
    bookings: db.bookings.map((b) =>
      b.id === bookingId
        ? {
            ...b,
            status: 'completed' as const,
            feedback: {
              note: L('Good preparation. You explained your goal clearly and asked focused questions.', 'تحضير جيد. شرحت هدفك بوضوح وطرحت أسئلة مركزة.'),
              actions: [
                L('Update your CV summary with one specific example.', 'حدّث ملخص سيرتك الذاتية بمثال محدد.'),
                L('Practise one interview answer using the STAR worksheet.', 'تدرّب على إجابة مقابلة واحدة باستخدام ورقة STAR.'),
              ],
              rating,
            },
          }
        : b,
    ),
  }))
}

export function rateBooking(bookingId: string, rating: number) {
  update((db) => ({
    ...db,
    bookings: db.bookings.map((b) => (b.id === bookingId && b.feedback ? { ...b, feedback: { ...b.feedback, rating } } : b)),
  }))
}
