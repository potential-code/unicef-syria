import type { Course, Youth } from '@shared/types'
import { Award, Clock, Globe, MonitorPlay, Play } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SmartImage } from '@/components/shared/SmartImage'
import { Progress } from '@/components/ui/progress'
import { CATEGORY_LABELS } from '@/data/courses'
import { unitsDone } from '@/domain/completion'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { isCohortCourse } from '@/store/actions/learning'
import { CATEGORY_META } from '../config'
import { courseCtaKey } from '../lib'
import { CourseEntryLink } from './CourseEntryLink'
import { CourseStatusBadge } from './CourseStatusBadge'

/** Catalogue card: category, duration, route relevance, language, delivery, progress, certificate. */
export function CourseCard({ course, youth }: { course: Course; youth: Youth }) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  const meta = CATEGORY_META[course.category]
  const p = youth.progress[course.id]
  const done = unitsDone(p)
  const routes =
    course.routes === 'all'
      ? [t('library.allRoutes')]
      : course.routes.map((r) => t(`common:routesShort.${r}`))

  return (
    <CourseEntryLink
      courseId={course.id}
      progress={p}
      className="card card-hover group flex h-full flex-col overflow-hidden focus-visible:ring-4 focus-visible:ring-blue/30"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <SmartImage
          src={course.image}
          alt=""
          className="size-full transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={cn(
            'absolute start-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold shadow-sm',
            meta.chip,
          )}
        >
          <meta.icon className="size-3.5" aria-hidden />
          {l(CATEGORY_LABELS[course.category])}
        </span>
        <span className="absolute end-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-extrabold text-navy shadow-sm">
          {course.id}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <CourseStatusBadge progress={p} />
        </div>
        <h3 className="mt-2.5 text-base leading-snug font-bold group-hover:text-blue">
          {l(course.title)}
        </h3>
        <p className="mt-1 text-xs font-semibold text-blue">{routes.join(' · ')}</p>
        <ul className="mt-3 grid gap-y-1.5 border-t border-border/70 pt-3 text-xs text-ink-soft">
          <li className="flex items-center gap-1.5">
            <Clock className="size-3.5 shrink-0 text-blue" aria-hidden />
            {t('common:minutes', { count: course.minutes })} · {t(`library.level.${course.level}`)}
          </li>
          <li className="flex items-center gap-1.5">
            <MonitorPlay className="size-3.5 shrink-0 text-blue" aria-hidden />
            {t(`library.delivery.${course.delivery}`)}
          </li>
          <li className="flex items-center gap-1.5">
            <Globe className="size-3.5 shrink-0 text-blue" aria-hidden />
            {t('library.lang.enFull')}
          </li>
          <li className="flex items-center gap-1.5">
            <Award className="size-3.5 shrink-0 text-blue" aria-hidden />
            {isCohortCourse(youth, course.id) ? t('library.certReviewed') : t('library.certAuto')}
          </li>
        </ul>
        <div className="mt-auto pt-4">
          <div className="flex justify-between text-xs font-semibold text-ink-soft">
            <span>{t('library.progress')}</span>
            <span>{t('dash.unitsDone', { done, total: 4 })}</span>
          </div>
          <Progress
            value={(done / 4) * 100}
            className="mt-1 h-2 bg-sky-100"
            aria-label={t('library.progress')}
          />
        </div>
        <span className="mt-4 inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-blue px-4 text-sm font-semibold text-white shadow-sm transition-colors group-hover:bg-navy">
          <Play className="size-4" aria-hidden />
          {t(courseCtaKey(p))}
        </span>
      </div>
    </CourseEntryLink>
  )
}
