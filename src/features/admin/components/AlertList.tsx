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
    <section
      aria-labelledby="alerts-title"
      className="rounded-3xl border bg-white p-4 shadow-sm sm:p-6"
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-2xl bg-yellow/25 text-notice">
          <AlertTriangle className="size-5" aria-hidden />
        </span>
        <div>
          <h2 id="alerts-title" className="text-lg">
            {t('alerts.title')}
          </h2>
          <p className="text-sm text-ink-soft">{t('alerts.body')}</p>
        </div>
      </div>
      <ul className="divide-y">
        {alerts.map((a) => {
          const Icon = ICON[a.kind]
          const target = targets[a.kind]?.(a)
          const cta = (
            <span className="inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-sm font-semibold text-blue group-hover:bg-sky-50">
              {t(`alerts.cta.${a.kind}`)}
              <ArrowRight className="size-4 rtl-mirror" aria-hidden />
            </span>
          )
          return (
            <li
              key={`${a.kind}-${a.youthIds?.join() ?? a.cohortId ?? ''}-${a.courseId ?? ''}`}
              className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center"
            >
              <div className="flex flex-1 items-start gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-blue">
                  <Icon className="size-4" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">
                    {t(`alerts.${a.kind}.title`, a.data)}
                  </p>
                  <p className="text-sm text-ink-soft">{t(`alerts.${a.kind}.body`, a.data)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 ps-11 sm:ps-0">
                <StatusBadge tone={a.severity === 'high' ? 'danger' : 'notice'}>
                  {t(`severity.${a.severity}`)}
                </StatusBadge>
                {a.kind === 'vacancies' ? (
                  <VacancyGapDialog
                    governorates={governorates}
                    trigger={
                      <button type="button" className="group">
                        {cta}
                      </button>
                    }
                  />
                ) : target ? (
                  <Link to={target.to} search={target.search as never} className="group">
                    {cta}
                  </Link>
                ) : null}
              </div>
            </li>
          )
        })}
        {missingNote && (
          <li className="flex items-center gap-3 py-3 text-sm text-ink-soft">
            <CheckCircle2 className="size-5 text-success" aria-hidden />
            {missingNote}
          </li>
        )}
      </ul>
    </section>
  )
}
