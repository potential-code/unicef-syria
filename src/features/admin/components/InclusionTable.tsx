import type { AnalyticsRow } from '@shared/types'
import { useTranslation } from 'react-i18next'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
  const cols = ['metric.registered', 'kpi.completion', 'metric.graduates', 'kpi.guidance']
  return (
    <div className="card overflow-hidden">
      <p className="px-5 pt-4 pb-3 text-base font-semibold text-ink">
        {t(`inclusion.tableTitle.${dim}`)}
      </p>
      <Table className="min-w-[30rem] sm:min-w-0 [&_th]:whitespace-normal">
        <TableHeader>
          <TableRow>
            <TableHead scope="col">{t('charts.group')}</TableHead>
            {cols.map((c) => (
              <TableHead key={c} scope="col">
                {t(c)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {(ORDER[dim] as readonly string[]).map((g) => {
            const k = kpis(sumRows(filterRows(rows, { [dim]: g })))
            return (
              <TableRow key={g} className="tabular-nums">
                <TableCell className="font-semibold">{value(dim, g)}</TableCell>
                <TableCell>{cell(k.registered)}</TableCell>
                <TableCell>
                  <span className="font-semibold">{p(k.completionRate.value)}</span>{' '}
                  <span className="text-xs text-ink-soft">
                    ({cell(k.completionRate.numerator)}/{cell(k.completionRate.denominator)})
                  </span>
                </TableCell>
                <TableCell>{cell(k.graduates)}</TableCell>
                <TableCell>{p(k.guidanceCoverage.value)}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
