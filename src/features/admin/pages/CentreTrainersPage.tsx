import type { TrainerId } from '@shared/types'
import { GraduationCap } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { COHORTS } from '@/data/orgs'
import { formatTime } from '@/i18n'
import { nowMs } from '@/lib/clock'
import { useSessions } from '@/store/actions/sessions'
import { useAllYouth } from '@/store/actions/youth'
import { TrainerAssignment } from '../components/TrainerAssignment'
import { useLabels } from '../lib/useLabels'
import { useScope } from '../lib/useScope'

/** Trainer assignments for the own centre's cohorts, with sessions and attendance recorded. */
export function CentreTrainersPage() {
  const { t } = useTranslation('admin')
  const { l, d, n, lang } = useLabels()
  const { cohortIds } = useScope()
  const sessions = useSessions()
  const youth = useAllYouth()
  const [assign, setAssign] = useState<Record<string, TrainerId>>({})
  const cohorts = COHORTS.filter((c) => cohortIds.includes(c.id))
  return (
    <div className="space-y-6">
      <PageHeader title={t('trainers.title')} description={t('trainers.body')} />
      {cohorts.length === 0 && (
        <EmptyState
          icon={GraduationCap}
          title={t('empty.noCohorts')}
          body={t('empty.noCohortsBody')}
        />
      )}
      <div className="grid gap-4 lg:grid-cols-2">
        {cohorts.map((k) => {
          const ks = sessions.filter((s) => s.cohortId === k.id)
          const next = ks
            .filter((s) => Date.parse(s.start) > nowMs())
            .sort((a, b) => a.start.localeCompare(b.start))[0]
          const members = Object.values(youth).filter((y) => y.cohortIds.includes(k.id))
          const marked = ks.filter((s) => members.some((m) => m.attendance[s.id])).length
          return (
            <article key={k.id} className="space-y-4 rounded-3xl border bg-white p-5 shadow-sm">
              <h2 className="text-lg">{l(k.name)}</h2>
              <TrainerAssignment
                cohortId={k.id}
                value={assign[k.id] ?? k.trainerId}
                onChange={(v) => setAssign((a) => ({ ...a, [k.id]: v }))}
              />
              <dl className="grid grid-cols-3 gap-3 text-sm">
                <div className="flex flex-col-reverse rounded-2xl bg-sky-50 p-3">
                  <dt className="text-xs text-ink-soft">{t('trainers.sessions')}</dt>
                  <dd className="text-xl font-bold tabular-nums">{n(ks.length)}</dd>
                </div>
                <div className="flex flex-col-reverse rounded-2xl bg-sky-50 p-3">
                  <dt className="text-xs text-ink-soft">{t('trainers.marked')}</dt>
                  <dd className="text-xl font-bold tabular-nums">
                    {t('kpi.ofShort', { num: n(marked), den: n(ks.length) })}
                  </dd>
                </div>
                <div className="flex flex-col-reverse rounded-2xl bg-sky-50 p-3">
                  <dt className="text-xs text-ink-soft">{t('trainers.next')}</dt>
                  <dd className="font-semibold">
                    {next ? `${d(next.start)} ${formatTime(next.start, lang)}` : t('none')}
                  </dd>
                </div>
              </dl>
              {next && (
                <p className="text-sm text-ink-soft">
                  {t('trainers.nextTitle', { title: l(next.title) })}
                </p>
              )}
            </article>
          )
        })}
      </div>
      <p className="text-xs text-ink-soft">{t('trainers.localNote')}</p>
    </div>
  )
}
