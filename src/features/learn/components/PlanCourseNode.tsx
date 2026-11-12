import type { CourseId, Youth } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { ArrowDown, ArrowUp, CircleCheck, Clock, Target, Trash, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { COURSE_BY_ID } from '@/data/courses'
import { courseStatus } from '@/domain/completion'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { CATEGORY_META } from '../config'
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
          'z-10 flex size-12 shrink-0 items-center justify-center rounded-2xl text-lg font-extrabold shadow-md',
          status === 'completed'
            ? 'bg-success text-white'
            : status === 'inProgress'
              ? 'bg-yellow text-ink'
              : 'bg-white text-navy ring-2 ring-sky-200',
        )}
        aria-hidden
      >
        {status === 'completed' ? <CircleCheck className="size-6" /> : step}
      </span>
      <article className="lift min-w-0 flex-1 rounded-3xl border bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
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
        <h3 className="mt-2 text-xl">
          <Link
            to="/youth/library/$courseId"
            params={{ courseId }}
            className="hover:text-blue hover:underline"
          >
            {title}
          </Link>
        </h3>
        <p className="mt-1 text-sm">{t(`path.reasons.${courseId}`)}</p>
        <dl className="mt-3 grid gap-2 text-sm text-ink-soft sm:grid-cols-3">
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
          <div className="flex items-start gap-1.5">
            <Target className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
            <div>
              <dt className="font-semibold text-ink">{t('path.capability')}</dt>
              <dd>{l(c.outcomes[0])}</dd>
            </div>
          </div>
        </dl>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button asChild size="sm" className="rounded-full">
            <Link to="/youth/library/$courseId" params={{ courseId }}>
              {status === 'completed'
                ? t('path.review')
                : status === 'inProgress'
                  ? t('path.continue')
                  : t('path.open')}
            </Link>
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
