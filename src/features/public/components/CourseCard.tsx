import type { Course } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Clock, Signal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SmartImage } from '@/components/shared/SmartImage'
import { CATEGORY_LABELS } from '@/data/courses'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'

const CATEGORY_TONE: Record<Course['category'], string> = {
  foundations: 'bg-cyan text-ink',
  employment: 'bg-blue text-white',
  entrepreneurship: 'bg-yellow text-ink',
  freelancing: 'bg-orange text-white',
  technical: 'bg-navy text-white',
}

/** Public course summary card linking to the course detail. */
export function CourseCard({ course, className }: { course: Course; className?: string }) {
  const { t } = useTranslation('public')
  const { l } = useLocalized()
  return (
    <Link
      to="/explore/$courseId"
      params={{ courseId: course.id }}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-lg',
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <SmartImage
          src={course.image}
          alt=""
          className="size-full transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={cn(
            'absolute start-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold',
            CATEGORY_TONE[course.category],
          )}
        >
          {l(CATEGORY_LABELS[course.category])}
        </span>
        <span className="absolute end-3 top-3 rounded-full bg-white/95 px-2 py-1 text-xs font-bold text-navy">
          {course.id}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg leading-snug group-hover:text-blue">{l(course.title)}</h3>
        <p className="line-clamp-2 text-sm text-ink-soft">{l(course.outcomes[0])}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-soft">
          <span className="inline-flex items-center gap-1">
            <Clock className="size-4" aria-hidden />
            {t('common:minutes', { count: course.minutes })}
          </span>
          <span className="inline-flex items-center gap-1">
            <Signal className="size-4" aria-hidden />
            {t(`levels.${course.level}`)}
          </span>
          <ArrowUpRight
            className="ms-auto size-5 text-blue transition-transform group-hover:-translate-y-0.5 rtl-mirror"
            aria-hidden
          />
        </div>
      </div>
    </Link>
  )
}
