import type { Youth } from '@shared/types'
import { Coins } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { balance } from '@/domain/points'
import { formatDate, useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'

/** Points ledger as a row list (newest first) with a running balance summary. */
export function PointsLedger({ youth }: { youth: Youth }) {
  const { t } = useTranslation('learn')
  const { l, lang } = useLocalized()
  const rows = [...youth.points].sort((a, b) => b.at.localeCompare(a.at))
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between gap-3 bg-sky-100 px-5 py-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-navy">
          <Coins className="size-4 text-blue" aria-hidden />
          {t('progress.balance')}
        </p>
        <p className="text-2xl font-extrabold text-navy tabular-nums">
          {balance(youth)}
          <span className="ms-1.5 text-sm font-semibold text-ink-soft">{t('dash.pointsUnit')}</span>
        </p>
      </div>
      {rows.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-ink-soft">{t('progress.noPoints')}</p>
      ) : (
        <ul className="divide-y divide-border/70">
          {rows.map((e) => (
            <li key={e.key} className="flex items-center gap-4 px-5 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink">
                  {l(e.label)}
                  {e.reason === 'seed' && (
                    <span className="ms-2 rounded-full bg-sky-100 px-2 py-0.5 text-xs font-semibold text-navy">
                      {t('progress.opening')}
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-xs text-ink-soft">{formatDate(e.at, lang)}</p>
              </div>
              <span
                className={cn(
                  'shrink-0 text-base font-extrabold tabular-nums',
                  e.amount < 0 ? 'text-danger' : 'text-success',
                )}
                dir="ltr"
              >
                {e.amount > 0 ? `+${e.amount}` : e.amount}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
