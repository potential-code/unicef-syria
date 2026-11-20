import type { CourseId, Youth } from '@shared/types'
import { ArrowDown, ArrowUp, CircleCheck, Clock, Target, Trash, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { COURSE_BY_ID } from '@/data/courses'
import { courseStatus } from '@/domain/completion'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { CATEGORY_META } from '../config'
import { courseCtaKey } from '../lib'
import { CourseEntryLink } from './CourseEntryLink'
import { CourseStatusBadge } from './CourseStatusBadge'

interface Props {
  youth: Youth
  courseId: CourseId
  step: number
  kind: 'core' | 'optional' | 'added'
  canUp: boolean
  canDown: boolean
  onMove: (dir: -1 | 1) => void
  onRemove: () => void
}

/** One course in the vertical learning journey with reason, time, prerequisites and capability. */
export function PlanCourseNode({
  youth,
  courseId,
  step,
  kind,
  canUp,
  canDown,
  onMove,
  onRemove,
}: Props) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  const c = COURSE_BY_ID[courseId]
  const status = courseStatus(youth.progress[courseId])
  const meta = CATEGORY_META[c.category]
  const title = l(c.title)

  return (
    <div className="relative flex gap-4">
      <span
        className={cn(
          'z-10 mt-6 size-4 shrink-0 rounded-full ring-4 ring-background',
          status === 'completed'
            ? 'bg-success'
            : status === 'inProgress'
              ? 'bg-yellow'
              : 'border-2 border-sky-200 bg-white',
        )}
        aria-hidden
      />
      <article className="card card-hover min-w-0 flex-1 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-extrabold tracking-wider text-blue uppercase">
            {status === 'completed' && (
              <CircleCheck className="size-3.5 text-success" aria-hidden />
            )}
            {t('path.stepN', { n: step })}
          </span>
          <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-bold', meta.chip)}>
            {courseId}
          </span>
          <CourseStatusBadge progress={youth.progress[courseId]} />
          {kind !== 'core' && (
            <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-bold text-navy">
              {t(`path.kind.${kind}`)}
            </span>
          )}
        </div>
        <h3 className="mt-2 text-lg">
          <CourseEntryLink
            courseId={courseId}
            progress={youth.progress[courseId]}
            className="hover:text-blue hover:underline"
          >
            {title}
          </CourseEntryLink>
        </h3>
        <p className="mt-1 text-sm">{t(`path.reasons.${courseId}`)}</p>
        <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm text-ink-soft sm:grid-cols-[auto_1fr]">
          <div className="flex items-start gap-1.5">
            <Clock className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
            <div>
              <dt className="sr-only">{t('path.time')}</dt>
              <dd>{t('common:minutes', { count: c.minutes })}</dd>
            </div>
          </div>
          <div className="flex items-start gap-1.5">
            <Zap className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
            <div>
              <dt className="font-semibold text-ink">{t('path.prereq')}</dt>
              <dd>
                {c.prerequisites.length
                  ? c.prerequisites
                      .map((p) =>
                        courseStatus(youth.progress[p]) === 'completed'
                          ? `${p} (${t('common:status.completed')})`
                          : p,
                      )
                      .join(', ')
                  : t('path.none')}
              </dd>
            </div>
          </div>
          <div className="flex items-start gap-1.5 sm:col-span-2">
            <Target className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
            <div>
              <dt className="font-semibold text-ink">{t('path.capability')}</dt>
              <dd>{l(c.outcomes[0])}</dd>
            </div>
          </div>
        </dl>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button asChild size="sm" className="rounded-full">
            <CourseEntryLink courseId={courseId} progress={youth.progress[courseId]}>
              {t(courseCtaKey(youth.progress[courseId]))}
            </CourseEntryLink>
          </Button>
          {kind !== 'core' && (
            <span className="ms-auto flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                disabled={!canUp}
                onClick={() => onMove(-1)}
                aria-label={t('path.moveUp', { title })}
              >
                <ArrowUp className="size-4" aria-hidden />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                disabled={!canDown}
                onClick={() => onMove(1)}
                aria-label={t('path.moveDown', { title })}
              >
                <ArrowDown className="size-4" aria-hidden />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-danger"
                onClick={onRemove}
                aria-label={t('path.remove', { title })}
              >
                <Trash className="size-4" aria-hidden />
              </Button>
            </span>
          )}
        </div>
      </article>
    </div>
  )
}
