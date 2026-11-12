import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { LaurelWreath } from '@/components/brand'
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
        'relative flex flex-col items-center gap-2.5 overflow-hidden rounded-2xl border border-dashed border-cyan/40 bg-sky-50/70 px-6 py-10 text-center',
        className,
      )}
    >
      <span className="relative flex h-16 w-24 items-center justify-center">
        <LaurelWreath className="absolute inset-0 h-full text-cyan/30" />
        <Icon className="relative -mt-1 size-6 text-blue" aria-hidden />
      </span>
      <h3 className="text-lg">{title}</h3>
      {body && <p className="max-w-md text-sm text-ink-soft">{body}</p>}
      {action}
    </div>
  )
}
