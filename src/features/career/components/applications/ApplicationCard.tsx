import type { Application, Opportunity } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Building2, CornerDownRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { STAGES } from '@/domain/application-stages'
import { formatDate, useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { orgOf, reachedIndex, stageTone, TYPE_ACCENT } from '../../config/opportunities'

/** List card: opportunity, stage, track progress and the next action. */
export function ApplicationCard({ app, opp }: { app: Application; opp?: Opportunity }) {
  const { t } = useTranslation('career')
  const { l, lang } = useLocalized()
  const stages = STAGES[app.track]
  const reached = reachedIndex(app)
  const branch = app.stage === 'notSelected' || app.stage === 'withdrawn'
  const last = app.timeline[app.timeline.length - 1]
  const org = opp ? orgOf(opp.orgId) : undefined
  return (
    <Link
      to="/youth/applications/$appId"
      params={{ appId: app.id }}
      className="card card-hover group flex h-full flex-col overflow-hidden"
    >
      <div className={cn('h-1.5', opp ? TYPE_ACCENT[opp.type].bar : 'bg-blue')} aria-hidden />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge tone={stageTone(app.stage)}>{t(`common:stages.${app.stage}`)}</StatusBadge>
          <span className="text-xs font-semibold text-ink-soft">
            {t(`apps.track.${app.track}`)}
          </span>
        </div>
        <div>
          <h3 className="text-lg leading-snug">{opp ? l(opp.title) : app.opportunityId}</h3>
          {org && (
            <p className="mt-0.5 flex items-center gap-1.5 text-sm text-ink-soft">
              <Building2 className="size-4" aria-hidden />
              {l(org.name)}
            </p>
          )}
        </div>
        <div className="flex gap-1" aria-hidden>
          {stages.map((s, i) => (
            <span
              key={s}
              className={cn(
                'h-1.5 flex-1 rounded-full',
                i <= reached ? (branch ? 'bg-orange' : 'bg-blue') : 'bg-sky-100',
              )}
            />
          ))}
        </div>
        <p className="flex items-start gap-1.5 text-sm">
          <CornerDownRight className="mt-0.5 size-4 shrink-0 text-blue rtl-mirror" aria-hidden />
          {t(`apps.next.${app.track}.${app.stage}`)}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-1 text-sm">
          {last && (
            <span className="text-ink-soft">
              {t('apps.updated', { date: formatDate(last.at, lang) })}
            </span>
          )}
          <span className="inline-flex items-center gap-1 font-semibold text-blue group-hover:underline">
            {t('apps.open')}
            <ArrowRight className="size-4 rtl-mirror" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  )
}
