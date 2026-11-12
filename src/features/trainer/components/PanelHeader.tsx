import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Card heading for dashboard panels: inline icon, title, optional count and a one-line purpose. */
export function PanelHeader({
  icon: Icon,
  iconClass = 'text-blue',
  title,
  body,
  count,
  action,
}: {
  icon?: LucideIcon
  iconClass?: string
  title: string
  body?: ReactNode
  count?: number
  action?: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
      <div className="min-w-0">
        <h2 className="flex items-center gap-2 text-lg text-navy">
          {Icon && <Icon className={cn('size-5 shrink-0', iconClass)} aria-hidden />}
          <span>{title}</span>
          {count !== undefined && (
            <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-bold text-navy tabular-nums">
              {count}
            </span>
          )}
        </h2>
        {body && <p className="mt-1 text-sm text-ink-soft">{body}</p>}
      </div>
      {action}
    </div>
  )
}
