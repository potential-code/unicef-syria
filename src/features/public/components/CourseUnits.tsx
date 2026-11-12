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
        <li key={u.id} className="flex gap-4 rounded-2xl border bg-white p-4 shadow-sm">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-grad-unicef text-lg font-extrabold text-white">
            {i + 1}
          </span>
          <div>
            <p className="text-xs font-bold tracking-wide text-blue uppercase">
              {t('course.unit', { n: i + 1 })}
            </p>
            <h3 className="text-lg">{l(u.title)}</h3>
            <p className="text-ink-soft">{l(u.synopsis)}</p>
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
