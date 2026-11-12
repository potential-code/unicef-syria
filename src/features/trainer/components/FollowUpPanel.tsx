import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/components/shared/EmptyState'
import { StatusBadge } from '@/components/shared/StatusBadge'
import type { LearnerStats } from '../hooks/useTrainerScope'
import { LearnerName } from './LearnerName'
import { PanelHeader } from './PanelHeader'

/** Learners requiring follow-up, each with the reason (absence, reminder, support flag). */
export function FollowUpPanel({ stats }: { stats: LearnerStats[] }) {
  const { t } = useTranslation('trainer')
  const rows = stats.filter((s) => s.followUp)
  return (
    <section className="card flex flex-col p-5 sm:p-6">
      <PanelHeader
        icon={AlertTriangle}
        iconClass="text-orange"
        title={t('dashboard.followUpTitle')}
        body={t('dashboard.followUpBody')}
        count={rows.length}
      />
      {rows.length === 0 ? (
        <EmptyState
          className="mt-4 py-6"
          icon={CheckCircle2}
          title={t('dashboard.noFollowUp')}
          body={t('dashboard.noFollowUpBody')}
        />
      ) : (
        <ul className="mt-3 divide-y divide-border/70">
          {rows.map((s) => (
            <li
              key={s.youth.id}
              className="-mx-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 rounded-xl px-2 py-2 transition-colors hover:bg-sky-50/70"
            >
              <LearnerName
                youth={s.youth}
                sub={s.youth.supportFlag ?? t('dashboard.followUpGeneric')}
                className="min-w-0 flex-1"
              />
              <div className="flex flex-wrap gap-1.5">
                {s.absent > 0 && (
                  <StatusBadge tone="danger">
                    {t('reasons.missed', { count: s.absent })}
                  </StatusBadge>
                )}
                {s.reminders > 0 && (
                  <StatusBadge tone="notice">
                    {t('reasons.reminder', { count: s.reminders })}
                  </StatusBadge>
                )}
                {s.assessment === 'needsSupport' && (
                  <StatusBadge tone="notice">{t('reasons.quiz')}</StatusBadge>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
