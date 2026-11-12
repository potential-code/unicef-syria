import type { OpportunityId } from '@shared/types'
import { Inbox, Info } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Stagger, StaggerItem } from '@/components/motion'
import { EmptyState } from '@/components/shared/EmptyState'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePageTitle } from '@/hooks/use-page-title'
import { useLocalized } from '@/i18n'
import { saveDraft, useApplications, useOpportunities } from '@/store/actions/applications'
import { OpportunityCard } from '../components/OpportunityCard'
import { PageBanner } from '../components/PageBanner'
import { RegisterPrompt } from '../components/RegisterPrompt'
import { OPP_TABS } from '../config'
import { useGate } from '../hooks/use-gate'

/** Sample opportunity preview in three tabs (brief §2 P02). */
export function OpportunitiesPage({ item }: { item?: string }) {
  const { t } = useTranslation('public')
  const { l } = useLocalized()
  usePageTitle(t('opps.title'))
  const opps = useOpportunities()
  const apps = useApplications()
  const gate = useGate()
  const focus = opps.find((o) => o.id === item)
  const [tab, setTab] = useState(
    OPP_TABS.find((x) => focus && x.types.includes(focus.type))?.id ?? 'jobs',
  )

  useEffect(() => {
    if (item)
      document
        .getElementById(`opp-${item}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [item])

  const act = (id: OpportunityId, kind: 'apply' | 'save') => {
    const opp = opps.find((o) => o.id === id)
    if (!opp) return
    if (!gate.youthId) return gate.ask({ next: `/opportunities?item=${id}`, item: l(opp.title) })
    saveDraft(gate.youthId, id, {})
    toast.success(t(kind === 'apply' ? 'opps.drafted' : 'opps.savedToast'))
  }

  return (
    <>
      <PageBanner eyebrow={t('opps.eyebrow')} title={t('opps.title')} body={t('opps.body')} />
      <div className="container-page pt-8 pb-20">
        <p className="mb-6 flex gap-2 rounded-xl bg-sky-100 px-4 py-2.5 text-sm text-navy">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          {t('opps.honest')}
        </p>
        <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
          <TabsList className="mb-6 h-auto flex-wrap">
            {OPP_TABS.map((x) => (
              <TabsTrigger key={x.id} value={x.id} className="h-9 px-4">
                {t(`opps.tabs.${x.id}`)} ({opps.filter((o) => x.types.includes(o.type)).length})
              </TabsTrigger>
            ))}
          </TabsList>
          {OPP_TABS.map((x) => {
            const list = opps.filter((o) => x.types.includes(o.type))
            return (
              <TabsContent key={x.id} value={x.id}>
                {list.length === 0 ? (
                  <EmptyState
                    icon={Inbox}
                    title={t('opps.emptyTitle')}
                    body={t('opps.emptyBody')}
                  />
                ) : (
                  <Stagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {list.map((o) => (
                      <StaggerItem key={o.id} className="h-full">
                        <OpportunityCard
                          opp={o}
                          highlighted={o.id === item}
                          saved={
                            !!gate.youthId &&
                            apps.some((a) => a.youthId === gate.youthId && a.opportunityId === o.id)
                          }
                          onAct={(k) => act(o.id, k)}
                        />
                      </StaggerItem>
                    ))}
                  </Stagger>
                )}
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
      <RegisterPrompt prompt={gate.prompt} onClose={gate.close} />
    </>
  )
}
