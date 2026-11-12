import type { ApplicationTrack, Outcome } from '@shared/types'
import { BadgeCheck, Clock, type LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { formatDate, useLocalized } from '@/i18n'

/** One outcome milestone: not yet, confirmed by the organisation, or pending confirmation. */
export function OutcomeRow({
  icon: Icon,
  title,
  body,
  outcome,
  track,
}: {
  icon: LucideIcon
  title: string
  body: string
  outcome?: Outcome
  track: ApplicationTrack
}) {
  const { t } = useTranslation('career')
  const { lang } = useLocalized()
  const confirmed = outcome?.confirmed && outcome.source === 'employer'
  return (
    <div className="flex gap-3 rounded-xl border bg-white p-4">
      <span
        className={
          outcome
            ? 'flex size-11 shrink-0 items-center justify-center rounded-xl bg-success text-white'
            : 'flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted text-ink-soft'
        }
      >
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base">{title}</h3>
          {!outcome && <StatusBadge tone="neutral">{t('apps.outcomes.notYet')}</StatusBadge>}
          {outcome && confirmed && (
            <StatusBadge tone="success" icon={<BadgeCheck className="size-3" aria-hidden />}>
              {t(`apps.outcomes.confirmedBy.${track}`)}
            </StatusBadge>
          )}
          {outcome && !confirmed && (
            <StatusBadge tone="notice" icon={<Clock className="size-3" aria-hidden />}>
              {t('apps.outcomes.learnerReported')} · {t('apps.outcomes.pending')}
            </StatusBadge>
          )}
        </div>
        {outcome && (
          <p className="text-xs text-ink-soft">
            {t('apps.outcomes.recordedOn', { date: formatDate(outcome.date, lang) })}
          </p>
        )}
        <p className="text-sm text-ink-soft">{body}</p>
      </div>
    </div>
  )
}
