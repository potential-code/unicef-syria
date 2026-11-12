import type { CourseId, Localized, Youth } from '@shared/types'
import { Check, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { COURSE_BY_ID } from '@/data/courses'
import { useLocalized } from '@/i18n'
import { addToPlan } from '@/store/actions/youth'
import { courseHref } from '../../lib/links'
import { LText } from '../LText'

/** Library courses the coach recommends, with reasons and "Add to my plan". */
export function CourseSuggestions({
  courses,
  youth,
}: {
  courses: { courseId: CourseId; reason: Localized }[]
  youth: Youth
}) {
  const { t } = useTranslation('career')
  const { l } = useLocalized()
  return (
    <ul className="mt-3 grid gap-2">
      {courses.map(({ courseId, reason }) => {
        const course = COURSE_BY_ID[courseId]
        const inPlan = youth.plan.includes(courseId)
        return (
          <li
            key={courseId}
            className="flex flex-col gap-2 rounded-xl border bg-white p-3 sm:flex-row sm:items-center"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-grad-unicef text-xs font-bold text-white">
              {courseId}
            </span>
            <div className="min-w-0 flex-1 text-sm">
              <a href={courseHref(courseId)} className="font-semibold text-blue hover:underline">
                {l(course.title)}
              </a>
              <p className="text-ink-soft">
                <LText value={reason} />
              </p>
            </div>
            <Button
              size="sm"
              variant={inPlan ? 'secondary' : 'outline'}
              className="rounded-full"
              disabled={inPlan}
              onClick={() => {
                addToPlan(youth.id, courseId)
                toast.success(t('coaches.addedToPlan', { course: l(course.title) }))
              }}
            >
              {inPlan ? (
                <Check className="size-4" aria-hidden />
              ) : (
                <Plus className="size-4" aria-hidden />
              )}
              {inPlan ? t('coaches.inPlan') : t('coaches.addToPlan')}
            </Button>
          </li>
        )
      })}
    </ul>
  )
}
