import type { AnalyticsRow } from '@shared/types'
import { useTranslation } from 'react-i18next'
import { filterRows, kpis, sumRows } from '@/domain/kpi'
import { ORDER } from '../lib/entities'
import { useLabels } from '../lib/useLabels'

const SMALL = 5

/** Learning and guidance by group (aggregate only; cells under 5 are suppressed). */
export function InclusionTable({
  rows,
  dim,
}: {
  rows: AnalyticsRow[]
  dim: 'disability' | 'gender' | 'ageGroup'
}) {
  const { t } = useTranslation('admin')
  const { n, p, value } = useLabels()
  const cell = (x: number) => (x > 0 && x < SMALL ? t('inclusion.small') : n(x))
  return (
    <div className="overflow-x-auto rounded-2xl border bg-white p-5 shadow-sm">
      <p className="mb-3 font-semibold">{t(`inclusion.tableTitle.${dim}`)}</p>
      <table className="w-full min-w-[34rem] text-sm">
        <thead>
          <tr className="border-b text-xs text-ink-soft">
            <th scope="col" className="py-2 text-start font-medium">
              {t('charts.group')}
            </th>
            <th scope="col" className="py-2 text-start font-medium">
              {t('metric.registered')}
            </th>
            <th scope="col" className="py-2 text-start font-medium">
              {t('kpi.completion')}
            </th>
            <th scope="col" className="py-2 text-start font-medium">
              {t('metric.graduates')}
            </th>
            <th scope="col" className="py-2 text-start font-medium">
              {t('kpi.guidance')}
            </th>
          </tr>
        </thead>
        <tbody>
          {(ORDER[dim] as readonly string[]).map((g) => {
            const k = kpis(sumRows(filterRows(rows, { [dim]: g })))
            return (
              <tr key={g} className="border-b last:border-0 tabular-nums">
                <th scope="row" className="py-2 text-start font-medium">
                  {value(dim, g)}
                </th>
                <td className="py-2">{cell(k.registered)}</td>
                <td className="py-2">
                  {p(k.completionRate.value)}{' '}
                  <span className="text-xs text-ink-soft">
                    ({cell(k.completionRate.numerator)}/{cell(k.completionRate.denominator)})
                  </span>
                </td>
                <td className="py-2">{cell(k.graduates)}</td>
                <td className="py-2">{p(k.guidanceCoverage.value)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
