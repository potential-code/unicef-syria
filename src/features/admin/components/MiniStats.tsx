import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const TONE = {
  blue: 'bg-[linear-gradient(140deg,var(--unicef-blue),var(--unicef-navy))] text-white [&_dt]:text-white/80',
  cyan: 'bg-[linear-gradient(140deg,var(--unicef-cyan),var(--unicef-cyan-600))] text-ink [&_dt]:text-ink/90',
  navy: 'bg-navy text-white [&_dt]:text-white/75',
  sky: 'bg-sky-100 text-navy ring-1 ring-cyan/25 [&_dt]:text-ink-soft',
} as const

export type MiniTone = keyof typeof TONE

const CYCLE: MiniTone[] = ['blue', 'cyan', 'navy']

/**
 * Compact coloured stat strip for metrics inside a card (cohort places, sessions, centre KPIs).
 * Same palette as `StatCard`, scaled down so three fit side by side in half a card.
 */
export function MiniStats({
  items,
  tones = CYCLE,
  className,
}: {
  items: { key: string; label: string; value: ReactNode }[]
  tones?: MiniTone[]
  className?: string
}) {
  return (
    <dl
      className={cn(
        'grid grid-cols-[repeat(auto-fit,minmax(min(100%,6.5rem),1fr))] gap-2',
        className,
      )}
    >
      {items.map((s, i) => (
        <div
          key={s.key}
          className={cn(
            'flex flex-col-reverse justify-end rounded-xl px-3 py-2.5 shadow-sm',
            TONE[tones[i % tones.length] ?? 'blue'],
          )}
        >
          <dt className="text-xs leading-snug font-medium">{s.label}</dt>
          <dd className="text-2xl leading-tight font-extrabold tracking-tight tabular-nums">
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
