import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type Tone = 'neutral' | 'info' | 'success' | 'notice' | 'danger' | 'brand'
const TONE: Record<Tone, string> = {
  neutral: 'bg-muted text-ink-soft border-border',
  info: 'bg-info-soft text-info border-info/20',
  success: 'bg-success-soft text-success border-success/20',
  notice: 'bg-notice-soft text-notice border-notice/20',
  danger: 'bg-danger-soft text-danger border-danger/20',
  brand: 'bg-sky-100 text-navy border-cyan/30',
}

/** Status label: always text (plus optional icon), never colour alone. */
export function StatusBadge({
  tone = 'neutral',
  icon,
  children,
  className,
}: {
  tone?: Tone
  icon?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap',
        TONE[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  )
}
