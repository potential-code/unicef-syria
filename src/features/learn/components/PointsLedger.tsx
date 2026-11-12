import type { Youth } from '@shared/types'
import { useTranslation } from 'react-i18next'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { balance } from '@/domain/points'
import { formatDate, useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'

/** Points ledger including the seeded opening balance row. */
export function PointsLedger({ youth }: { youth: Youth }) {
  const { t } = useTranslation('learn')
  const { l, lang } = useLocalized()
  const rows = [...youth.points].sort((a, b) => a.at.localeCompare(b.at))
  return (
    <div className="overflow-x-auto rounded-3xl border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('progress.date')}</TableHead>
            <TableHead>{t('progress.activity')}</TableHead>
            <TableHead className="text-end">{t('progress.amount')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="py-8 text-center text-ink-soft">
                {t('progress.noPoints')}
              </TableCell>
            </TableRow>
          ) : (
            rows.map((e) => (
              <TableRow key={e.key}>
                <TableCell className="whitespace-nowrap">{formatDate(e.at, lang)}</TableCell>
                <TableCell>
                  {l(e.label)}
                  {e.reason === 'seed' && (
                    <span className="ms-2 rounded-full bg-sky-100 px-2 py-0.5 text-xs font-semibold text-navy">
                      {t('progress.opening')}
                    </span>
                  )}
                </TableCell>
                <TableCell
                  className={cn(
                    'text-end font-bold tabular-nums',
                    e.amount < 0 ? 'text-danger' : 'text-success',
                  )}
                >
                  {e.amount > 0 ? `+${e.amount}` : e.amount}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} className="font-bold">
              {t('progress.balance')}
            </TableCell>
            <TableCell className="text-end text-lg font-extrabold tabular-nums">
              {balance(youth)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
