import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/shared/PageHeader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useFollowUps } from '@/store/actions/followups'
import { FollowUpSummary } from '../components/FollowUpSummary'
import { FollowUpTable } from '../components/FollowUpTable'
import { HistoricalEmpty } from '../components/HistoricalEmpty'
import { LayerSection } from '../components/LayerSection'
import { PracticalsList } from '../components/PracticalsList'
import { ReportContext } from '../components/ReportContext'
import { RosterTable } from '../components/RosterTable'
import { useAdminFilters } from '../lib/useAdminFilters'
import { useCurrentActivity } from '../lib/useCurrent'
import { useHistorical } from '../lib/useHistorical'
import { useScope } from '../lib/useScope'
import { useViewParam } from '../lib/useViewParam'

const VIEWS = ['followup', 'learners'] as const

/** Partner participants: graduate follow-up list and the network's current learners. */
export function PartnerParticipantsPage() {
  const { t } = useTranslation('admin')
  const { centreIds } = useScope()
  const { filters } = useAdminFilters()
  const current = useCurrentActivity(filters)
  const h = useHistorical(filters)
  const followUps = useFollowUps().filter(
    (f) => centreIds.includes(f.centreId) && (!filters.centreId || f.centreId === filters.centreId),
  )
  const [view, setView] = useViewParam(VIEWS, 'followup')
  return (
    <div className="space-y-6">
      <PageHeader
        title={t('partner.participants.title')}
        description={t('partner.participants.body')}
      />
      <ReportContext />
      <Tabs value={view} onValueChange={setView}>
        <TabsList className="flex h-auto w-full flex-wrap justify-start">
          {VIEWS.map((v) => (
            <TabsTrigger key={v} value={v} className="min-h-11">
              {t(`partner.participants.tabs.${v}`)}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="followup" className="mt-4 space-y-6">
          <LayerSection layer="current">
            <FollowUpTable items={followUps} />
          </LayerSection>
          <LayerSection layer="historical">
            {h.availability !== 'ok' || h.empty ? (
              <HistoricalEmpty availability={h.availability} />
            ) : (
              <FollowUpSummary k={h.k} />
            )}
          </LayerSection>
        </TabsContent>
        <TabsContent value="learners" className="mt-4 space-y-4">
          <RosterTable youth={current.inCohort} />
          <h2 className="text-lg">{t('participants.tabs.practicals')}</h2>
          <PracticalsList youth={current.inCohort} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
