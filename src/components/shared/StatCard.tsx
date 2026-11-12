import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Metric tile. `hint` holds the denominator or definition (brief §19). */
export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = 'brand',
  footer,
  className,
}: {
  label: string
  value: ReactNode
  hint?: ReactNode
  icon?: LucideIcon
  tone?: 'brand' | 'yellow' | 'navy' | 'plain'
  footer?: ReactNode
  className?: string
}) {
  const iconTone = {
    brand: 'bg-sky-100 text-blue',
    yellow: 'bg-yellow/20 text-notice',
    navy: 'bg-blue-50 text-navy',
    plain: 'bg-muted text-ink-soft',
  }[tone]
  return (
    <div className={cn('flex flex-col gap-2 rounded-2xl border bg-card p-5 shadow-sm', className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-ink-soft">{label}</p>
        {Icon && (
          <span className={cn('flex size-9 items-center justify-center rounded-xl', iconTone)}>
            <Icon className="size-5" aria-hidden />
          </span>
        )}
      </div>
      <p className="text-3xl font-bold tracking-tight text-ink tabular-nums">{value}</p>
      {hint && <p className="text-xs text-ink-soft">{hint}</p>}
      {footer}
    </div>
  )
}
