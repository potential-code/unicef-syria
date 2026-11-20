import {
  FileSignature,
  FileText,
  Lightbulb,
  type LucideIcon,
  MessageSquareText,
  Palette,
  Wrench,
} from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useMyYouth } from '@/store/hooks'
import { CareerHero } from '../components/CareerHero'
import { BusinessConcept } from '../components/toolkit/BusinessConcept'
import { CoachDraftNote } from '../components/toolkit/CoachDraftNote'
import { CvBuilder } from '../components/toolkit/CvBuilder'
import { FreelanceProfile } from '../components/toolkit/FreelanceProfile'
import { InterviewPractice } from '../components/toolkit/InterviewPractice'
import { ProposalBuilder } from '../components/toolkit/ProposalBuilder'
import { ToolkitStats } from '../components/toolkit/ToolkitStats'
import { TAB_ORDER, type ToolkitTab } from '../config/toolkit'

const ICONS: Record<ToolkitTab, LucideIcon> = {
  cv: FileText,
  interview: MessageSquareText,
  business: Lightbulb,
  freelance: Palette,
  proposal: FileSignature,
}

/** Y11 route-specific career toolkit: every tool visible, ordered by the learner's route. */
export function ToolkitPage() {
  const { t } = useTranslation('career')
  const youth = useMyYouth()
  const order = TAB_ORDER[youth.route ?? 'none']
  const [tab, setTab] = useState<ToolkitTab>(order[0] ?? 'cv')
  const routeLabel = youth.route ? t(`common:routes.${youth.route}`) : t('toolkit.noRoute')

  return (
    <div className="space-y-6">
      <CareerHero
        icon={Wrench}
        eyebrow={t('toolkit.eyebrow', { route: routeLabel })}
        title={t('toolkit.title')}
        body={t('toolkit.body')}
      />
      <ToolkitStats youth={youth} />
      <CoachDraftNote />
      <Tabs value={tab} onValueChange={(v) => setTab(v as ToolkitTab)} className="gap-5">
        <TabsList className="no-scrollbar h-auto w-full justify-start gap-2 overflow-x-auto rounded-2xl bg-transparent p-1 group-data-[orientation=horizontal]/tabs:h-auto">
          {order.map((id, i) => {
            const Icon = ICONS[id]
            return (
              <TabsTrigger
                key={id}
                value={id}
                className="h-10 flex-none gap-2 rounded-full border border-border bg-white px-4 text-sm font-semibold text-ink shadow-sm hover:border-blue/50 data-[state=active]:border-blue data-[state=active]:bg-blue data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                <Icon className="size-4" aria-hidden />
                {t(
                  id === 'interview' && youth.route === 'enterprise'
                    ? 'toolkit.tabs.pitch'
                    : `toolkit.tabs.${id}`,
                )}
                {i < 2 && youth.route && (
                  <span className="rounded-full bg-yellow px-1.5 text-[0.65rem] font-bold text-ink">
                    {t('toolkit.forYou')}
                  </span>
                )}
              </TabsTrigger>
            )
          })}
        </TabsList>
        <TabsContent value="cv">
          <CvBuilder youth={youth} />
        </TabsContent>
        <TabsContent value="interview">
          <InterviewPractice youth={youth} />
        </TabsContent>
        <TabsContent value="business">
          <BusinessConcept youth={youth} />
        </TabsContent>
        <TabsContent value="freelance">
          <FreelanceProfile youth={youth} />
        </TabsContent>
        <TabsContent value="proposal">
          <ProposalBuilder youth={youth} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
