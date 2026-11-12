import type { CentreId, CohortId, CourseId, FollowUp, Youth, YouthId } from '@shared/types'
import { CENTRES, COHORT_COURSES, COHORTS } from '@/data/orgs'
import { pct } from '@/domain/kpi'
import { LOW_COMPLETION, VACANCY_GAPS } from '../config'

export type AlertKind = 'completion' | 'followUp' | 'vacancies' | 'practical'

export interface OpsAlert {
  kind: AlertKind
  severity: 'high' | 'medium'
  /** Values for the alert sentence. */
  data: Record<string, string | number>
  cohortId?: CohortId
  youthIds?: YouthId[]
  courseId?: CourseId
}

/** Cohort-course completion for named learners (completed enrolments / enrolments). */
export function cohortCompletion(youth: Youth[], cohortId: CohortId) {
  const members = youth.filter((y) => y.cohortIds.includes(cohortId))
  const courses = COHORT_COURSES[cohortId]
  const enrolments = members.length * courses.length
  const completed = members.reduce(
    (a, y) => a + courses.filter((c) => y.progress[c]?.completedAt).length,
    0,
  )
  return { members: members.length, enrolments, completed, rate: pct(completed, enrolments) }
}

/** Operational alerts for the centres in scope, all derived from the demo store and samples. */
export function opsAlerts(
  youth: Youth[],
  followUps: FollowUp[],
  centreIds: CentreId[],
): OpsAlert[] {
  const out: OpsAlert[] = []
  for (const k of COHORTS.filter((c) => centreIds.includes(c.centreId))) {
    const c = cohortCompletion(youth, k.id)
    if (c.enrolments > 0 && (c.rate ?? 0) < LOW_COMPLETION) {
      out.push({
        kind: 'completion',
        severity: 'high',
        cohortId: k.id,
        data: { cohort: k.id, completed: c.completed, enrolments: c.enrolments, rate: c.rate ?? 0 },
      })
      break
    }
  }
  const overdue = followUps.filter((f) => f.status === 'overdue' && centreIds.includes(f.centreId))
  if (overdue.length)
    out.push({
      kind: 'followUp',
      severity: 'high',
      youthIds: overdue.map((f) => f.youthId),
      data: { count: overdue.length },
    })
  const govs = CENTRES.filter((c) => centreIds.includes(c.id)).map((c) => c.governorate)
  const gaps = VACANCY_GAPS.filter((v) => govs.includes(v.governorate))
  if (gaps.length)
    out.push({
      kind: 'vacancies',
      severity: 'medium',
      data: { count: gaps.length, ids: gaps.map((g) => g.opportunityId).join(', ') },
    })
  const inScope = youth.filter((y) => {
    const k = COHORTS.find((c) => y.cohortIds.includes(c.id))
    return k && centreIds.includes(k.centreId)
  })
  for (const y of inScope)
    for (const p of Object.values(y.progress))
      if (p && p.practical === 'submitted' && !p.completedAt)
        out.push({
          kind: 'practical',
          severity: 'medium',
          youthIds: [y.id],
          courseId: p.courseId,
          data: { name: y.profile.name, course: p.courseId },
        })
  return out
}
