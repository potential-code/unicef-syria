import type { Application, Opportunity } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { Briefcase, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/button'
import { formatDate, useLocalized } from '@/i18n'
import { OpportunityStatus } from './OpportunityStatus'

/** Compact list of own opportunities with applicant counts (dashboard side panel). */
export function OpportunitySnapshot({
  opportunities,
  applications,
}: {
  opportunities: Opportunity[]
  applications: Application[]
}) {
  const { t } = useTranslation('employer')
  const { l, lang } = useLocalized()
  if (opportunities.length === 0) {
    return (
      <EmptyState
        icon={Briefcase}
        title={t('empty.noOpps.title')}
        body={t('empty.noOpps.body')}
        action={
          <Button asChild className="rounded-full">
            <Link to="/employer/opportunities/new">{t('opps.create')}</Link>
          </Button>
        }
      />
    )
  }
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,17rem),1fr))] gap-4">
      {opportunities.map((o) => {
        const count = applications.filter((a) => a.opportunityId === o.id).length
        return (
          <li key={o.id} className="card flex min-w-0 flex-col p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <p className="min-w-0 flex-1 font-bold text-navy">{l(o.title)}</p>
              <span className="shrink-0">
                <OpportunityStatus status={o.status} />
              </span>
            </div>
            <p className="mt-1 mb-4 text-xs text-ink-soft">
              {o.id} · {t(`common:oppTypes.${o.type}`)}
            </p>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-border/70 pt-3 text-sm">
              <span className="inline-flex items-center gap-1.5 font-semibold text-blue">
                <Users className="size-4" aria-hidden />
                {t('opps.applicantCount', { count })}
              </span>
              <span className="text-xs text-ink-soft tabular-nums">
                {t('opps.deadline')} {formatDate(o.deadline, lang)}
              </span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
