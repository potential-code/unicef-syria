import type { CourseId, Youth } from '@shared/types'
import { Award } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Checkbox } from '@/components/ui/checkbox'
import { COURSE_BY_ID } from '@/data/courses'
import { useLocalized } from '@/i18n'
import { courseHref } from '../../lib/links'
import { completedCourses } from '../../lib/youth'

/**
 * Suggested training section: completed courses appear as suggestions and are only added to
 * the CV after the learner reviews and ticks each one (brief §14 Y11).
 */
export function CertificateSuggestions({
  youth,
  selected,
  onChange,
}: {
  youth: Youth
  selected: CourseId[]
  onChange: (ids: CourseId[]) => void
}) {
  const { t } = useTranslation('career')
  const { l } = useLocalized()
  const done = completedCourses(youth)
  return (
    <div className="rounded-2xl border border-sky-200 bg-grad-sky p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex items-center gap-2">
        <Award className="size-5 text-blue" aria-hidden />
        <h3 className="text-base">{t('toolkit.cv.suggestedTitle')}</h3>
      </div>
      <p className="mb-3 text-sm text-ink-soft">{t('toolkit.cv.suggestedBody')}</p>
      {done.length === 0 ? (
        <p className="rounded-xl bg-white px-3 py-3 text-sm text-ink-soft">
          {t('toolkit.cv.suggestedEmpty')}{' '}
          <a href="#/youth/library" className="font-semibold text-blue hover:underline">
            {t('toolkit.cv.openLibrary')}
          </a>
        </p>
      ) : (
        <ul className="space-y-2">
          {done.map((id) => {
            const cert = youth.progress[id]?.certificate
            const checked = selected.includes(id)
            return (
              <li
                key={id}
                className="flex flex-wrap items-center gap-3 rounded-xl bg-white px-3 py-2.5 shadow-sm"
              >
                <Checkbox
                  id={`cert-${id}`}
                  checked={checked}
                  onCheckedChange={(v) =>
                    onChange(v === true ? [...selected, id] : selected.filter((x) => x !== id))
                  }
                />
                <label
                  htmlFor={`cert-${id}`}
                  className="min-w-0 flex-1 cursor-pointer text-sm font-medium"
                >
                  {id} {l(COURSE_BY_ID[id].title)}
                </label>
                {cert && (
                  <StatusBadge tone={cert === 'issued' ? 'success' : 'notice'}>
                    {t(`common:certificate.${cert}`)}
                  </StatusBadge>
                )}
                <a
                  href={courseHref(id)}
                  className="shrink-0 text-xs font-semibold text-blue hover:underline"
                >
                  {t('toolkit.cv.review')}
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
