import type { ReactNode } from 'react'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

/** Labelled form field with inline error and optional hint. */
export function Field({
  id,
  label,
  error,
  hint,
  children,
  className,
  compact,
}: {
  id: string
  label: string
  error?: string
  hint?: string
  children: ReactNode
  className?: string
  /** Filter-bar style: small muted label, tighter gap. */
  compact?: boolean
}) {
  return (
    <div className={cn('flex min-w-0 flex-col', compact ? 'gap-1' : 'gap-1.5', className)}>
      <Label htmlFor={id} className={compact ? 'text-xs font-semibold text-ink-soft' : 'text-ink'}>
        {label}
      </Label>
      {children}
      {hint && !error && <p className="text-xs text-ink-soft">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
