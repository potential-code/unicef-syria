import type { Course, CourseProgress } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { BookOpenCheck, CircleCheck, CircleDashed, Clock, Lock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { quizPassed } from '@/domain/completion'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { BLOCK_ICON, type BlockKind } from '../blocks'

/** The open unit's blocks, shown nested under it. */
export interface MenuBlocks {
  kinds: BlockKind[]
  step: number
  done: number
  onSelect: (i: number) => void
}

const ROW =
  'flex min-h-14 items-start gap-3 border-s-4 px-4 py-3 text-start transition-colors duration-200'

/** Course view sidebar: the units and the final knowledge check, with status and the open item. */
export function CourseMenu({
  course,
  progress,
  current,
  blocks,
}: {
  course: Course
  progress: CourseProgress | undefined
  current: number | 'quiz'
  blocks?: MenuBlocks
}) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  const unitsLeft = !progress || progress.units.some((u) => u !== 'done')
  const quizOpen = !unitsLeft || quizPassed(progress) || !!progress?.completedAt
  const quizHere = current === 'quiz'

  return (
    <nav className="card overflow-hidden" aria-label={t('view.menu')}>
      <div className="border-b border-border/70 px-4 py-3.5">
        <p className="text-xs font-bold uppercase tracking-wider text-blue">{t('view.menu')}</p>
        <p className="mt-0.5 text-sm font-bold leading-snug">{l(course.title)}</p>
      </div>
      <ol className="divide-y divide-border/70">
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
                  ROW,
                  here ? 'border-blue bg-blue-50' : 'border-transparent hover:bg-sky-50',
                )}
              >
                <span className="w-6 shrink-0 pt-px text-sm font-extrabold text-blue tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      'block text-sm leading-snug font-semibold',
                      here && 'font-bold text-blue',
                    )}
                  >
                    {l(u.title)}
                  </span>
                  <span
                    className={cn(
                      'mt-1 flex items-center gap-1 text-xs font-semibold',
                      s === 'done' ? 'text-success' : 'text-ink-soft',
                    )}
                  >
                    <Icon className="size-3.5" aria-hidden />
                    {t(`common:status.${s}`)}
                  </span>
                </span>
              </Link>
              {here && blocks && (
                <ol className="space-y-0.5 bg-blue-50 px-3 pb-3" aria-label={l(u.title)}>
                  {blocks.kinds.map((k, bi) => {
                    const Bi = BLOCK_ICON[k]
                    const on = bi === blocks.step
                    const ok = bi < blocks.done
                    const open = bi <= blocks.done
                    return (
                      <li key={k}>
                        <button
                          type="button"
                          disabled={!open}
                          onClick={() => blocks.onSelect(bi)}
                          aria-current={on ? 'step' : undefined}
                          title={open ? undefined : t('block.locked')}
                          className={cn(
                            'flex min-h-11 w-full items-center gap-2.5 rounded-xl px-3 text-start text-sm transition-colors',
                            on
                              ? 'bg-blue font-semibold text-white shadow-sm'
                              : open
                                ? 'text-ink hover:bg-white'
                                : 'cursor-not-allowed text-ink-soft',
                          )}
                        >
                          {open ? (
                            <Bi
                              className={cn('size-4 shrink-0', on ? 'text-white' : 'text-blue')}
                              aria-hidden
                            />
                          ) : (
                            <Lock className="size-4 shrink-0" aria-hidden />
                          )}
                          <span className="flex-1">{t(`block.kind.${k}`)}</span>
                          {ok && (
                            <CircleCheck
                              className={cn('size-4', on ? 'text-white' : 'text-success')}
                              aria-label={t('block.completed')}
                            />
                          )}
                        </button>
                      </li>
                    )
                  })}
                </ol>
              )}
            </li>
          )
        })}
        <li>
          {quizOpen ? (
            <Link
              to="/youth/learn/$courseId/quiz"
              params={{ courseId: course.id }}
              aria-current={quizHere ? 'step' : undefined}
              className={cn(
                ROW,
                quizHere ? 'border-blue bg-blue-50' : 'border-transparent hover:bg-sky-50',
              )}
            >
              <BookOpenCheck className="mt-0.5 size-5 shrink-0 text-blue" aria-hidden />
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-bold uppercase tracking-wide text-ink-soft">
                  {t('view.finalTag')}
                </span>
                <span
                  className={cn('block text-sm font-semibold', quizHere && 'font-bold text-blue')}
                >
                  {t('course.finalCheck')}
                </span>
                {quizPassed(progress) && (
                  <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-success">
                    <CircleCheck className="size-3.5" aria-hidden />
                    {t('common:status.done')}
                  </span>
                )}
              </span>
            </Link>
          ) : (
            <div className={cn(ROW, 'border-transparent text-ink-soft')}>
              <Lock className="mt-0.5 size-5 shrink-0" aria-hidden />
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-bold uppercase tracking-wide">
                  {t('view.finalTag')}
                </span>
                <span className="block text-sm font-semibold">{t('course.finalCheck')}</span>
                <span className="mt-1 block text-xs">{t('course.quizLocked')}</span>
              </span>
            </div>
          )}
        </li>
      </ol>
    </nav>
  )
}
