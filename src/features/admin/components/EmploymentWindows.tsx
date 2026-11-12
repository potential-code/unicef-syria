import { useTranslation } from 'react-i18next'
import { CHART, ChartLegend, StackedBar } from '@/components/charts'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
    <div className="card p-5">
      <p className="text-base font-semibold text-ink">{t('windows.title')}</p>
      <p className="mt-1 mb-4 max-w-3xl text-xs leading-snug text-ink-soft">{t('def.windows')}</p>
      <ChartLegend items={legend} />
      <div className="mt-4 space-y-4">
        {k.employment.map((w) => {
          const eligible = w.rate.denominator
          const notEmployed = w.coverage.numerator - w.rate.numerator
          return (
            <div key={w.months} className="grid gap-2 sm:grid-cols-[6rem_1fr] sm:items-center">
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
      <div className="mt-5 overflow-hidden rounded-xl ring-1 ring-border/70">
        <Table>
          <caption className="sr-only">{t('windows.title')}</caption>
          <TableHeader>
            <TableRow>
              {[
                'window',
                'eligible',
                'responses',
                'coverage',
                'employedCount',
                'rate',
                'unknownCount',
              ].map((c) => (
                <TableHead
                  key={c}
                  scope="col"
                  className="h-auto px-2.5 py-2 tracking-normal whitespace-normal"
                >
                  {t(`windows.col.${c}`)}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {k.employment.map((w) => (
              <TableRow key={w.months} className="tabular-nums">
                <TableHead
                  scope="row"
                  className="h-auto bg-transparent px-2.5 py-2 text-sm font-semibold tracking-normal text-ink normal-case"
                >
                  {t('windows.month', { count: w.months })}
                </TableHead>
                <TableCell className="px-2.5 py-2">{n(w.rate.denominator)}</TableCell>
                <TableCell className="px-2.5 py-2">{n(w.coverage.numerator)}</TableCell>
                <TableCell className="px-2.5 py-2">{p(w.coverage.value)}</TableCell>
                <TableCell className="px-2.5 py-2">{n(w.rate.numerator)}</TableCell>
                <TableCell className="px-2.5 py-2 font-semibold text-blue">
                  {p(w.rate.value)}
                </TableCell>
                <TableCell className="px-2.5 py-2">{n(w.unknown)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
