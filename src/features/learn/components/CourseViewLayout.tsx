import type { Course, CourseProgress } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { CourseMenu, type MenuBlocks } from './CourseMenu'
import { CourseViewHeader } from './CourseViewHeader'
import { TemplateDialog } from './TemplateDialog'

/** Learner course view: top course card, course menu sidebar and the open unit or check. */
export function CourseViewLayout({
  course,
  progress,
  current,
  now,
  blocks,
  children,
}: {
  course: Course
  progress: CourseProgress | undefined
  current: number | 'quiz'
  now: string
  /** Blocks of the open unit, listed under it in the course menu. */
  blocks?: MenuBlocks
  children: ReactNode
}) {
  const { t } = useTranslation('learn')
  return (
    <div className="space-y-6">
      <Link
        to="/youth/library"
        className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-blue hover:underline"
      >
        <ArrowLeft className="size-4 rtl-mirror" aria-hidden />
        {t('view.allCourses')}
      </Link>
      <CourseViewHeader course={course} progress={progress} now={now} />
      <div className="grid gap-6 lg:grid-cols-[19rem_1fr]">
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <CourseMenu course={course} progress={progress} current={current} blocks={blocks} />
          {course.resources[0] && (
            <div>
              <p className="mb-2 text-sm font-bold">{t('player.resource')}</p>
              <TemplateDialog id={course.resources[0]} compact />
            </div>
          )}
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  )
}
