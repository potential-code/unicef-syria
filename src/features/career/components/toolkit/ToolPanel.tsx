import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const ACCENT = {
  cyan: { icon: 'text-blue', bar: 'before:bg-cyan' },
  yellow: { icon: 'text-orange', bar: 'before:bg-yellow' },
  orange: { icon: 'text-orange', bar: 'before:bg-orange' },
  navy: { icon: 'text-navy', bar: 'before:bg-navy' },
} as const

/** Card for one toolkit area: accent bar, inline icon with the title, intro and actions. */
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
  const a = ACCENT[accent]
  return (
    <section
      className={cn(
        'card relative overflow-hidden rounded-3xl p-5 before:absolute before:inset-x-0 before:top-0 before:h-1.5 sm:p-7',
        a.bar,
        className,
      )}
    >
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1 basis-64">
          <h2 className="flex items-center gap-2 text-xl">
            <Icon className={cn('size-5 shrink-0', a.icon)} aria-hidden />
            {title}
          </h2>
          {intro && <p className="mt-1 max-w-2xl text-sm text-ink-soft">{intro}</p>}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
      </div>
      {children}
    </section>
  )
}
