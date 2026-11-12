import { useTranslation } from 'react-i18next'
import { CHART, ChartLegend, StackedBar } from '@/components/charts'
import type { Kpis } from '@/domain/kpi'
import { useLabels } from '../lib/useLabels'

/**
 * Employment at 3, 6 and 12 months (brief §19): rate of all eligible graduates, with response
 * coverage and unknown status shown separately, never folded into the rate.
 */
export function EmploymentWindows({ k }: { k: Kpis }) {
  const { t } = useTranslation('admin')
  const { n, p } = useLabels()
  const legend = [
    { key: 'emp', label: t('windows.employed'), color: CHART.primary },
    { key: 'resp', label: t('windows.notEmployed'), color: CHART.secondary },
    { key: 'unk', label: t('windows.unknown'), color: CHART.neutral },
  ]
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <p className="font-semibold text-ink">{t('windows.title')}</p>
      <p className="mb-3 text-xs text-ink-soft">{t('def.windows')}</p>
      <ChartLegend items={legend} />
      <div className="mt-4 space-y-4">
        {k.employment.map((w) => {
          const eligible = w.rate.denominator
          const notEmployed = w.coverage.numerator - w.rate.numerator
          return (
            <div key={w.months} className="grid gap-2 sm:grid-cols-[7rem_1fr] sm:items-center">
              <p className="text-sm font-semibold text-ink">
                {t('windows.month', { count: w.months })}
              </p>
              <StackedBar
                ariaLabel={t('windows.aria', {
                  months: w.months,
                  emp: w.rate.numerator,
                  eligible,
                  unknown: w.unknown,
                })}
                total={eligible}
                format={n}
                segments={[
                  {
                    key: 'emp',
                    label: t('windows.employed'),
                    value: w.rate.numerator,
                    color: CHART.primary,
                  },
                  {
                    key: 'resp',
                    label: t('windows.notEmployed'),
                    value: notEmployed,
                    color: CHART.secondary,
                  },
                  {
                    key: 'unk',
                    label: t('windows.unknown'),
                    value: w.unknown,
                    color: CHART.neutral,
                  },
                ]}
              />
            </div>
          )
        })}
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[36rem] text-sm">
          <caption className="sr-only">{t('windows.title')}</caption>
          <thead>
            <tr className="border-b text-xs text-ink-soft">
              {[
                'window',
                'eligible',
                'responses',
                'coverage',
                'employedCount',
                'rate',
                'unknownCount',
              ].map((c) => (
                <th key={c} scope="col" className="py-2 pe-3 text-start font-medium">
                  {t(`windows.col.${c}`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {k.employment.map((w) => (
              <tr key={w.months} className="border-b last:border-0 tabular-nums">
                <th scope="row" className="py-2 pe-3 text-start font-semibold">
                  {t('windows.month', { count: w.months })}
                </th>
                <td className="py-2 pe-3">{n(w.rate.denominator)}</td>
                <td className="py-2 pe-3">{n(w.coverage.numerator)}</td>
                <td className="py-2 pe-3">{p(w.coverage.value)}</td>
                <td className="py-2 pe-3">{n(w.rate.numerator)}</td>
                <td className="py-2 pe-3 font-semibold text-blue">{p(w.rate.value)}</td>
                <td className="py-2 pe-3">{n(w.unknown)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
