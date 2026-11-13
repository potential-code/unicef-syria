import type { AttendanceMark, CohortId, ProgrammeId, Session, YouthId } from '@shared/types'
import { L } from '@/data/l'
import { COHORTS } from '@/data/orgs'
import { SESSIONS } from '@/data/sessions'
import { award, POINTS } from '@/domain/points'
import { now } from '@/lib/clock'
import { update, useDb, withYouth } from '../db'
import { notify } from '../notify'
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
        y2 = award(
          y2,
          `attendance:${sessionId}`,
          'attendance',
          POINTS.attendance,
          L('Assigned session attended', 'حضور جلسة مخصصة'),
          now(),
        )
      }
      return refreshBadges(y2)
    })
    if (
      mark === 'absent' &&
      !db.reminders.some((r) => r.youthId === youthId && r.sessionId === sessionId)
    ) {
      next = { ...next, reminders: [...next.reminders, { youthId, sessionId, at: now() }] }
    }
    return next
  })
}

export function saveSessionNote(sessionId: string, note: string) {
  update((db) => ({ ...db, sessionNotes: { ...db.sessionNotes, [sessionId]: note } }))
}

export function createSession(s: Omit<Session, 'id'>) {
  update((db) => ({
    ...db,
    newSessions: [
      ...db.newSessions,
      { ...s, id: `SX${db.newSessions.length + 1}` as Session['id'] },
    ],
  }))
}

/** Trainer screening (brief §17 T01). The learner is notified in-app. */
export function decideTrainingApplication(
  youthId: YouthId,
  status: 'needsInfo' | 'accepted' | 'waitlisted' | 'notSelected',
) {
  update((db) => {
    const app = db.youth[youthId]?.trainingApplication
    if (!app) return db
    const next = withYouth(db, youthId, (y) => ({ ...y, trainingApplication: { ...app, status } }))
    return notify(
      next,
      youthId,
      'programmeDecision',
      { status, programme: app.programmeId },
      '/youth/programmes',
    )
  })
}

/** Learner applies to a centre programme (brief §17 T01; UNICEF: online application process). */
export function applyToProgramme(
  youthId: YouthId,
  programmeId: ProgrammeId,
  motivation: string,
  availability: string,
) {
  update((db) => {
    const y = db.youth[youthId]
    if (!y) return db
    const next = withYouth(db, youthId, (yy) => ({
      ...yy,
      trainingApplication: { programmeId, status: 'pending', at: now(), motivation, availability },
    }))
    const trainer = COHORTS.find((c) => c.programmeId === programmeId)?.trainerId
    return trainer
      ? notify(
          next,
          trainer,
          'programmeApplied',
          { name: y.profile.name, programme: programmeId },
          '/trainer/applications',
        )
      : next
  })
}

/** Assign an accepted learner to a cohort: restricted sessions appear for that learner only. */
export function assignCohort(youthId: YouthId, cohortId: CohortId) {
  update((db) => {
    if (db.youth[youthId]?.cohortIds.includes(cohortId)) return db
    const next = withYouth(db, youthId, (y) => ({ ...y, cohortIds: [...y.cohortIds, cohortId] }))
    return notify(next, youthId, 'cohortAssigned', { cohort: cohortId }, '/youth/cohort')
  })
}

export function cohortForProgramme(programmeId: ProgrammeId): CohortId | undefined {
  return COHORTS.find((c) => c.programmeId === programmeId)?.id
}
