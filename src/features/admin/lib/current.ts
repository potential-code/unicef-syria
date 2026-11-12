import type {
  AnalyticsRow,
  Application,
  ApplicationStage,
  CentreId,
  CertificateState,
  Cohort,
  CourseId,
  FollowUp,
  Outcome,
  OutcomeType,
  Session,
  Youth,
  YouthId,
} from '@shared/types'
import { CENTRES, COHORT_COURSES, COHORTS, PROGRAMMES } from '@/data/orgs'
import type { AdminFilters } from './filters'

/** Centre a named learner belongs to: cohort, then training application, then follow-up. */
export function youthCentre(y: Youth, followUps: FollowUp[]): CentreId | undefined {
  const cohort = COHORTS.find((c) => y.cohortIds.includes(c.id))
  if (cohort) return cohort.centreId
  const prog = y.trainingApplication?.programmeId
  if (prog) return COHORTS.find((c) => c.programmeId === prog)?.centreId
  return followUps.find((f) => f.youthId === y.id)?.centreId
}

export function ageGroupOf(age: number): AnalyticsRow['ageGroup'] {
  return age <= 20 ? '18-20' : age <= 22 ? '21-22' : '23-24'
}

/** Cohorts matching the organisational filters (demographics do not apply to cohorts). */
export function cohortsMatching(f: AdminFilters): Cohort[] {
  return COHORTS.filter((k) => {
    const centre = CENTRES.find((c) => c.id === k.centreId)
    const prog = PROGRAMMES.find((p) => p.id === k.programmeId)
    return (
      (!f.cohortId || f.cohortId === k.id) &&
      (!f.centreId || f.centreId === k.centreId) &&
      (!f.partnerId || f.partnerId === centre?.partnerId) &&
      (!f.governorate || f.governorate === centre?.governorate) &&
      (!f.programmeId || f.programmeId === k.programmeId) &&
      (!f.route || f.route === prog?.route)
    )
  })
}

/** Named learners matching every filter (filters intersect). */
export function youthMatching(all: Youth[], f: AdminFilters, followUps: FollowUp[]): Youth[] {
  return all.filter((y) => {
    const centreId = youthCentre(y, followUps)
    const centre = CENTRES.find((c) => c.id === centreId)
    const prog =
      y.trainingApplication?.programmeId ??
      COHORTS.find((c) => y.cohortIds.includes(c.id))?.programmeId
    const route = PROGRAMMES.find((p) => p.id === prog)?.route ?? y.route
    const g = y.profile.gender
    return (
      !!centre &&
      (!f.centreId || f.centreId === centre.id) &&
      (!f.partnerId || f.partnerId === centre.partnerId) &&
      (!f.governorate || f.governorate === centre.governorate) &&
      (!f.programmeId || f.programmeId === prog) &&
      (!f.cohortId || y.cohortIds.includes(f.cohortId)) &&
      (!f.route || f.route === route) &&
      (!f.gender || f.gender === g) &&
      (!f.ageGroup || f.ageGroup === ageGroupOf(y.profile.age)) &&
      (!f.disability || f.disability === (y.profile.disability ?? 'notDisclosed'))
    )
  })
}

export interface PendingPractical {
  youthId: YouthId
  courseId: CourseId
}
export interface CertificateItem {
  youthId: YouthId
  courseId: CourseId
  state: CertificateState
}

/** Current cohort activity, computed live from the demo store (never from the historical rows). */
export function currentActivity(
  youthAll: Record<YouthId, Youth>,
  applications: Application[],
  outcomes: Outcome[],
  followUps: FollowUp[],
  sessions: Session[],
  f: AdminFilters,
) {
  const cohorts = cohortsMatching(f)
  const cohortIds = cohorts.map((c) => c.id)
  const youth = youthMatching(Object.values(youthAll), f, followUps)
  const ids = new Set(youth.map((y) => y.id))
  const inCohort = youth.filter((y) => y.cohortIds.some((k) => cohortIds.includes(k)))
  const active = youth.filter(
    (y) =>
      Object.values(y.progress).some(
        (p) => p && !p.completedAt && p.units.some((u) => u !== 'todo'),
      ) || Object.values(y.attendance).includes('present'),
  )
  const scopedSessions = sessions.filter((s) => s.cohortId && cohortIds.includes(s.cohortId))
  let present = 0
  let marked = 0
  for (const y of inCohort)
    for (const s of scopedSessions) {
      const m = y.attendance[s.id]
      if (m) marked++
      if (m === 'present') present++
    }
  const pendingPracticals: PendingPractical[] = []
  const certificates: CertificateItem[] = []
  for (const y of youth)
    for (const p of Object.values(y.progress)) {
      if (!p) continue
      if (p.practical === 'submitted' && !p.completedAt)
        pendingPracticals.push({ youthId: y.id, courseId: p.courseId })
      const reviewed = y.cohortIds.some((k) => COHORT_COURSES[k].includes(p.courseId))
      if (p.certificate && reviewed)
        certificates.push({ youthId: y.id, courseId: p.courseId, state: p.certificate })
    }
  const apps = applications.filter((a) => ids.has(a.youthId))
  const byStage: Partial<Record<ApplicationStage, number>> = {}
  for (const a of apps) byStage[a.stage] = (byStage[a.stage] ?? 0) + 1
  const outs = outcomes.filter((o) => ids.has(o.youthId))
  const outcomesByType: Record<OutcomeType, number> = {
    job: 0,
    internship: 0,
    freelanceSelected: 0,
    freelanceCompleted: 0,
    enterpriseAccepted: 0,
  }
  for (const o of outs) if (o.confirmed) outcomesByType[o.type]++
  return {
    cohorts,
    cohortPlaces: cohorts.reduce((a, c) => a + c.size, 0),
    youth,
    inCohort,
    active,
    sessions: scopedSessions,
    attendance: { present, marked },
    pendingPracticals,
    certificates,
    applications: apps,
    byStage,
    outcomes: outs,
    outcomesByType,
    followUps: followUps.filter((fu) => ids.has(fu.youthId)),
  }
}
export type CurrentActivity = ReturnType<typeof currentActivity>
