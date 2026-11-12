import type { AttendanceMark, CohortId, ProgrammeId, Session, YouthId } from '@shared/types'
import { L } from '@/data/l'
import { COHORTS } from '@/data/orgs'
import { SESSIONS } from '@/data/sessions'
import { award, POINTS } from '@/domain/points'
import { now } from '@/lib/clock'
import { update, useDb, withYouth } from '../db'
import { refreshBadges } from './youth'

export function useSessions(): Session[] {
  const created = useDb((db) => db.newSessions)
  return created.length ? [...SESSIONS, ...created] : SESSIONS
}

/**
 * Attendance (brief §17 T03): Present counts and earns 20 points once; Excused is tracked;
 * Absent creates a support reminder. Changing a mark never re-awards points.
 */
export function markAttendance(youthId: YouthId, sessionId: string, mark: AttendanceMark) {
  update((db) => {
    let next = withYouth(db, youthId, (y) => {
      let y2 = { ...y, attendance: { ...y.attendance, [sessionId]: mark } }
      if (mark === 'present') {
        y2 = award(y2, `attendance:${sessionId}`, 'attendance', POINTS.attendance, L('Assigned session attended', 'حضور جلسة مخصصة'), now())
      }
      return refreshBadges(y2)
    })
    if (mark === 'absent' && !db.reminders.some((r) => r.youthId === youthId && r.sessionId === sessionId)) {
      next = { ...next, reminders: [...next.reminders, { youthId, sessionId, at: now() }] }
    }
    return next
  })
}

export function saveSessionNote(sessionId: string, note: string) {
  update((db) => ({ ...db, sessionNotes: { ...db.sessionNotes, [sessionId]: note } }))
}

export function createSession(s: Omit<Session, 'id'>) {
  update((db) => ({ ...db, newSessions: [...db.newSessions, { ...s, id: `SX${db.newSessions.length + 1}` as Session['id'] }] }))
}

/** Trainer screening (brief §17 T01). */
export function decideTrainingApplication(
  youthId: YouthId,
  status: 'needsInfo' | 'accepted' | 'waitlisted' | 'notSelected',
) {
  update((db) =>
    withYouth(db, youthId, (y) =>
      y.trainingApplication ? { ...y, trainingApplication: { ...y.trainingApplication, status } } : y,
    ),
  )
}

/** Assign an accepted learner to a cohort: restricted sessions appear for that learner only. */
export function assignCohort(youthId: YouthId, cohortId: CohortId) {
  update((db) =>
    withYouth(db, youthId, (y) => (y.cohortIds.includes(cohortId) ? y : { ...y, cohortIds: [...y.cohortIds, cohortId] })),
  )
}

export function cohortForProgramme(programmeId: ProgrammeId): CohortId | undefined {
  return COHORTS.find((c) => c.programmeId === programmeId)?.id
}
