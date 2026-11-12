import { CircleCheck, CircleDot, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { StatusBadge } from '@/components/shared/StatusBadge'
import type { Rating } from '../../config/toolkit'

/** Descriptive practice rating: text plus icon, never a number. */
export function RatingBadge({ rating }: { rating: Rating }) {
  const { t } = useTranslation('career')
  if (rating === 'strong')
    return (
      <StatusBadge tone="success" icon={<Sparkles className="size-3.5" aria-hidden />}>
        {t('toolkit.ratings.strong')}
      </StatusBadge>
    )
  if (rating === 'clear')
    return (
      <StatusBadge tone="info" icon={<CircleCheck className="size-3.5" aria-hidden />}>
        {t('toolkit.ratings.clear')}
      </StatusBadge>
    )
  return (
    <StatusBadge tone="notice" icon={<CircleDot className="size-3.5" aria-hidden />}>
      {t('toolkit.ratings.developing')}
    </StatusBadge>
  )
}
