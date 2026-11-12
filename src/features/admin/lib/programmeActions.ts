import type { CentreId, FollowUp, ProgrammeId, Youth } from '@shared/types'
import type { TFunction } from 'i18next'
import { COHORTS, PROGRAMMES } from '@/data/orgs'
import type { Kpis } from '@/domain/kpi'
import type { ActionItem } from '../components/ActionList'
import { LOW_COMPLETION } from '../config'
import { cohortCompletion } from './alerts'

/** Next actions for one programme in scope, from live records and the historical sample. */
export function programmeActions(
  t: TFunction,
  programmeId: ProgrammeId,
  centreIds: CentreId[],
  youth: Youth[],
  followUps: FollowUp[],
  k: Kpis,
): ActionItem[] {
  const out: ActionItem[] = []
  const prog = PROGRAMMES.find((p) => p.id === programmeId)
  for (const cohort of COHORTS.filter(
    (c) => c.programmeId === programmeId && centreIds.includes(c.centreId),
  )) {
    const c = cohortCompletion(youth, cohort.id)
    if (c.enrolments && (c.rate ?? 0) < LOW_COMPLETION)
      out.push({
        id: `compl-${cohort.id}`,
        title: t('actions.completion', { cohort: cohort.id }),
        body: t('actions.completionBody', { completed: c.completed, enrolments: c.enrolments }),
      })
    for (const y of youth.filter((x) => x.cohortIds.includes(cohort.id)))
      for (const p of Object.values(y.progress))
        if (p?.practical === 'submitted' && !p.completedAt)
          out.push({
            id: `prac-${y.id}-${p.courseId}`,
            title: t('actions.practical', { name: y.profile.name, course: p.courseId }),
            body: t('actions.practicalBody'),
            to: '/partner/participants',
            search: { view: 'learners' },
          })
    for (const f of followUps.filter(
      (x) => x.centreId === cohort.centreId && x.status === 'overdue',
    ))
      out.push({
        id: `fu-${f.id}`,
        title: t('actions.followUp', { months: f.window }),
        body: t('actions.followUpBody'),
        to: '/partner/participants',
        search: {},
      })
  }
  const m3 = k.employment[0]
  if (prog?.route === 'employment' && m3 && m3.unknown > 0)
    out.push({
      id: 'unknown-3',
      title: t('actions.unknown', { count: m3.unknown }),
      body: t('actions.unknownBody'),
      to: '/partner/outcomes',
      search: { programmeId },
    })
  if (prog?.route === 'employment')
    out.push({ id: 'skills', title: t('actions.skills'), body: t('actions.skillsBody') })
  if (prog?.route === 'enterprise' && k.enterprise.concepts > 0)
    out.push({
      id: 'tests',
      title: t('actions.enterprise', {
        tests: k.enterprise.tests,
        concepts: k.enterprise.concepts,
      }),
      body: t('actions.enterpriseBody'),
    })
  if (prog?.route === 'freelance' && k.freelance.completed > 0)
    out.push({
      id: 'repeat',
      title: t('actions.freelance', {
        repeat: k.freelance.repeatClients,
        earners: k.freelance.earners,
      }),
      body: t('actions.freelanceBody'),
    })
  return out
}
