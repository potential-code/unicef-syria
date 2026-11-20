import { Search, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CATEGORY_LABELS } from '@/data/courses'
import { useLocalized } from '@/i18n'
import { CATEGORY_ORDER, DURATION_BUCKETS, ROUTES } from '../config'

export interface Filters {
  q: string
  route: string
  topic: string
  level: string
  duration: string
  status: string
}
export const EMPTY_FILTERS: Filters = {
  q: '',
  route: 'all',
  topic: 'all',
  level: 'all',
  duration: 'all',
  status: 'all',
}

/** Catalogue filters: route, topic, level, duration, free-text search and status. */
export function LibraryFilters({
  value,
  onChange,
}: {
  value: Filters
  onChange: (f: Filters) => void
}) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  const set = (k: keyof Filters) => (v: string) => onChange({ ...value, [k]: v })
  const active = JSON.stringify(value) !== JSON.stringify(EMPTY_FILTERS)

  const selects: { key: keyof Filters; label: string; options: { v: string; label: string }[] }[] =
    [
      {
        key: 'route',
        label: t('library.f.route'),
        options: ROUTES.map((r) => ({ v: r, label: t(`common:routesShort.${r}`) })),
      },
      {
        key: 'topic',
        label: t('library.f.topic'),
        options: CATEGORY_ORDER.map((c) => ({ v: c, label: l(CATEGORY_LABELS[c]) })),
      },
      {
        key: 'level',
        label: t('library.f.level'),
        options: ['beginner', 'intermediate'].map((v) => ({ v, label: t(`library.level.${v}`) })),
      },
      {
        key: 'duration',
        label: t('library.f.duration'),
        options: DURATION_BUCKETS.map((v) => ({ v, label: t(`library.duration.${v}`) })),
      },
      {
        key: 'status',
        label: t('library.f.status'),
        options: ['todo', 'inProgress', 'completed'].map((v) => ({
          v,
          label: t(`common:status.${v}`),
        })),
      },
    ]

  return (
    <div className="card p-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-0 flex-1 basis-60">
          <Label htmlFor="lib-search" className="sr-only">
            {t('library.search')}
          </Label>
          <Search
            className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-ink-soft"
            aria-hidden
          />
          <Input
            id="lib-search"
            type="search"
            value={value.q}
            onChange={(e) => set('q')(e.target.value)}
            placeholder={t('library.search')}
            className="h-10 ps-9"
          />
        </div>
        {active && (
          <Button
            variant="ghost"
            size="sm"
            className="shrink-0 rounded-full text-blue"
            onClick={() => onChange(EMPTY_FILTERS)}
          >
            <X className="size-4" aria-hidden />
            {t('common:clearFilters')}
          </Button>
        )}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2.5 md:grid-cols-3 xl:grid-cols-5">
        {selects.map((s) => (
          <div key={s.key} className="min-w-0">
            <Label htmlFor={`lib-${s.key}`} className="text-xs font-semibold text-ink-soft">
              {s.label}
            </Label>
            <Select value={value[s.key]} onValueChange={set(s.key)}>
              <SelectTrigger
                id={`lib-${s.key}`}
                size="sm"
                className="mt-1 w-full min-w-0 [&_[data-slot=select-value]]:truncate"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('library.any')}</SelectItem>
                {s.options.map((o) => (
                  <SelectItem key={o.v} value={o.v}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  )
}
