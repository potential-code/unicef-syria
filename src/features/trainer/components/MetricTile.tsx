import { Link } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { StatCard, type StatTone } from '@/components/shared/StatCard'
import type { RosterPreset } from '../config'

/**
 * Performance panel metric (brief §17): a coloured `StatCard` whose whole surface opens the
 * matching filtered roster. Thin wrapper so the roster preset travels as a search param.
 */
export function MetricTile({
  label,
  value,
  hint,
  icon,
  filter,
  tone,
}: {
  label: string
  value: ReactNode
  hint: string
  icon: LucideIcon
  filter: RosterPreset
  tone: StatTone
}) {
  return (
    <Link
      to="/trainer/cohorts"
      search={{ filter }}
      className="card-hover block h-full rounded-2xl outline-none focus-visible:ring-4 focus-visible:ring-yellow/60"
    >
      <StatCard
        label={label}
        value={value}
        hint={hint}
        icon={icon}
        tone={tone}
        className="h-full"
      />
    </Link>
  )
}
