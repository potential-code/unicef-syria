import { ChevronDown, Lock, RotateCcw, SlidersHorizontal } from 'lucide-react'
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
import { cn } from '@/lib/utils'
import { type AdminFilterKey, FILTER_KEYS, optionsFor } from '../lib/filters'
import { useAdminFilters } from '../lib/useAdminFilters'
import { useLabels } from '../lib/useLabels'

const ALL = '__all'
/** Filters shown on phones before "More filters". */
const MOBILE_VISIBLE = 2

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
  const lockedCount = keys.filter((k) => k in locked).length
  const hiddenActive = keys
    .slice(MOBILE_VISIBLE)
    .filter((k) => !(k in locked) && filters[k] !== undefined).length
  return (
    <section aria-labelledby="filters-title" className="card p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2
          id="filters-title"
          className="flex items-center gap-2 text-sm font-semibold whitespace-nowrap text-ink"
        >
          <SlidersHorizontal className="size-4 text-blue" aria-hidden />
          {t('filters.title')}
          {lockedCount > 0 && (
            <span className="hidden items-center gap-1 text-xs font-medium text-ink-soft sm:inline-flex">
              <Lock className="size-3" aria-hidden />
              {t('filters.locked')}
            </span>
          )}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clear}
          disabled={!anyActive}
          className="-me-2 h-8 px-2.5 text-xs text-blue"
        >
          <RotateCcw className="size-3.5" aria-hidden />
          {t('common:clearFilters')}
        </Button>
      </div>
      <div
        id="filter-grid"
        className="grid grid-cols-2 gap-x-3 gap-y-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
      >
        {keys.map((k, i) => {
          const id = `f-${k}`
          const isLocked = k in locked
          const current = filters[k]
          return (
            <div
              key={k}
              className={cn(
                'min-w-0 flex-col gap-1',
                i >= MOBILE_VISIBLE && !open ? 'hidden sm:flex' : 'flex',
              )}
            >
              <label
                htmlFor={id}
                className="flex items-center gap-1 truncate text-xs font-semibold text-ink-soft"
              >
                <span className="truncate">{t(`filters.${k}`)}</span>
                {isLocked && <Lock className="size-3 shrink-0" aria-label={t('filters.locked')} />}
              </label>
              <Select
                value={current ?? ALL}
                onValueChange={(v) => setFilter(k, v === ALL ? undefined : v)}
                disabled={isLocked}
              >
                <SelectTrigger
                  id={id}
                  size="sm"
                  className={cn(
                    'w-full min-w-0 rounded-lg text-start text-[13px] [&_[data-slot=select-value]]:block [&_[data-slot=select-value]]:truncate [&>svg]:size-4',
                    current !== undefined && !isLocked
                      ? 'border-blue/50 bg-blue-50 font-semibold text-navy'
                      : 'bg-white',
                    isLocked && 'bg-sky-50 disabled:opacity-100',
                  )}
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
      {keys.length > MOBILE_VISIBLE && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 -ms-2 h-8 px-2 text-xs text-blue sm:hidden"
          aria-expanded={open}
          aria-controls="filter-grid"
          onClick={() => setOpen((v) => !v)}
        >
          <ChevronDown
            className={cn('size-3.5 transition-transform', open && 'rotate-180')}
            aria-hidden
          />
          {open ? t('filters.hide') : t('filters.more')}
          {!open && hiddenActive > 0 && (
            <span className="rounded-full bg-blue px-1.5 text-[10px] font-bold text-white">
              {hiddenActive}
            </span>
          )}
        </Button>
      )}
    </section>
  )
}
