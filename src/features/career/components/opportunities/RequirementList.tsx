import type { CourseId } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { CheckCircle2, CircleAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { courseHref } from '../../lib/links'
import type { Requirement } from '../../lib/match'

/** Inline validation: what is ready and what is missing, with a link to fix each gap. */
export function RequirementList({
  reqs,
  missingCourse,
  showErrors,
}: {
  reqs: Requirement[]
  missingCourse?: CourseId
  showErrors: boolean
}) {
  const { t } = useTranslation('career')
  return (
    <ul className="space-y-2" aria-label={t('opps.apply.checklist')}>
      {reqs.map((r) => (
        <li key={r.key} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          {r.met ? (
            <CheckCircle2 className="size-5 shrink-0 text-success" aria-hidden />
          ) : (
            <CircleAlert
              className={showErrors ? 'size-5 shrink-0 text-danger' : 'size-5 shrink-0 text-notice'}
              aria-hidden
            />
          )}
          <span className="font-medium">{t(`opps.apply.req.${r.key}`)}</span>
          <span
            className={
              r.met ? 'text-success' : showErrors ? 'font-semibold text-danger' : 'text-ink-soft'
            }
          >
            {r.met ? t('opps.apply.ready') : t('opps.apply.missing')}
          </span>
          {!r.met && r.fix === 'toolkit' && (
            <Link to="/youth/toolkit" className="ms-auto font-semibold text-blue hover:underline">
              {t('opps.apply.fix.toolkit')}
            </Link>
          )}
          {!r.met && r.fix === 'profile' && (
            <Link to="/youth/profile" className="ms-auto font-semibold text-blue hover:underline">
              {t('opps.apply.fix.profile')}
            </Link>
          )}
          {!r.met && r.fix === 'courses' && missingCourse && (
            <a
              href={courseHref(missingCourse)}
              className="ms-auto font-semibold text-blue hover:underline"
            >
              {t('opps.apply.fix.courses')}
            </a>
          )}
        </li>
      ))}
    </ul>
  )
}
