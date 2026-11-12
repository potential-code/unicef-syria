import type { ApplicationStage } from '@shared/types'
import { CheckCircle2, CircleDot, MinusCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { stageTone } from '../config'

export function StageBadge({ stage }: { stage: ApplicationStage }) {
  const { t } = useTranslation()
  const tone = stageTone(stage)
  const Icon = tone === 'success' ? CheckCircle2 : tone === 'neutral' ? MinusCircle : CircleDot
  return (
    <StatusBadge tone={tone} icon={<Icon className="size-3.5" aria-hidden />}>
      {t(`stages.${stage}`)}
    </StatusBadge>
  )
}
