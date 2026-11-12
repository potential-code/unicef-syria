import type { CoachId } from '@shared/types'
import { GlobeGrid } from '@/components/brand'
import { COACHES } from '@/data/coaches'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { COACH_STYLE } from '../../config/coaches'

const SIZE = {
  sm: { box: 'size-9 rounded-xl', letter: 'text-base', tag: 'hidden' },
  md: {
    box: 'size-12 rounded-2xl',
    letter: 'text-xl',
    tag: 'text-[0.55rem] px-1 -bottom-1 -end-1',
  },
  lg: {
    box: 'size-[4.5rem] rounded-[1.35rem]',
    letter: 'text-3xl',
    tag: 'text-[0.65rem] px-1.5 -bottom-1.5 -end-1.5',
  },
} as const

/**
 * Coach identity tile: the coach's gradient, its initial set large over the emblem's globe lines,
 * and a small "AI" tag (AI coaches never use photographs).
 */
export function CoachAvatar({
  coachId,
  size = 'md',
  className,
}: {
  coachId: CoachId
  size?: keyof typeof SIZE
  className?: string
}) {
  const { l } = useLocalized()
  const s = COACH_STYLE[coachId]
  const z = SIZE[size]
  const coach = COACHES.find((c) => c.id === coachId)
  const initial = coach ? Array.from(l(coach.name).trim())[0] : '?'
  return (
    <span className={cn('relative inline-flex shrink-0', className)} aria-hidden>
      <span
        className={cn(
          'relative flex items-center justify-center overflow-hidden shadow-md ring-2 ring-white',
          z.box,
          s.grad,
          s.ink,
        )}
      >
        <GlobeGrid
          className={cn('absolute -end-[30%] -bottom-[30%] size-[110%]', s.motif)}
          strokeWidth={2}
        />
        <span className={cn('relative leading-none font-extrabold', z.letter)}>{initial}</span>
      </span>
      <span
        className={cn(
          'absolute rounded-md bg-white py-0.5 leading-none font-extrabold tracking-wide text-navy shadow-sm ring-1 ring-navy/10',
          z.tag,
        )}
      >
        AI
      </span>
    </span>
  )
}
