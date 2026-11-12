import type { Application, Opportunity } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { Briefcase } from 'lucide-react'
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
    <ul className="flex flex-col gap-3">
      {opportunities.map((o) => {
        const count = applications.filter((a) => a.opportunityId === o.id).length
        return (
          <li key={o.id} className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <p className="font-semibold text-ink">{l(o.title)}</p>
              <OpportunityStatus status={o.status} />
            </div>
            <p className="mt-1 text-sm text-ink-soft">
              {o.id} · {t(`common:oppTypes.${o.type}`)} · {t('opps.deadline')}{' '}
              {formatDate(o.deadline, lang)}
            </p>
            <p className="mt-2 text-sm font-medium text-blue">
              {t('opps.applicantCount', { count })}
            </p>
          </li>
        )
      })}
    </ul>
  )
}
