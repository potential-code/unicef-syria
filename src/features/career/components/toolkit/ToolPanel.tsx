import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const ACCENT = {
  cyan: 'bg-sky-100 text-blue',
  yellow: 'bg-yellow/25 text-ink',
  orange: 'bg-orange/15 text-orange',
  navy: 'bg-blue-50 text-navy',
} as const

/** Rounded card for one toolkit area: coloured icon tile, title, intro and actions. */
export function ToolPanel({
  icon: Icon,
  title,
  intro,
  accent = 'cyan',
  actions,
  children,
  className,
}: {
  icon: LucideIcon
  title: string
  intro?: ReactNode
  accent?: keyof typeof ACCENT
  actions?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn('rounded-3xl border bg-white p-5 shadow-sm sm:p-7', className)}>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <span
            className={cn(
              'flex size-12 shrink-0 items-center justify-center rounded-2xl',
              ACCENT[accent],
            )}
          >
            <Icon className="size-6" aria-hidden />
          </span>
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl">{title}</h2>
            {intro && <p className="mt-1 max-w-2xl text-sm text-ink-soft">{intro}</p>}
          </div>
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
      {children}
    </section>
  )
}
