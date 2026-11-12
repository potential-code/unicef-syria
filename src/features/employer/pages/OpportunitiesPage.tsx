import { Link } from '@tanstack/react-router'
import { Briefcase, Plus } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Stagger, StaggerItem } from '@/components/motion'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { OpportunityCard } from '../components/OpportunityCard'
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
      <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)} className="mb-5">
        <TabsList className="group-data-[orientation=horizontal]/tabs:h-auto">
          {(['all', 'open', 'closed'] as const).map((f) => (
            <TabsTrigger key={f} value={f} className="min-h-10 px-4">
              {t(`opps.filter.${f}`)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
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
        <Stagger className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {shown.map((o) => (
            <StaggerItem key={o.id}>
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
