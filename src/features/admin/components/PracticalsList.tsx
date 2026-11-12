import type { Youth } from '@shared/types'
import { ClipboardCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/components/shared/EmptyState'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { COURSE_BY_ID } from '@/data/courses'
import { COHORTS } from '@/data/orgs'
import { useLabels } from '../lib/useLabels'
import { LearnerName } from './LearnerName'

/** Practical tasks submitted and awaiting trainer grading. The centre monitors; trainers grade. */
export function PracticalsList({ youth }: { youth: Youth[] }) {
  const { t } = useTranslation('admin')
  const { l, trainer } = useLabels()
  const items = youth.flatMap((y) =>
    Object.values(y.progress)
      .filter((p) => p && p.practical === 'submitted' && !p.completedAt)
      .map((p) => ({ y, courseId: p?.courseId })),
  )
  if (!items.length)
    return (
      <EmptyState
        icon={ClipboardCheck}
        title={t('empty.noPracticals')}
        body={t('empty.noPracticalsBody')}
      />
    )
  return (
    <ul className="space-y-3">
      {items.map(({ y, courseId }) =>
        courseId ? (
          <li
            key={`${y.id}-${courseId}`}
            className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center"
          >
            <LearnerName y={y} to="/centre/participants/$youthId" />
            <div className="flex-1 text-sm">
              <p className="font-medium">
                {courseId} {l(COURSE_BY_ID[courseId].title)}
              </p>
              <p className="text-ink-soft">{l(COURSE_BY_ID[courseId].practicalTask)}</p>
            </div>
            <div className="flex flex-col items-start gap-1 sm:items-end">
              <StatusBadge tone="notice">{t('participants.awaitingGrading')}</StatusBadge>
              <span className="text-xs text-ink-soft">
                {t('participants.gradedBy', {
                  name: trainer(COHORTS.find((k) => y.cohortIds.includes(k.id))?.trainerId),
                })}
              </span>
            </div>
          </li>
        ) : null,
      )}
    </ul>
  )
}
