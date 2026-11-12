import type { CourseProgress } from '@shared/types'
import { CheckCircle2, CircleDashed } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { missingRequirements, unitsDone } from '@/domain/completion'

/** Shows exactly which completion prerequisites are missing (brief §17 T05). */
export function MissingList({
  progress,
  reviewed = true,
}: {
  progress: CourseProgress | undefined
  reviewed?: boolean
}) {
  const { t } = useTranslation('trainer')
  const missing = missingRequirements(progress, reviewed)
  if (missing.length === 0) {
    return (
      <p className="inline-flex items-center gap-1.5 text-sm font-medium text-success">
        <CheckCircle2 className="size-4" aria-hidden />
        {t('results.allMet')}
      </p>
    )
  }
  const detail = {
    units: t('results.missingUnits', {
      done: unitsDone(progress),
      total: progress?.units.length ?? 4,
    }),
    quiz:
      progress?.quizBest !== undefined
        ? t('results.missingQuizScore', { score: progress.quizBest })
        : t('results.missingQuiz'),
    practical:
      progress?.practical === 'submitted'
        ? t('results.missingReview')
        : progress?.practical === 'returned'
          ? t('results.missingRevision')
          : t('results.missingPractical'),
  }
  return (
    <ul className="space-y-1">
      {missing.map((m) => (
        <li key={m} className="flex items-start gap-1.5 text-sm text-ink">
          <CircleDashed className="mt-0.5 size-4 shrink-0 text-notice" aria-hidden />
          {detail[m]}
        </li>
      ))}
    </ul>
  )
}
