import type { CourseProgress } from '@shared/types'
import { CircleCheck, CircleDashed, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { courseStatus } from '@/domain/completion'

/** Todo, In progress or Completed, always as text plus icon (brief §5). */
export function CourseStatusBadge({ progress }: { progress: CourseProgress | undefined }) {
  const { t } = useTranslation()
  const s = courseStatus(progress)
  if (s === 'completed')
    return (
      <StatusBadge tone="success" icon={<CircleCheck className="size-3.5" aria-hidden />}>
        {t('status.completed')}
      </StatusBadge>
    )
  if (s === 'inProgress')
    return (
      <StatusBadge tone="info" icon={<Clock className="size-3.5" aria-hidden />}>
        {t('status.inProgress')}
      </StatusBadge>
    )
  return (
    <StatusBadge icon={<CircleDashed className="size-3.5" aria-hidden />}>
      {t('status.todo')}
    </StatusBadge>
  )
}
