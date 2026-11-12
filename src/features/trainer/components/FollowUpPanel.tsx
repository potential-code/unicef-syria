import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/components/shared/EmptyState'
import { StatusBadge } from '@/components/shared/StatusBadge'
import type { LearnerStats } from '../hooks/useTrainerScope'
import { LearnerName } from './LearnerName'

/** Learners requiring follow-up, each with the reason (absence, reminder, support flag). */
export function FollowUpPanel({ stats }: { stats: LearnerStats[] }) {
  const { t } = useTranslation('trainer')
  const rows = stats.filter((s) => s.followUp)
  return (
    <section className="rounded-2xl border bg-card p-5 shadow-sm">
      <h2 className="flex items-center gap-2 text-lg">
        <AlertTriangle className="size-5 text-notice" aria-hidden />
        {t('dashboard.followUpTitle')}
      </h2>
      <p className="mt-1 text-sm text-ink-soft">{t('dashboard.followUpBody')}</p>
      {rows.length === 0 ? (
        <EmptyState
          className="mt-4 py-6"
          icon={CheckCircle2}
          title={t('dashboard.noFollowUp')}
          body={t('dashboard.noFollowUpBody')}
        />
      ) : (
        <ul className="mt-4 divide-y">
          {rows.map((s) => (
            <li key={s.youth.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <LearnerName
                youth={s.youth}
                sub={s.youth.supportFlag ?? t('dashboard.followUpGeneric')}
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
