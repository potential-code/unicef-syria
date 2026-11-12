import { Link } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Motif } from '@/components/brand'
import { cn } from '@/lib/utils'

export type StatTone = 'blue' | 'cyan' | 'navy' | 'yellow' | 'orange' | 'sky'

/** Suggested order for a row of stat cards so neighbours never share a colour. */
export const STAT_TONES: StatTone[] = ['blue', 'cyan', 'navy', 'yellow', 'orange', 'sky']

const TONE: Record<StatTone, { box: string; muted: string; motif: string; link: string }> = {
  blue: {
    box: 'bg-[linear-gradient(140deg,var(--unicef-blue),var(--unicef-navy))] text-white',
    muted: 'text-white/80',
    motif: 'text-white/14',
    link: 'text-white',
  },
  cyan: {
    box: 'bg-[linear-gradient(140deg,var(--unicef-cyan),var(--unicef-cyan-600))] text-ink',
    muted: 'text-ink/75',
    motif: 'text-white/35',
    link: 'text-ink',
  },
  navy: {
    box: 'bg-[linear-gradient(140deg,var(--unicef-navy),#002a73)] text-white',
    muted: 'text-white/75',
    motif: 'text-cyan/25',
    link: 'text-white',
  },
  yellow: {
    box: 'bg-[linear-gradient(140deg,#ffc53d,var(--unicef-yellow))] text-ink',
    muted: 'text-ink/75',
    motif: 'text-white/45',
    link: 'text-ink',
  },
  orange: {
    box: 'bg-[linear-gradient(140deg,var(--unicef-orange),#a93a06)] text-white',
    muted: 'text-white/85',
    motif: 'text-white/18',
    link: 'text-white',
  },
  sky: {
    box: 'bg-[linear-gradient(140deg,var(--unicef-sky-100),#ffffff)] text-navy ring-1 ring-cyan/25',
    muted: 'text-ink-soft',
    motif: 'text-blue/10',
    link: 'text-blue',
  },
}

const LEGACY: Record<string, StatTone> = { brand: 'blue', plain: 'sky' }

/**
 * Coloured metric card. Icon sits inline with the label (no chip), the number leads, and a laurel
 * motif from the emblem fills the corner. `hint` carries the definition or denominator (§19).
 * Pass `to` to make the whole card a link.
 */
export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = 'blue',
  footer,
  to,
  className,
}: {
  label: string
  value: ReactNode
  hint?: ReactNode
  icon?: LucideIcon
  tone?: StatTone | 'brand' | 'plain'
  footer?: ReactNode
  to?: string
  className?: string
}) {
  const t = TONE[LEGACY[tone] ?? (tone as StatTone)]
  const body = (
    <>
      <Motif variant="corner" className={t.motif} />
      <p className={cn('relative flex items-center gap-1.5 text-sm font-semibold', t.muted)}>
        {Icon && <Icon className="size-4 shrink-0" aria-hidden />}
        <span className="min-w-0">{label}</span>
      </p>
      <p className="relative mt-3 text-4xl leading-none font-extrabold tracking-tight tabular-nums">
        {value}
      </p>
      {hint && <p className={cn('relative mt-2 text-xs leading-snug', t.muted)}>{hint}</p>}
      {footer && (
        <div
          className={cn(
            'relative mt-3 text-sm font-semibold [&_a]:underline-offset-4 hover:[&_a]:underline',
            t.link,
          )}
        >
          {footer}
        </div>
      )}
    </>
  )
  const cls = cn(
    'relative flex flex-col overflow-hidden rounded-2xl p-5 shadow-md',
    t.box,
    className,
  )
  return to ? (
    <Link
      to={to}
      className={cn(cls, 'card-hover focus-visible:ring-4 focus-visible:ring-yellow/60')}
    >
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  )
}
