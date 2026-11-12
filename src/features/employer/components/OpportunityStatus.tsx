import type { Opportunity } from '@shared/types'
import { CircleCheck, Lock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { StatusBadge } from '@/components/shared/StatusBadge'

export function OpportunityStatus({ status }: { status: Opportunity['status'] }) {
  const { t } = useTranslation('employer')
  return status === 'open' ? (
    <StatusBadge tone="success" icon={<CircleCheck className="size-3.5" aria-hidden />}>
      {t('opps.statusOpen')}
    </StatusBadge>
  ) : (
    <StatusBadge tone="neutral" icon={<Lock className="size-3.5" aria-hidden />}>
      {t('opps.statusClosed')}
    </StatusBadge>
  )
}
