import type { CoachId } from '@shared/types'
import { cn } from '@/lib/utils'
import { COACH_STYLE } from '../../config/coaches'

/** Icon avatar in the coach's brand colour (AI coaches never use photographs). */
export function CoachAvatar({ coachId, className }: { coachId: CoachId; className?: string }) {
  const s = COACH_STYLE[coachId]
  return (
    <span
      className={cn(
        'flex size-11 shrink-0 items-center justify-center rounded-2xl',
        s.tile,
        className,
      )}
      aria-hidden
    >
      <s.icon className="size-1/2" />
    </span>
  )
}
