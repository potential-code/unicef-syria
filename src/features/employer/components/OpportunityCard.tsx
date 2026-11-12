import type { Opportunity } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { CalendarDays, Info, MapPin, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { formatDate, useLocalized } from '@/i18n'
import { CloseOpportunityButton } from './CloseOpportunityButton'
import { OpportunityStatus } from './OpportunityStatus'

export function OpportunityCard({ opp, applicants }: { opp: Opportunity; applicants: number }) {
  const { t } = useTranslation('employer')
  const { l, lang, isPlaceholder } = useLocalized()
  const closed = opp.status === 'closed'
  return (
    <article className="flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue">
            {opp.id} · {t(`common:oppTypes.${opp.type}`)}
          </p>
          <h3 className="mt-1 text-lg">{l(opp.title)}</h3>
        </div>
        <OpportunityStatus status={opp.status} />
      </div>
      <p className="mt-2 line-clamp-3 whitespace-pre-line text-sm text-ink-soft">
        {l(opp.description)}
      </p>
      {isPlaceholder(opp.description) && (
        <p className="mt-1 text-xs text-ink-soft">{t('common:arabicPlaceholder')}</p>
      )}
      <dl className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-3">
        <div className="flex items-center gap-1.5">
          <MapPin className="size-4 text-blue" aria-hidden />
          <dt className="sr-only">{t('opps.location')}</dt>
          <dd>
            {l(opp.location)} · {t(`common:format.${opp.workFormat}`)}
          </dd>
        </div>
        <div className="flex items-center gap-1.5">
          <CalendarDays className="size-4 text-blue" aria-hidden />
          <dt className="sr-only">{t('opps.deadline')}</dt>
          <dd>{formatDate(opp.deadline, lang)}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="size-4 text-blue" aria-hidden />
          <dt className="sr-only">{t('apps.title')}</dt>
          <dd>{t('opps.applicantCount', { count: applicants })}</dd>
        </div>
      </dl>
      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={t('opps.skills')}>
        {opp.skills.map((s) => (
          <li
            key={s.en}
            className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-navy"
          >
            {l(s)}
          </li>
        ))}
      </ul>
      {closed && (
        <p className="mt-4 flex items-start gap-2 rounded-xl bg-muted p-3 text-sm text-ink">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          {t('opps.closedNote')}
        </p>
      )}
      {applicants === 0 && !closed && (
        <p className="mt-4 rounded-xl bg-sky-50 p-3 text-sm text-ink">
          {t('empty.noApplicants.body')}
        </p>
      )}
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
        <Button asChild variant="outline" size="sm" className="rounded-full">
          <Link to="/employer/applications">{t('opps.viewApplicants')}</Link>
        </Button>
        <CloseOpportunityButton opp={opp} />
      </div>
    </article>
  )
}
