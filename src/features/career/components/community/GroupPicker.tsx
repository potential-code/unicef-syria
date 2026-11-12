import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface GroupOption {
  id: string
  name: string
  description: string
  count: number
  icon: LucideIcon
  tone: string
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
      className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
    >
      {groups.map((g) => (
        <button
          key={g.id}
          type="button"
          aria-pressed={value === g.id}
          onClick={() => onChange(g.id)}
          className={cn(
            'flex min-h-11 shrink-0 items-start gap-3 rounded-2xl border-2 p-3 text-start transition-colors lg:w-full',
            value === g.id
              ? 'border-blue bg-white shadow-md'
              : 'border-transparent bg-white/70 hover:border-blue/30',
          )}
        >
          <span
            className={cn('flex size-10 shrink-0 items-center justify-center rounded-xl', g.tone)}
          >
            <g.icon className="size-5" aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-bold">{g.name}</span>
            <span className="hidden text-xs text-ink-soft lg:block">{g.description}</span>
            <span className="block text-xs text-ink-soft">
              {postsLabel(g.count)}
              {g.members && ` · ${membersLabel}`}
            </span>
          </span>
        </button>
      ))}
    </nav>
  )
}
