import { Check, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface GroupOption {
  id: string
  name: string
  description: string
  count: number
  icon: LucideIcon
  tone: string
  bar: string
  members?: boolean
}

/** Group list: scrollable chips on mobile, stacked cards on desktop. */
export function GroupPicker({
  groups,
  value,
  onChange,
  label,
  membersLabel,
  postsLabel,
}: {
  groups: GroupOption[]
  value: string
  onChange: (id: string) => void
  label: string
  membersLabel: string
  postsLabel: (n: number) => string
}) {
  return (
    <nav
      aria-label={label}
      className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
    >
      {groups.map((g) => (
        <button
          key={g.id}
          type="button"
          aria-pressed={value === g.id}
          onClick={() => onChange(g.id)}
          className={cn(
            'relative flex shrink-0 items-start gap-2.5 overflow-hidden rounded-xl border p-3 ps-4 text-start shadow-sm transition-colors before:absolute before:inset-y-0 before:start-0 before:w-1 lg:w-full',
            value === g.id
              ? 'border-blue bg-blue text-white shadow-md before:bg-yellow'
              : cn('border-border/70 bg-white hover:border-blue/40 hover:shadow-md', g.bar),
          )}
        >
          <g.icon
            className={cn('mt-0.5 size-4 shrink-0', value === g.id ? 'text-yellow' : g.tone)}
            aria-hidden
          />
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold">{g.name}</span>
            <span
              className={cn(
                'hidden text-xs lg:block',
                value === g.id ? 'text-white/85' : 'text-ink-soft',
              )}
            >
              {g.description}
            </span>
            <span
              className={cn('block text-xs', value === g.id ? 'text-white/85' : 'text-ink-soft')}
            >
              {postsLabel(g.count)}
              {g.members && ` · ${membersLabel}`}
            </span>
          </span>
          {value === g.id && <Check className="mt-0.5 size-4 shrink-0" aria-hidden />}
        </button>
      ))}
    </nav>
  )
}
