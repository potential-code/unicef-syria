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
    <section
      className="flex flex-wrap items-center gap-1.5 text-xs"
      aria-label={t('context.label')}
    >
      <span className="inline-flex items-center gap-1.5 rounded-full bg-navy px-2.5 py-1 font-semibold text-white">
        <FlaskConical className="size-3" aria-hidden />
        {t('context.sample')}
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-ink shadow-xs ring-1 ring-border/70">
        <CalendarRange className="size-3 text-blue" aria-hidden />
        <span className="text-ink-soft">{t('context.period')}</span>
        <strong className="font-semibold whitespace-nowrap">
          {t(`period.${filters.period ?? 'toDate'}`)}
        </strong>
        <span className="hidden text-ink-soft sm:inline">
          · {t('context.snapshot', { date: d(SNAPSHOT_DATE) })}
        </span>
      </span>
      {chips.length === 0 && (
        <span className="rounded-full border border-dashed border-border px-2.5 py-1 text-ink-soft">
          {t('context.national')}
        </span>
      )}
      {chips.map(([k, v]) => {
        const isLocked = k in locked
        return (
          <span
            key={k}
            className="inline-flex items-center gap-1 rounded-full bg-blue-50 py-0.5 ps-2.5 pe-0.5 text-navy ring-1 ring-blue/20"
          >
            <span className="text-ink-soft">{t(`filters.${k}`)}:</span>
            <strong className="font-semibold">{value(k, v)}</strong>
            {isLocked ? (
              <Lock className="mx-1.5 my-0.5 size-3" aria-label={t('filters.locked')} />
            ) : readOnly ? (
              <span className="w-1.5" />
            ) : (
              <button
                type="button"
                onClick={() => setFilter(k, undefined)}
                className="relative inline-flex size-5 items-center justify-center rounded-full after:absolute after:-inset-2.5 hover:bg-white focus-visible:outline-2"
                aria-label={t('context.remove', { name: value(k, v) })}
              >
                <X className="size-3" aria-hidden />
              </button>
            )}
          </span>
        )
      })}
    </section>
  )
}
