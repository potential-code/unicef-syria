import type { Application, Opportunity } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Building2, CalendarClock, Lock, MapPin, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import { formatDate, useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { orgOf, stageTone, TYPE_ACCENT } from '../../config/opportunities'
import type { MatchExplanation } from '../../lib/match'
import { MatchReasons } from './MatchReasons'

/** Hub card: title, organisation, location, format, deadline, skills and type (brief §15 Y14). */
export function OpportunityCard({
  opp,
  app,
  match,
}: {
  opp: Opportunity
  app?: Application
  match: MatchExplanation
}) {
  const { t } = useTranslation('career')
  const { l, lang } = useLocalized()
  const closed = opp.status === 'closed'
  const accent = TYPE_ACCENT[opp.type]
  const org = orgOf(opp.orgId)
  return (
    <article
      className={cn(
        'card card-hover relative flex h-full flex-col overflow-hidden',
        closed && 'opacity-90',
      )}
    >
      <div className={cn('h-1.5', accent.bar)} aria-hidden />
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn('rounded-full px-3 py-1 text-xs font-bold', accent.tile)}>
            {t(`common:oppTypes.${opp.type}`)}
          </span>
          {closed ? (
            <StatusBadge tone="neutral" icon={<Lock className="size-3" aria-hidden />}>
              {t('opps.closed')}
            </StatusBadge>
          ) : (
            <StatusBadge tone="success">{t('opps.open')}</StatusBadge>
          )}
          {match.recommended && !app && (
            <StatusBadge tone="brand" icon={<Sparkles className="size-3" aria-hidden />}>
              {t('opps.recommended')}
            </StatusBadge>
          )}
          {app && (
            <StatusBadge tone={stageTone(app.stage)}>
              {t('opps.yourStage', { stage: t(`common:stages.${app.stage}`) })}
            </StatusBadge>
          )}
        </div>
        <div>
          <h3 className="text-xl leading-snug">{l(opp.title)}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft">
            <Building2 className="size-4 shrink-0" aria-hidden />
            {org ? l(org.name) : opp.orgId}
          </p>
        </div>
        <dl className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
          <div className="flex items-center gap-1.5">
            <MapPin className="size-4 shrink-0 text-blue" aria-hidden />
            <dt className="sr-only">{t('opps.detail.location')}</dt>
            <dd>
              {l(opp.location)} · {t(`common:format.${opp.workFormat}`)}
            </dd>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarClock className="size-4 shrink-0 text-blue" aria-hidden />
            <dt className="sr-only">{t('opps.detail.deadline')}</dt>
            <dd>{t('opps.deadline', { date: formatDate(opp.deadline, lang) })}</dd>
          </div>
        </dl>
        <ul className="flex flex-wrap gap-1.5" aria-label={t('opps.detail.skills')}>
          {opp.skills.map((s) => (
            <li
              key={s.en}
              className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-navy"
            >
              {l(s)}
            </li>
          ))}
        </ul>
        <MatchReasons match={match} />
        <div className="mt-auto pt-1">
          {closed && !app ? (
            <div className="space-y-2">
              <Button
                disabled
                className="w-full rounded-full"
                aria-describedby={`closed-${opp.id}`}
              >
                {t('opps.applyButton')}
              </Button>
              <p id={`closed-${opp.id}`} className="text-xs text-ink-soft">
                {t('opps.closedNote')}
              </p>
            </div>
          ) : (
            <Button asChild className="w-full rounded-full" variant={app ? 'outline' : 'default'}>
              <Link to="/youth/opportunities/$oppId" params={{ oppId: opp.id }}>
                {app ? t('opps.viewApplication') : t('opps.view')}
                <ArrowRight className="size-4 rtl-mirror" aria-hidden />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
