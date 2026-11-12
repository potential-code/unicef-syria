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
import { MiniStats } from '../components/MiniStats'
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
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,24rem),1fr))] gap-4">
        {cohorts.map((k) => {
          const ks = sessions.filter((s) => s.cohortId === k.id)
          const next = ks
            .filter((s) => Date.parse(s.start) > nowMs())
            .sort((a, b) => a.start.localeCompare(b.start))[0]
          const members = Object.values(youth).filter((y) => y.cohortIds.includes(k.id))
          const marked = ks.filter((s) => members.some((m) => m.attendance[s.id])).length
          return (
            <article key={k.id} className="card space-y-4 p-5">
              <h2 className="text-lg">{l(k.name)}</h2>
              <TrainerAssignment
                cohortId={k.id}
                value={assign[k.id] ?? k.trainerId}
                onChange={(v) => setAssign((a) => ({ ...a, [k.id]: v }))}
              />
              <MiniStats
                items={[
                  { key: 'sessions', label: t('trainers.sessions'), value: n(ks.length) },
                  {
                    key: 'marked',
                    label: t('trainers.marked'),
                    value: t('kpi.ofShort', { num: n(marked), den: n(ks.length) }),
                  },
                  {
                    key: 'next',
                    label: t('trainers.next'),
                    value: (
                      <span className="block text-sm leading-snug font-bold">
                        {next ? `${d(next.start)} ${formatTime(next.start, lang)}` : t('none')}
                      </span>
                    ),
                  },
                ]}
              />
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
