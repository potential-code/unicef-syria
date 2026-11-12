import type { Youth } from '@shared/types'
import { useTranslation } from 'react-i18next'
import { StatusBadge, type Tone } from '@/components/shared/StatusBadge'

type Status = NonNullable<Youth['trainingApplication']>['status']
const TONES: Record<Status, Tone> = {
  pending: 'info',
  needsInfo: 'notice',
  accepted: 'success',
  waitlisted: 'brand',
  notSelected: 'neutral',
}

export function TrainingStatusBadge({ status }: { status: Status }) {
  const { t } = useTranslation('trainer')
  return <StatusBadge tone={TONES[status]}>{t(`appStatus.${status}`)}</StatusBadge>
}
