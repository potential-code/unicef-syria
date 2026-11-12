import type { Course, CourseProgress } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { CircleCheck, CircleDashed, CirclePlay, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'

/** The four units with status, linking into the learning player. */
export function UnitList({
  course,
  progress,
  compact,
  current,
}: {
  course: Course
  progress: CourseProgress | undefined
  compact?: boolean
  current?: number
}) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  return (
    <ol className="space-y-2">
      {course.units.map((u, i) => {
        const s = progress?.units[i] ?? 'todo'
        const Icon = s === 'done' ? CircleCheck : s === 'inProgress' ? Clock : CircleDashed
        const here = current === i + 1
        return (
          <li key={u.id}>
            <Link
              to="/youth/learn/$courseId/$unit"
              params={{ courseId: course.id, unit: String(i + 1) }}
              aria-current={here ? 'step' : undefined}
              className={cn(
                'flex min-h-12 items-start gap-3 rounded-2xl border-2 p-3 transition-colors',
                here
                  ? 'border-blue bg-blue text-white'
                  : 'border-transparent bg-sky-50 hover:border-sky-200',
              )}
            >
              <span
                className={cn(
                  'flex size-9 shrink-0 items-center justify-center rounded-xl font-extrabold',
                  here ? 'bg-white text-blue' : 'bg-white text-navy',
                )}
              >
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold leading-snug">{l(u.title)}</span>
                {!compact && (
                  <span
                    className={cn('mt-0.5 block text-sm', here ? 'text-white/85' : 'text-ink-soft')}
                  >
                    {l(u.synopsis)}
                  </span>
                )}
                <span
                  className={cn(
                    'mt-1 flex flex-wrap items-center gap-x-1 gap-y-0.5 text-xs font-semibold whitespace-nowrap',
                    here ? 'text-white' : s === 'done' ? 'text-success' : 'text-ink-soft',
                  )}
                >
                  <Icon className="size-3.5" aria-hidden />
                  {t(`common:status.${s === 'done' ? 'done' : s}`)}
                  {u.hasVideo && (
                    <>
                      <CirclePlay className="ms-2 size-3.5" aria-hidden />
                      {t('player.preview')}
                    </>
                  )}
                </span>
              </span>
            </Link>
          </li>
        )
      })}
    </ol>
  )
}
