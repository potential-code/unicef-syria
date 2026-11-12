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
import { Switch } from '@/components/ui/switch'

export interface RosterFilterState {
  progress: 'all' | 'notStarted' | 'incomplete' | 'complete'
  attendance: 'all' | 'below' | 'full'
  assessment: 'all' | 'passed' | 'pending' | 'needsSupport' | 'notStarted'
  practical: 'all' | 'submitted'
  followUp: boolean
}
export const NO_FILTERS: RosterFilterState = {
  progress: 'all',
  attendance: 'all',
  assessment: 'all',
  practical: 'all',
  followUp: false,
}

const OPTIONS = {
  progress: ['all', 'notStarted', 'incomplete', 'complete'],
  attendance: ['all', 'below', 'full'],
  assessment: ['all', 'passed', 'pending', 'needsSupport', 'notStarted'],
  practical: ['all', 'submitted'],
} as const

/** T02 filters: progress, attendance, assessment status, practical submissions and support follow-up. */
export function RosterFilters({
  value,
  onChange,
}: {
  value: RosterFilterState
  onChange: (v: RosterFilterState) => void
}) {
  const { t } = useTranslation('trainer')
  const keys = Object.keys(OPTIONS) as (keyof typeof OPTIONS)[]
  const active = JSON.stringify(value) !== JSON.stringify(NO_FILTERS)
  return (
    <div className="card grid grid-cols-2 gap-3 p-4 lg:grid-cols-4 xl:grid-cols-[repeat(4,minmax(0,1fr))_auto] xl:items-end">
      {keys.map((k) => (
        <div key={k} className="min-w-0 space-y-1">
          <Label htmlFor={`f-${k}`} className="text-xs font-semibold text-ink-soft">
            {t(`filters.${k}`)}
          </Label>
          <Select value={value[k]} onValueChange={(v) => onChange({ ...value, [k]: v })}>
            <SelectTrigger id={`f-${k}`} size="sm" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {OPTIONS[k].map((o) => (
                <SelectItem key={o} value={o}>
                  {t(`filters.${k}Opt.${o}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
      <div className="col-span-2 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-3 lg:col-span-4 xl:col-span-1 xl:justify-end xl:border-0 xl:pt-0">
        <div className="flex h-9 items-center gap-2">
          <Switch
            id="f-follow"
            checked={value.followUp}
            onCheckedChange={(c) => onChange({ ...value, followUp: c })}
          />
          <Label htmlFor="f-follow" className="text-sm whitespace-nowrap">
            {t('filters.followUp')}
          </Label>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue"
          disabled={!active}
          onClick={() => onChange(NO_FILTERS)}
        >
          {t('common:clearFilters')}
        </Button>
      </div>
    </div>
  )
}
