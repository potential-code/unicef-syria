import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Empty states explain the next step instead of showing a blank panel (brief §2 Y02). */
export function EmptyState({
  icon: Icon,
  title,
  body,
  action,
  className,
}: {
  icon: LucideIcon
  title: string
  body?: ReactNode
  action?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-3 rounded-2xl border border-dashed border-cyan/40 bg-sky-50 px-6 py-10 text-center',
        className,
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-blue shadow-sm">
        <Icon className="size-6" aria-hidden />
      </span>
      <h3 className="text-lg">{title}</h3>
      {body && <p className="max-w-md text-sm text-ink-soft">{body}</p>}
      {action}
    </div>
  )
}
