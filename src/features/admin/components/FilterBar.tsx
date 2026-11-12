import { Lock, RotateCcw, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type AdminFilterKey, FILTER_KEYS, optionsFor } from '../lib/filters'
import { useAdminFilters } from '../lib/useAdminFilters'
import { useLabels } from '../lib/useLabels'

const ALL = '__all'

/**
 * One filter row above the report (brief §19): national scope, governorate, partner, centre,
 * programme, cohort, route, demographic group and period. A scoped role sees its own scope
 * locked and cannot widen it.
 */
export function FilterBar({ keys = FILTER_KEYS }: { keys?: AdminFilterKey[] }) {
  const { t } = useTranslation('admin')
  const { filters, locked, setFilter, clear, persona } = useAdminFilters()
  const { value } = useLabels()
  const [open, setOpen] = useState(false)
  const anyActive = keys.some((k) => !(k in locked) && filters[k] !== undefined)
  return (
    <section aria-labelledby="filters-title" className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 id="filters-title" className="flex items-center gap-2 text-sm font-semibold text-ink">
          <SlidersHorizontal className="size-4 text-blue" aria-hidden />
          {t('filters.title')}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clear}
          disabled={!anyActive}
          className="text-blue"
        >
          <RotateCcw className="size-4" aria-hidden />
          {t('common:clearFilters')}
        </Button>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="mb-3 w-full rounded-full sm:hidden"
        aria-expanded={open}
        aria-controls="filter-grid"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? t('filters.hide') : t('filters.show')}
      </Button>
      <div
        id="filter-grid"
        className={`${open ? 'grid' : 'hidden'} grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid md:grid-cols-3 xl:grid-cols-5`}
      >
        {keys.map((k) => {
          const id = `f-${k}`
          const isLocked = k in locked
          const current = filters[k]
          return (
            <div key={k} className="flex min-w-0 flex-col gap-1">
              <label
                htmlFor={id}
                className="flex items-center gap-1 text-xs font-medium text-ink-soft"
              >
                {t(`filters.${k}`)}
                {isLocked && <Lock className="size-3" aria-label={t('filters.locked')} />}
              </label>
              <Select
                value={current ?? ALL}
                onValueChange={(v) => setFilter(k, v === ALL ? undefined : v)}
                disabled={isLocked}
              >
                <SelectTrigger
                  id={id}
                  className="w-full min-w-0 bg-white text-start [&_[data-slot=select-value]]:block [&_[data-slot=select-value]]:truncate"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {k !== 'period' && (
                    <SelectItem value={ALL}>
                      {t(
                        k === 'governorate' || k === 'partnerId'
                          ? 'filters.national'
                          : 'filters.all',
                      )}
                    </SelectItem>
                  )}
                  {k === 'period' && <SelectItem value={ALL}>{t('period.toDate')}</SelectItem>}
                  {optionsFor(k, persona)
                    .filter((o) => !(k === 'period' && o === 'toDate'))
                    .map((o) => (
                      <SelectItem key={o} value={o}>
                        {value(k, o)}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )
        })}
      </div>
    </section>
  )
}
