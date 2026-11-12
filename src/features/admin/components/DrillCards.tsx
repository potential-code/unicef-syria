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
    <Stagger className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((d) => (
        <StaggerItem key={d.to + d.title}>
          <Link
            to={d.to}
            search={linkSearch(d.extra)}
            className="lift group flex h-full items-start gap-3 rounded-2xl border bg-white p-4 shadow-sm focus-visible:outline-2"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-blue">
              <d.icon className="size-5" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1 font-semibold text-ink group-hover:text-blue">
                {d.title}
                <ArrowRight
                  className="size-4 rtl-mirror transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
              <span className="mt-0.5 block text-sm text-ink-soft">{d.body}</span>
            </span>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  )
}
