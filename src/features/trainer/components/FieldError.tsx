import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Inline validation message (renders nothing when empty). */
export function FieldError({ children, className }: { children: ReactNode; className?: string }) {
  if (!children) return null
  return (
    <p role="alert" className={cn('text-sm font-medium text-danger', className)}>
      {children}
    </p>
  )
}
