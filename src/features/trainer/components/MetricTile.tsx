import { Link } from '@tanstack/react-router'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import type { RosterPreset } from '../config'

/** Performance panel metric that opens the matching filtered roster (brief §17). */
export function MetricTile({
  label,
  value,
  hint,
  icon: Icon,
  filter,
  alert,
}: {
  label: string
  value: ReactNode
  hint: string
  icon: LucideIcon
  filter: RosterPreset
  alert?: boolean
}) {
  const { t } = useTranslation('trainer')
  return (
    <Link
      to="/trainer/cohorts"
      search={{ filter }}
      className={cn(
        'group lift flex flex-col gap-3 rounded-2xl border bg-card p-5 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring',
        alert && 'border-orange/40 bg-notice-soft/40',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-ink-soft">{label}</p>
        <span
          className={cn(
            'flex size-9 items-center justify-center rounded-xl',
            alert ? 'bg-yellow/25 text-notice' : 'bg-sky-100 text-blue',
          )}
        >
          <Icon className="size-5" aria-hidden />
        </span>
      </div>
      <p className="text-3xl font-bold tracking-tight text-ink tabular-nums">{value}</p>
      <p className="text-xs text-ink-soft">{hint}</p>
      <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-blue">
        {t('dashboard.viewRoster')}
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-0.5 rtl-mirror"
          aria-hidden
        />
      </span>
    </Link>
  )
}
