import { Link } from '@tanstack/react-router'
import {
  AlertTriangle,
  ArrowRight,
  BellRing,
  Briefcase,
  CheckCircle2,
  ClipboardList,
  TrendingDown,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { cn } from '@/lib/utils'
import type { AlertKind, OpsAlert } from '../lib/alerts'
import { VacancyGapDialog } from './VacancyGapDialog'

const ICON = {
  completion: TrendingDown,
  followUp: BellRing,
  vacancies: Briefcase,
  practical: ClipboardList,
}

export interface AlertTarget {
  to: string
  search: Record<string, string>
}

/** Operational alerts (brief §18). Each opens the relevant filtered records. */
export function AlertList({
  alerts,
  targets,
  governorates,
  missingNote,
}: {
  alerts: OpsAlert[]
  targets: Partial<Record<AlertKind, (a: OpsAlert) => AlertTarget>>
  governorates: string[]
  missingNote?: string
}) {
  const { t } = useTranslation('admin')
  return (
    <section aria-labelledby="alerts-title" className="card overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border/70 px-5 py-4">
        <div className="min-w-0">
          <h2 id="alerts-title" className="flex items-center gap-2 text-lg">
            <AlertTriangle className="size-5 text-orange" aria-hidden />
            {t('alerts.title')}
            {alerts.length > 0 && (
              <span className="rounded-full bg-orange px-2 py-0.5 text-xs font-bold text-white tabular-nums">
                {alerts.length}
              </span>
            )}
          </h2>
          <p className="mt-0.5 text-sm text-ink-soft">{t('alerts.body')}</p>
        </div>
      </div>
      <ul className="divide-y divide-border/70">
        {alerts.map((a) => {
          const Icon = ICON[a.kind]
          const target = targets[a.kind]?.(a)
          const high = a.severity === 'high'
          const cta = (
            <span className="inline-flex h-9 items-center gap-1 rounded-full px-3 text-sm font-semibold text-blue ring-1 ring-blue/25 transition-colors group-hover:bg-blue group-hover:text-white">
              {t(`alerts.cta.${a.kind}`)}
              <ArrowRight className="size-4 rtl-mirror" aria-hidden />
            </span>
          )
          return (
            <li
              key={`${a.kind}-${a.youthIds?.join() ?? a.cohortId ?? ''}-${a.courseId ?? ''}`}
              className={cn(
                'relative flex flex-col gap-3 px-5 py-4 before:absolute before:inset-y-3 before:start-0 before:w-1 before:rounded-e-full sm:flex-row sm:items-center',
                high ? 'before:bg-red' : 'before:bg-yellow',
              )}
            >
              <div className="flex min-w-0 flex-1 items-start gap-3">
                <Icon
                  className={cn('mt-0.5 size-5 shrink-0', high ? 'text-red' : 'text-orange')}
                  aria-hidden
                />
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-ink">
                    {t(`alerts.${a.kind}.title`, a.data)}
                    <StatusBadge tone={high ? 'danger' : 'notice'}>
                      {t(`severity.${a.severity}`)}
                    </StatusBadge>
                  </p>
                  <p className="mt-0.5 text-sm text-ink-soft">
                    {t(`alerts.${a.kind}.body`, a.data)}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center ps-8 sm:ps-0">
                {a.kind === 'vacancies' ? (
                  <VacancyGapDialog
                    governorates={governorates}
                    trigger={
                      <button type="button" className="group rounded-full focus-visible:outline-2">
                        {cta}
                      </button>
                    }
                  />
                ) : target ? (
                  <Link
                    to={target.to}
                    search={target.search as never}
                    className="group rounded-full focus-visible:outline-2"
                  >
                    {cta}
                  </Link>
                ) : null}
              </div>
            </li>
          )
        })}
        {missingNote && (
          <li className="flex items-center gap-3 px-5 py-4 text-sm text-ink-soft">
            <CheckCircle2 className="size-5 text-success" aria-hidden />
            {missingNote}
          </li>
        )}
      </ul>
    </section>
  )
}
