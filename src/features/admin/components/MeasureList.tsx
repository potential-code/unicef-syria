import { Info, type LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
import type { StatTone } from '@/components/shared/StatCard'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useLabels } from '../lib/useLabels'

type Tone = Extract<StatTone, 'blue' | 'cyan' | 'navy' | 'sky'>

/** Same surfaces as `StatCard`, so a group of measures reads as one coloured stat card. */
const TONE: Record<Tone, { box: string; muted: string; motif: string; cell: string; btn: string }> =
  {
    blue: {
      box: 'bg-[linear-gradient(140deg,var(--unicef-blue),var(--unicef-navy))] text-white',
      muted: 'text-white/80',
      motif: 'text-white/14',
      cell: 'border-white/20',
      btn: 'hover:bg-white/15',
    },
    cyan: {
      box: 'bg-[linear-gradient(140deg,var(--unicef-cyan),var(--unicef-cyan-600))] text-ink',
      muted: 'text-ink/90',
      motif: 'text-white/35',
      cell: 'border-ink/10',
      btn: 'hover:bg-white/50',
    },
    navy: {
      box: 'bg-[linear-gradient(140deg,var(--unicef-navy),#002a73)] text-white',
      muted: 'text-white/75',
      motif: 'text-cyan/25',
      cell: 'border-white/20',
      btn: 'hover:bg-white/15',
    },
    sky: {
      box: 'bg-[linear-gradient(140deg,var(--unicef-sky-100),#ffffff)] text-navy ring-1 ring-cyan/25',
      muted: 'text-ink-soft',
      motif: 'text-blue/10',
      cell: 'border-navy/10',
      btn: 'hover:bg-white',
    },
  }

/**
 * Several separate measures in one coloured stat card. They are never added together: each value
 * keeps its own label, divided by hairlines rather than boxed.
 */
export function MeasureList({
  icon: Icon,
  title,
  definition,
  items,
  note,
  tone = 'navy',
}: {
  icon: LucideIcon
  title: string
  definition: string
  items: { key: string; label: string; value: number }[]
  note?: string
  tone?: Tone
}) {
  const { t } = useTranslation('admin')
  const { n } = useLabels()
  const s = TONE[tone]
  return (
    <div
      className={cn(
        'relative flex h-full flex-col overflow-hidden rounded-2xl p-5 shadow-md',
        s.box,
      )}
    >
      <Motif variant="corner" className={s.motif} />
      <div className="relative flex items-start justify-between gap-2">
        <p className={cn('flex items-center gap-1.5 text-sm font-semibold', s.muted)}>
          <Icon className="size-4 shrink-0" aria-hidden />
          {title}
        </p>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className={cn(
                '-m-1.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full focus-visible:outline-2',
                s.btn,
              )}
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
      <dl
        className={cn(
          'relative mt-3 grid gap-x-4 gap-y-3',
          items.length === 1
            ? 'grid-cols-1'
            : items.length === 3
              ? 'grid-cols-[repeat(auto-fit,minmax(5.5rem,1fr))]'
              : 'grid-cols-2',
        )}
      >
        {items.map((i) => (
          <div key={i.key} className={cn('flex flex-col-reverse border-s-2 ps-3', s.cell)}>
            <dt className={cn('text-xs leading-snug', s.muted)}>{i.label}</dt>
            <dd className="text-3xl leading-tight font-extrabold tracking-tight tabular-nums">
              {n(i.value)}
            </dd>
          </div>
        ))}
      </dl>
      {note && <p className={cn('relative mt-auto pt-4 text-xs leading-snug', s.muted)}>{note}</p>}
    </div>
  )
}
