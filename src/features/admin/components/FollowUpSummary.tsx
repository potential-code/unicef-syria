import { CalendarClock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { StatCard } from '@/components/shared/StatCard'
import type { Kpis } from '@/domain/kpi'
import { useLabels } from '../lib/useLabels'

const TONES = ['navy', 'sky', 'navy'] as const

/** Historical follow-up workload per window: eligible, responded, still unknown. */
export function FollowUpSummary({ k }: { k: Kpis }) {
  const { t } = useTranslation('admin')
  const { n, p } = useLabels()
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))] gap-3">
      {k.employment.map((w, i) => (
        <StatCard
          key={w.months}
          tone={TONES[i % TONES.length]}
          icon={CalendarClock}
          label={t('windows.month', { count: w.months })}
          value={n(w.unknown)}
          hint={
            <>
              <span className="block">
                {t('followup.summary.unknown', { eligible: n(w.rate.denominator) })}
              </span>
              <span className="mt-1 block">
                {t('followup.summary.coverage', {
                  coverage: p(w.coverage.value),
                  responses: n(w.coverage.numerator),
                })}
              </span>
            </>
          }
        />
      ))}
    </div>
  )
}
