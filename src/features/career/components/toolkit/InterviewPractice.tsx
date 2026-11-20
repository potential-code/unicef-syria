import type { Youth } from '@shared/types'
import { MessageSquareText } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useLocalized } from '@/i18n'
import { useOpportunities } from '@/store/actions/applications'
import { AiBadge } from '../coaches/AiBadge'
import { InterviewHistory } from './InterviewHistory'
import { InterviewSimulation } from './InterviewSimulation'
import { ToolPanel } from './ToolPanel'

const DEFAULT_OPP = { employment: 'O01', enterprise: 'O06', freelance: 'O04' } as const

/** Interview practice (brief §13): a mock interview with Lina AI, plus the saved history. */
export function InterviewPractice({ youth }: { youth: Youth }) {
  const { t } = useTranslation('career')
  const { l } = useLocalized()
  const opps = useOpportunities()
  const [oppId, setOppId] = useState<string>(DEFAULT_OPP[youth.route ?? 'employment'])
  const opp = opps.find((o) => o.id === oppId) ?? opps[0]

  return (
    <ToolPanel
      icon={MessageSquareText}
      accent="yellow"
      title={t(youth.route === 'enterprise' ? 'toolkit.tabs.pitch' : 'toolkit.tabs.interview')}
      intro={t(
        youth.route === 'enterprise' ? 'toolkit.interview.introPitch' : 'toolkit.interview.intro',
      )}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="min-w-0 space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0 flex-1 basis-64 space-y-1.5">
              <Label htmlFor="iv-opp" className="font-semibold">
                {t('toolkit.interview.opportunity')}
              </Label>
              <Select value={oppId} onValueChange={setOppId}>
                <SelectTrigger id="iv-opp" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {opps.map((o) => (
                    <SelectItem key={o.id} value={o.id}>
                      {o.id} {l(o.title)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <AiBadge />
          </div>
          {opp && <InterviewSimulation key={opp.id} youth={youth} opp={opp} />}
          <p className="text-xs text-ink-soft">{t('toolkit.interview.disclaimer')}</p>
        </div>
        <div className="space-y-3">
          <h3 className="text-base">{t('toolkit.interview.history')}</h3>
          <InterviewHistory items={youth.toolkit.interviews} />
        </div>
      </div>
    </ToolPanel>
  )
}
