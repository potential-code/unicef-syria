import type { Opportunity, OpportunityType } from '@shared/types'
import { Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useLocalized } from '@/i18n'
import type { FilterKey, HubFilters } from '../../config/opportunities'

/** Filters adapt to the active tab (brief §15 Y14). */
export function OpportunityFilters({
  keys,
  types,
  opps,
  value,
  onChange,
}: {
  keys: FilterKey[]
  types: OpportunityType[]
  opps: Opportunity[]
  value: HubFilters
  onChange: (v: HubFilters) => void
}) {
  const { t } = useTranslation('career')
  const { l } = useLocalized()
  const locations = [...new Map(opps.map((o) => [o.location.en, o.location])).values()]
  const options: Record<FilterKey, { value: string; label: string }[]> = {
    type: types.map((x) => ({ value: x, label: t(`common:oppTypes.${x}`) })),
    location: locations.map((loc) => ({ value: loc.en, label: l(loc) })),
    format: keys.includes('deadline')
      ? [
          { value: 'remote', label: t('common:format.remote') },
          { value: 'inPerson', label: t('opps.filters.inPerson') },
        ]
      : (['onsite', 'hybrid', 'remote'] as const).map((f) => ({
          value: f,
          label: t(`common:format.${f}`),
        })),
    deadline: [
      { value: 'soon', label: t('opps.filters.soon') },
      { value: 'later', label: t('opps.filters.later') },
    ],
  }
  return (
    <div className="flex flex-col gap-3 rounded-2xl border bg-white p-4 shadow-sm sm:flex-row sm:flex-wrap sm:items-end">
      {keys.map((k) => (
        <div key={k} className="flex min-w-40 flex-1 flex-col gap-1.5">
          <Label htmlFor={`f-${k}`}>{t(`opps.filters.${k}`)}</Label>
          <Select value={value[k]} onValueChange={(v) => onChange({ ...value, [k]: v })}>
            <SelectTrigger id={`f-${k}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('opps.filters.all')}</SelectItem>
              {options[k].map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
      <div className="flex min-h-12 items-center gap-3 rounded-xl bg-sky-50 px-4">
        <Switch
          id="f-rec"
          checked={value.recommended}
          onCheckedChange={(c) => onChange({ ...value, recommended: c })}
        />
        <Label htmlFor="f-rec" className="flex items-center gap-1.5">
          <Sparkles className="size-4 text-blue" aria-hidden />
          {t('opps.filters.recommended')}
        </Label>
      </div>
    </div>
  )
}
