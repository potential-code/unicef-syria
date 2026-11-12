import type { CareerRoute, CourseId, Dimension, PreferenceKey, Youth, YouthId, YouthProfile } from '@shared/types'
import { L } from '@/data/l'
import { freshNour } from '@/data/youth'
import { generatePlan } from '@/domain/paths'
import { award, earnedBadges, POINTS } from '@/domain/points'
import { profileFor, scoreAnswers } from '@/domain/scoring'
import { now } from '@/lib/clock'
import { update, useDb, withYouth } from '../db'

/** Recompute badges after any change that can earn one. */
export function refreshBadges(y: Youth): Youth {
  return { ...y, badges: earnedBadges(y) }
}

export function useYouth(id: YouthId | undefined) {
  return useDb((db) => (id ? db.youth[id] : undefined))
}
export function useAllYouth() {
  return useDb((db) => db.youth)
}

/** Main walkthrough step 1: replace Nour with a freshly registered profile. */
export function startFreshRegistration() {
  update((db) => ({
    ...db,
    youth: { ...db.youth, Y001: freshNour() },
    applications: db.applications.filter((a) => a.youthId !== 'Y001' || a.opportunityId === 'O01').map((a) =>
      a.youthId === 'Y001' ? { ...a, stage: 'draft', timeline: [{ stage: 'draft', at: now(), by: 'youth' }], documents: {} } : a,
    ),
    bookings: db.bookings.filter((b) => b.youthId !== 'Y001'),
  }))
}

export function saveProfile(id: YouthId, profile: YouthProfile, complete: boolean) {
  update((db) =>
    withYouth(db, id, (y) => {
      let next: Youth = { ...y, profile, profileComplete: y.profileComplete || complete }
      if (complete) next = award(next, 'profile', 'profile', POINTS.profile, L('Profile completed', 'اكتمال الملف الشخصي'), now())
      return next
    }),
  )
}

export function completeAssessment(id: YouthId, answers: Dimension[]) {
  update((db) =>
    withYouth(db, id, (y) => {
      const next: Youth = { ...y, assessment: { answers, scores: scoreAnswers(answers), completedAt: now() } }
      // Retakes never earn more.
      return refreshBadges(award(next, 'assessment', 'assessment', POINTS.assessment, L('Career discovery completed', 'إكمال استكشاف المسار المهني'), now()))
    }),
  )
}

export function setPreference(id: YouthId, key: PreferenceKey, value: string) {
  update((db) => withYouth(db, id, (y) => ({ ...y, preferences: { ...y.preferences, [key]: value } })))
}

/** Choose or change route. Completed learning and points stay (brief §4, §22). */
export function chooseRoute(id: YouthId, route: CareerRoute, secondary?: CareerRoute) {
  update((db) => withYouth(db, id, (y) => refreshBadges({ ...y, route, secondaryRoute: secondary, pathGenerated: false })))
}

export function generatePath(id: YouthId) {
  update((db) =>
    withYouth(db, id, (y) => {
      if (!y.route) return y
      const top = y.assessment ? profileFor(y.assessment.scores).top : []
      return { ...y, plan: generatePlan(y.route, top), pathGenerated: true }
    }),
  )
}

export function addToPlan(id: YouthId, courseId: CourseId) {
  update((db) => withYouth(db, id, (y) => (y.plan.includes(courseId) ? y : { ...y, plan: [...y.plan, courseId] })))
}
export function reorderPlan(id: YouthId, plan: CourseId[]) {
  update((db) => withYouth(db, id, (y) => ({ ...y, plan })))
}
export function registerForEvent(id: YouthId, sessionId: 'E01') {
  update((db) =>
    withYouth(db, id, (y) =>
      y.eventRegistrations.includes(sessionId) ? y : { ...y, eventRegistrations: [...y.eventRegistrations, sessionId] },
    ),
  )
}
