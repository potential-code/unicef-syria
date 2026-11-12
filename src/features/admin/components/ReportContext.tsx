import { CalendarRange, FlaskConical, Lock, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SNAPSHOT_DATE } from '@/data/analytics'
import { activeFilters } from '../lib/filters'
import { useAdminFilters } from '../lib/useAdminFilters'
import { useLabels } from '../lib/useLabels'

/**
 * Report context line shown on every report (brief §19): selected period, every active filter
 * as a chip (locked scope marked), and the "Sample data" label.
 */
export function ReportContext({ readOnly }: { readOnly?: boolean }) {
  const { t } = useTranslation('admin')
  const { filters, locked, setFilter } = useAdminFilters()
  const { value, d } = useLabels()
  const chips = activeFilters(filters)
  return (
    <section className="flex flex-wrap items-center gap-2 text-xs" aria-label={t('context.label')}>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3 py-1.5 font-semibold text-white">
        <FlaskConical className="size-3.5" aria-hidden />
        {t('context.sample')}
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full border bg-white px-3 py-1.5 text-ink">
        <CalendarRange className="size-3.5 text-blue" aria-hidden />
        <span className="text-ink-soft">{t('context.period')}</span>
        <strong className="font-semibold">{t(`period.${filters.period ?? 'toDate'}`)}</strong>
        <span className="text-ink-soft">· {t('context.snapshot', { date: d(SNAPSHOT_DATE) })}</span>
      </span>
      {chips.length === 0 && (
        <span className="rounded-full border border-dashed bg-white px-3 py-1.5 text-ink-soft">
          {t('context.national')}
        </span>
      )}
      {chips.map(([k, v]) => {
        const isLocked = k in locked
        return (
          <span
            key={k}
            className="inline-flex items-center gap-1 rounded-full border border-cyan/40 bg-sky-100 py-1 ps-3 pe-1 text-navy"
          >
            <span className="text-ink-soft">{t(`filters.${k}`)}:</span>
            <strong className="font-semibold">{value(k, v)}</strong>
            {isLocked ? (
              <Lock className="mx-1.5 size-3" aria-label={t('filters.locked')} />
            ) : readOnly ? (
              <span className="w-1.5" />
            ) : (
              <button
                type="button"
                onClick={() => setFilter(k, undefined)}
                className="inline-flex size-6 items-center justify-center rounded-full hover:bg-white focus-visible:outline-2"
                aria-label={t('context.remove', { name: value(k, v) })}
              >
                <X className="size-3.5" aria-hidden />
              </button>
            )}
          </span>
        )
      })}
    </section>
  )
}
