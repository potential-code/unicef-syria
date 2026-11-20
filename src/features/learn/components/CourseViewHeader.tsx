import type { Course, CourseProgress } from '@shared/types'
import { BookOpen, Clock, MonitorPlay } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
import { SmartImage } from '@/components/shared/SmartImage'
import { Progress } from '@/components/ui/progress'
import { courseProgressPct } from '@/domain/completion'
import { useLocalized } from '@/i18n'
import { CourseStatusBadge } from './CourseStatusBadge'

/** Course view top card: image, level, title, what is open now, details and progress. */
export function CourseViewHeader({
  course,
  progress,
  now,
}: {
  course: Course
  progress: CourseProgress | undefined
  now: string
}) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  const total = course.units.length
  const pct = courseProgressPct(progress)
  return (
    <section className="on-dark relative overflow-hidden rounded-3xl bg-grad-unicef p-5 text-white shadow-lg sm:p-7">
      <Motif variant="banner" className="text-white/[0.12]" />
      <div className="relative grid items-center gap-5 sm:grid-cols-[13rem_1fr] lg:grid-cols-[15rem_1fr] lg:gap-7">
        <SmartImage
          src={course.image}
          alt=""
          className="aspect-[16/10] w-full rounded-2xl shadow-md ring-2 ring-white/30"
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-yellow px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-ink">
              {t(`library.level.${course.level}`)}
            </span>
            <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-extrabold text-navy">
              {course.id}
            </span>
            <CourseStatusBadge progress={progress} />
          </div>
          <h1 className="mt-2 text-2xl leading-tight font-extrabold text-white sm:text-3xl">
            {l(course.title)}
          </h1>
          <p className="mt-1.5 text-sm text-white/80">
            {t('view.now')} <span className="font-semibold text-white">{now}</span>
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-white/90">
            <li className="flex items-center gap-1.5">
              <Clock className="size-4 text-yellow" aria-hidden />
              {t('common:minutes', { count: course.minutes })}
            </li>
            <li className="flex items-center gap-1.5">
              <MonitorPlay className="size-4 text-yellow" aria-hidden />
              {t(`library.delivery.${course.delivery}`)}
            </li>
            <li className="flex items-center gap-1.5">
              <BookOpen className="size-4 text-yellow" aria-hidden />
              {t('view.unitsN', { count: total })}
            </li>
          </ul>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wide text-white/80">
              <span>{t('view.progress')}</span>
              <span className="text-base text-white tabular-nums">{pct}%</span>
            </div>
            <Progress
              value={pct}
              className="mt-1.5 h-2.5 bg-white/20 [&>[data-slot=progress-indicator]]:bg-yellow"
              aria-label={t('view.progress')}
            />
            <p className="mt-1.5 text-xs text-white/80">{t('view.progressHint')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
