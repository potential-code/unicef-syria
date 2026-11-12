import { Link } from '@tanstack/react-router'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { Stagger, StaggerItem } from '@/components/motion'
import type { AdminFilters } from '../lib/filters'
import { useAdminFilters } from '../lib/useAdminFilters'

export interface Drill {
  to: string
  title: string
  body: string
  icon: LucideIcon
  extra?: AdminFilters
}

/** Drilldown links that keep the active filters (brief §19, §22). */
export function DrillCards({ items }: { items: Drill[] }) {
  const { linkSearch } = useAdminFilters()
  return (
    <Stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))] gap-3">
      {items.map((d) => (
        <StaggerItem key={d.to + d.title}>
          <Link
            to={d.to}
            search={linkSearch(d.extra)}
            className="card card-hover group relative flex h-full flex-col overflow-hidden p-4 focus-visible:outline-2"
          >
            <span className="flex items-center gap-2 font-semibold text-ink group-hover:text-blue">
              <d.icon className="size-4 shrink-0 text-blue" aria-hidden />
              <span className="min-w-0 flex-1">{d.title}</span>
              <ArrowRight
                className="size-4 shrink-0 text-blue rtl-mirror transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                aria-hidden
              />
            </span>
            <span className="mt-1 block text-sm text-ink-soft">{d.body}</span>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  )
}
