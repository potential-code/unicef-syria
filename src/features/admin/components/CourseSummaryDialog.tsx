import type { CourseId } from '@shared/types'
import { BookOpen, Clock } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { StatusBadge } from '@/components/shared/StatusBadge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { COURSE_BY_ID } from '@/data/courses'
import { useLabels } from '../lib/useLabels'

/** Course summary for admins (the learning player itself is a youth-only screen). */
export function CourseSummaryDialog({
  courseId,
  trigger,
}: {
  courseId: CourseId
  trigger: ReactNode
}) {
  const { t } = useTranslation('admin')
  const { l } = useLabels()
  const c = COURSE_BY_ID[courseId]
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="size-5 text-blue" aria-hidden />
            {c.id} {l(c.title)}
          </DialogTitle>
          <DialogDescription className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1">
              <Clock className="size-4" aria-hidden />
              {t('common:minutes', { count: c.minutes })}
            </span>
            <StatusBadge tone="brand">{t(`course.delivery.${c.delivery}`)}</StatusBadge>
          </DialogDescription>
        </DialogHeader>
        <section>
          <h3 className="mb-1 text-sm font-semibold">{t('course.outcomes')}</h3>
          <ul className="list-disc space-y-1 ps-5 text-sm">
            {c.outcomes.map((o) => (
              <li key={o.en}>{l(o)}</li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="mb-1 text-sm font-semibold">{t('course.units')}</h3>
          <ol className="space-y-2 text-sm">
            {c.units.map((u, i) => (
              <li key={u.id} className="flex gap-3 rounded-xl bg-sky-50 p-2.5">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span>
                  <strong className="block">{l(u.title)}</strong>
                  <span className="text-ink-soft">{l(u.synopsis)}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>
        <p className="text-sm">
          <strong>{t('course.practical')}</strong> {l(c.practicalTask)}
        </p>
        <p className="text-xs text-ink-soft">{t('course.youthOnly')}</p>
      </DialogContent>
    </Dialog>
  )
}
