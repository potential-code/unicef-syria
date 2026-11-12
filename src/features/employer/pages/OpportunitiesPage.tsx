import { Link } from '@tanstack/react-router'
import { Briefcase, Plus } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Stagger, StaggerItem } from '@/components/motion'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { OpportunityCard } from '../components/OpportunityCard'
import { SegmentTabs } from '../components/SegmentTabs'
import { useOrgScope } from '../hooks/use-org-scope'

type Filter = 'all' | 'open' | 'closed'

/** Own opportunities with close and reopen (brief §16 E01). */
export function OpportunitiesPage() {
  const { t } = useTranslation('employer')
  const { opportunities, applications } = useOrgScope()
  const [filter, setFilter] = useState<Filter>('all')
  const shown = opportunities.filter((o) => filter === 'all' || o.status === filter)
  return (
    <div>
      <PageHeader
        title={t('opps.title')}
        description={t('opps.body')}
        actions={
          <Button asChild className="rounded-full">
            <Link to="/employer/opportunities/new">
              <Plus className="size-4" aria-hidden />
              {t('opps.create')}
            </Link>
          </Button>
        }
      />
      <div className="mb-5">
        <SegmentTabs
          value={filter}
          onChange={setFilter}
          items={(['all', 'open', 'closed'] as const).map((f) => ({
            value: f,
            label: t(`opps.filter.${f}`),
            count: opportunities.filter((o) => f === 'all' || o.status === f).length,
          }))}
        />
      </div>
      {opportunities.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title={t('empty.noOpps.title')}
          body={t('empty.noOpps.body')}
        />
      ) : shown.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title={t('opps.noneInFilter')}
          body={t('opps.noneInFilterBody')}
        />
      ) : (
        <Stagger className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {shown.map((o) => (
            <StaggerItem key={o.id} className="h-full">
              <OpportunityCard
                opp={o}
                applicants={applications.filter((a) => a.opportunityId === o.id).length}
              />
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </div>
  )
}
