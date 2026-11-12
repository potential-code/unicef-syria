import type { Course } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Clock, Signal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
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
      className={cn('card card-hover group flex h-full flex-col overflow-hidden', className)}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <SmartImage
          src={course.image}
          alt=""
          className="size-full transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={cn(
            'absolute start-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold shadow-sm',
            CATEGORY_TONE[course.category],
          )}
        >
          {l(CATEGORY_LABELS[course.category])}
        </span>
        <span className="absolute end-3 top-3 rounded-full bg-white/95 px-2 py-1 text-[11px] font-bold text-navy shadow-sm">
          {course.id}
        </span>
      </div>
      <div className="relative isolate flex min-w-0 flex-1 flex-col gap-2.5 p-5">
        <Motif variant="corner" className="-z-10 text-blue/[0.07]" />
        <h3 className="text-base leading-snug group-hover:text-blue">{l(course.title)}</h3>
        <p className="line-clamp-2 text-sm text-ink-soft">{l(course.outcomes[0])}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/60 pt-3 text-xs font-medium text-ink-soft">
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5 text-blue" aria-hidden />
            {t('common:minutes', { count: course.minutes })}
          </span>
          <span className="inline-flex items-center gap-1">
            <Signal className="size-3.5 text-blue" aria-hidden />
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
