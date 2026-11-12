import { BarChart3, Table2 } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { ChartLegend, type LegendItem } from './Legend'

export interface TableView {
  columns: string[]
  rows: (string | number)[][]
}

/**
 * Card frame for every chart: title, subtitle (what is plotted and its denominator), legend for
 * two or more series, and a table view so no value depends on hover or colour.
 */
export function ChartCard({
  title,
  subtitle,
  legend,
  table,
  children,
  footer,
  className,
}: {
  title: string
  subtitle?: ReactNode
  legend?: LegendItem[]
  table?: TableView
  children: ReactNode
  footer?: ReactNode
  className?: string
}) {
  const { t } = useTranslation('admin')
  const [asTable, setAsTable] = useState(false)
  return (
    <figure
      className={cn('flex flex-col gap-3 rounded-2xl border bg-card p-5 shadow-sm', className)}
    >
      <div className="flex items-start justify-between gap-3">
        <figcaption className="min-w-0">
          <p className="font-semibold text-ink">{title}</p>
          {subtitle && <p className="mt-0.5 text-xs text-ink-soft">{subtitle}</p>}
        </figcaption>
        {table && (
          <button
            type="button"
            onClick={() => setAsTable((v) => !v)}
            aria-pressed={asTable}
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-blue hover:bg-sky-50 focus-visible:outline-2"
          >
            {asTable ? (
              <BarChart3 className="size-4" aria-hidden />
            ) : (
              <Table2 className="size-4" aria-hidden />
            )}
            {asTable ? t('charts.showChart') : t('charts.showTable')}
          </button>
        )}
      </div>
      {legend && !asTable && <ChartLegend items={legend} />}
      {asTable && table ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-start text-xs text-ink-soft">
                {table.columns.map((c) => (
                  <th key={c} scope="col" className="py-2 pe-3 text-start font-medium">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((r) => (
                <tr key={String(r[0])} className="border-b last:border-0">
                  {r.map((cell, i) => (
                    <td
                      key={`${String(r[0])}-${table.columns[i]}`}
                      className={cn('py-2 pe-3', i > 0 && 'tabular-nums')}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        children
      )}
      {footer && <div className="border-t pt-3 text-xs text-ink-soft">{footer}</div>}
    </figure>
  )
}
