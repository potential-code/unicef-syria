import { Info, type LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useLabels } from '../lib/useLabels'

/** Several separate measures in one card. They are never added together. */
export function MeasureList({
  icon: Icon,
  title,
  definition,
  items,
  note,
}: {
  icon: LucideIcon
  title: string
  definition: string
  items: { key: string; label: string; value: number }[]
  note?: string
}) {
  const { t } = useTranslation('admin')
  const { n } = useLabels()
  return (
    <div className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <p className="flex items-center gap-2 text-sm font-medium text-ink-soft">
          <Icon className="size-4 text-blue" aria-hidden />
          {title}
        </p>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="-m-2 inline-flex size-9 items-center justify-center rounded-full text-ink-soft hover:bg-sky-100 hover:text-blue"
              aria-label={t('kpi.definitionFor', { label: title })}
            >
              <Info className="size-4" aria-hidden />
            </button>
          </TooltipTrigger>
          <TooltipContent className="max-w-72 p-3 text-start text-xs leading-relaxed">
            {definition}
          </TooltipContent>
        </Tooltip>
      </div>
      <dl className="grid grid-cols-2 gap-2">
        {items.map((i) => (
          <div key={i.key} className="flex flex-col-reverse rounded-xl bg-sky-50 px-3 py-2">
            <dt className="text-xs leading-snug text-ink-soft">{i.label}</dt>
            <dd className="text-xl font-bold tabular-nums text-ink">{n(i.value)}</dd>
          </div>
        ))}
      </dl>
      {note && <p className="mt-auto text-xs text-ink-soft">{note}</p>}
    </div>
  )
}
