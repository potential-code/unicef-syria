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
    <div
      className={
        outcome
          ? 'rounded-xl border border-border/70 border-s-4 border-s-success bg-white p-4 shadow-sm'
          : 'rounded-xl border border-border/70 border-s-4 border-s-sky-200 bg-white p-4 shadow-sm'
      }
    >
      <div className="min-w-0 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="flex min-w-0 items-center gap-2 text-base">
            <Icon
              className={outcome ? 'size-4 shrink-0 text-success' : 'size-4 shrink-0 text-ink-soft'}
              aria-hidden
            />
            {title}
          </h3>
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
