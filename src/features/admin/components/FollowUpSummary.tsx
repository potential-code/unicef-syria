import { useTranslation } from 'react-i18next'
import type { Kpis } from '@/domain/kpi'
import { useLabels } from '../lib/useLabels'

/** Historical follow-up workload per window: eligible, responded, still unknown. */
export function FollowUpSummary({ k }: { k: Kpis }) {
  const { t } = useTranslation('admin')
  const { n, p } = useLabels()
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {k.employment.map((w) => (
        <div key={w.months} className="rounded-2xl border bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-ink">
            {t('windows.month', { count: w.months })}
          </p>
          <p className="mt-2 text-3xl font-bold tabular-nums">{n(w.unknown)}</p>
          <p className="text-xs text-ink-soft">
            {t('followup.summary.unknown', { eligible: n(w.rate.denominator) })}
          </p>
          <p className="mt-2 text-xs text-ink-soft">
            {t('followup.summary.coverage', {
              coverage: p(w.coverage.value),
              responses: n(w.coverage.numerator),
            })}
          </p>
        </div>
      ))}
    </div>
  )
}
