import type { Youth } from '@shared/types'
import { useTranslation } from 'react-i18next'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { COHORT_COURSES, COHORTS } from '@/data/orgs'
import { courseStatus } from '@/domain/completion'
import { cohortCompletion } from '../lib/alerts'
import { useLabels } from '../lib/useLabels'
import { LearnerName } from './LearnerName'

/** Cohort-course completion per learner: enrolments, not unique people (brief §19). */
export function CompletionTable({ youth }: { youth: Youth[] }) {
  const { t } = useTranslation('admin')
  const { l, n, p } = useLabels()
  const cohorts = COHORTS.filter((k) => youth.some((y) => y.cohortIds.includes(k.id)))
  return (
    <div className="space-y-4">
      {cohorts.map((k) => {
        const c = cohortCompletion(youth, k.id)
        const members = youth.filter((y) => y.cohortIds.includes(k.id))
        return (
          <section key={k.id} className="card p-5">
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg">{l(k.name)}</h2>
              <p className="text-sm text-ink-soft">
                <strong className="text-ink">{p(c.rate)}</strong> ·{' '}
                {t('kpi.ratio', {
                  num: n(c.completed),
                  den: n(c.enrolments),
                  what: t('participants.cohortEnrolments'),
                })}
              </p>
            </div>
            <ul className="divide-y divide-border/70">
              {members.map((y) => (
                <li key={y.id} className="flex flex-wrap items-center justify-between gap-3 py-2.5">
                  <LearnerName y={y} to="/centre/participants/$youthId" />
                  <span className="flex flex-wrap gap-2">
                    {COHORT_COURSES[k.id].map((cid) => {
                      const s = courseStatus(y.progress[cid])
                      return (
                        <StatusBadge
                          key={cid}
                          tone={
                            s === 'completed' ? 'success' : s === 'inProgress' ? 'info' : 'neutral'
                          }
                        >
                          {cid} · {t(`common:status.${s}`)}
                        </StatusBadge>
                      )
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
