import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CATEGORY_LABELS } from '@/data/courses'
import { CENTRES } from '@/data/orgs'
import { useLocalized } from '@/i18n'
import { CATEGORIES, type ExploreSearch, GOVERNORATES, LEVELS, ROUTES } from '../config'

const ALL = 'all'

/** Six catalogue filters (brief §2 P02). */
export function CatalogueFilters({
  value,
  onChange,
}: {
  value: ExploreSearch
  onChange: (next: ExploreSearch) => void
}) {
  const { t } = useTranslation('public')
  const { l } = useLocalized()
  const centres = CENTRES.filter((c) => !value.governorate || c.governorate === value.governorate)
  const fields: { key: keyof ExploreSearch; options: { v: string; label: string }[] }[] = [
    { key: 'route', options: ROUTES.map((r) => ({ v: r, label: t(`common:routes.${r}`) })) },
    { key: 'category', options: CATEGORIES.map((c) => ({ v: c, label: l(CATEGORY_LABELS[c]) })) },
    {
      key: 'delivery',
      options: [
        { v: 'online', label: t('explore.delivery.online') },
        { v: 'blended', label: t('explore.delivery.blended') },
      ],
    },
    {
      key: 'governorate',
      options: GOVERNORATES.map((g) => ({ v: g, label: t(`governorates.${g}`) })),
    },
    { key: 'centre', options: centres.map((c) => ({ v: c.id, label: l(c.name) })) },
    { key: 'level', options: LEVELS.map((v) => ({ v, label: t(`levels.${v}`) })) },
  ]
  const active = Object.values(value).filter(Boolean).length
  const set = (key: keyof ExploreSearch, v: string) => {
    const next = { ...value, [key]: v === ALL ? undefined : v }
    // A centre outside the chosen governorate no longer applies.
    if (
      key === 'governorate' &&
      next.centre &&
      CENTRES.find((c) => c.id === next.centre)?.governorate !== v
    )
      next.centre = undefined
    onChange(next)
  }
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-md sm:p-5">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {fields.map((f) => (
          <div key={f.key} className="space-y-1">
            <Label
              htmlFor={`f-${f.key}`}
              className="text-xs font-bold tracking-wide text-ink-soft uppercase"
            >
              {t(`explore.filters.${f.key}`)}
            </Label>
            <Select value={value[f.key] ?? ALL} onValueChange={(v) => set(f.key, v)}>
              <SelectTrigger id={`f-${f.key}`} className="min-h-11 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>{t('explore.filters.any')}</SelectItem>
                {f.options.map((o) => (
                  <SelectItem key={o.v} value={o.v}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
      {active > 0 && (
        <Button variant="ghost" size="sm" onClick={() => onChange({})} className="mt-3 text-blue">
          <X className="size-4" aria-hidden />
          {t('common:clearFilters')} ({active})
        </Button>
      )}
    </div>
  )
}
