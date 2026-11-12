import type { Course } from '@shared/types'
import { useTranslation } from 'react-i18next'
import { useLocalized } from '@/i18n'

/** The four units with title and synopsis. */
export function CourseUnits({ course }: { course: Course }) {
  const { t } = useTranslation('public')
  const { l, isPlaceholder } = useLocalized()
  return (
    <ol className="space-y-3">
      {course.units.map((u, i) => (
        <li key={u.id} className="card relative flex gap-4 overflow-hidden p-5">
          <span className="absolute inset-y-0 start-0 w-1 bg-grad-unicef-v" aria-hidden />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold tracking-wide text-blue uppercase">
              {t('course.unit', { n: i + 1 })}
            </p>
            <h3 className="text-base sm:text-lg">{l(u.title)}</h3>
            <p className="mt-0.5 text-ink-soft">{l(u.synopsis)}</p>
            {isPlaceholder(u.synopsis) && (
              <span className="mt-1 inline-block text-xs text-ink-soft italic">
                {t('common:arabicPlaceholder')}
              </span>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
