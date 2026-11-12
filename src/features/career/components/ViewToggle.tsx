import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Pill segmented control (list or calendar, tabs-like filters). */
export function ViewToggle<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T
  options: { value: T; label: string; icon?: LucideIcon }[]
  onChange: (v: T) => void
  label: string
}) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: a group of toggle buttons, not a fieldset form
    <div
      role="group"
      aria-label={label}
      className="inline-flex rounded-full bg-white p-1 shadow-sm ring-1 ring-border"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            'flex min-h-11 items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition-colors',
            value === o.value
              ? 'bg-blue text-white shadow-sm'
              : 'text-ink-soft hover:bg-sky-50 hover:text-ink',
          )}
        >
          {o.icon && <o.icon className="size-4" aria-hidden />}
          {o.label}
        </button>
      ))}
    </div>
  )
}
