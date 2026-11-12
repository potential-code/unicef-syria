import { BarChart3, Table2 } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { ChartLegend, type LegendItem } from './Legend'

export interface TableView {
  columns: string[]
  rows: (string | number)[][]
}

/**
 * Card frame for every chart: title, subtitle (what is plotted and its denominator), legend for
 * two or more series, and a table view so no value depends on hover or colour. The header wraps
 * so the toggle drops below the title in narrow cards instead of squeezing it.
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
    <figure className={cn('card flex min-w-0 flex-col gap-4 p-5', className)}>
      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
        <figcaption className="min-w-[9rem] flex-1">
          <p className="text-base leading-snug font-semibold text-ink">{title}</p>
          {subtitle && <p className="mt-1 text-xs leading-snug text-ink-soft">{subtitle}</p>}
        </figcaption>
        {table && (
          <button
            type="button"
            onClick={() => setAsTable((v) => !v)}
            aria-pressed={asTable}
            className="-me-2 inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold text-blue hover:bg-sky-50 focus-visible:outline-2"
          >
            {asTable ? (
              <BarChart3 className="size-3.5" aria-hidden />
            ) : (
              <Table2 className="size-3.5" aria-hidden />
            )}
            {asTable ? t('charts.showChart') : t('charts.showTable')}
          </button>
        )}
      </div>
      {legend && !asTable && <ChartLegend items={legend} />}
      {asTable && table ? (
        <div className="-mx-1 overflow-hidden rounded-xl ring-1 ring-border/70">
          <Table>
            <TableHeader>
              <TableRow>
                {table.columns.map((c) => (
                  <TableHead key={c} scope="col" className="h-9 px-3 whitespace-normal">
                    {c}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.rows.map((r) => (
                <TableRow key={String(r[0])}>
                  {r.map((cell, i) => (
                    <TableCell
                      key={`${String(r[0])}-${table.columns[i]}`}
                      className={cn('px-3 py-2', i > 0 && 'tabular-nums')}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="min-w-0 flex-1">{children}</div>
      )}
      {footer && (
        <div className="mt-auto border-t border-border/70 pt-3 text-xs text-ink-soft">{footer}</div>
      )}
    </figure>
  )
}
