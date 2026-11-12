import type { BadgeId } from '@shared/types'
import {
  BookOpenCheck,
  Briefcase,
  Compass,
  Lightbulb,
  Lock,
  type LucideIcon,
  Rocket,
} from 'lucide-react'
import { LaurelWreath } from '@/components/brand'
import { cn } from '@/lib/utils'

const BADGE: Record<BadgeId, { icon: LucideIcon; fill: string; wreath: string }> = {
  careerExplorer: { icon: Compass, fill: 'from-cyan to-blue', wreath: 'text-cyan' },
  learningStarter: { icon: BookOpenCheck, fill: 'from-blue to-navy', wreath: 'text-blue' },
  jobReady: { icon: Briefcase, fill: 'from-navy to-[#002a73]', wreath: 'text-navy' },
  enterpriseExplorer: { icon: Lightbulb, fill: 'from-yellow to-orange', wreath: 'text-yellow' },
  freelanceStarter: { icon: Rocket, fill: 'from-orange to-[#a93a06]', wreath: 'text-orange' },
}

/**
 * Laurel medallion for a badge. Earned: coloured medal in a coloured wreath. Locked: outlined
 * medal in a pale wreath with a small lock. Decorative; pair it with the badge name in text.
 */
export function BadgeMedal({
  badge,
  earned,
  size = 88,
  className,
}: {
  badge: BadgeId
  earned: boolean
  size?: number
  className?: string
}) {
  const b = BADGE[badge]
  const Icon = b.icon
  return (
    <span
      className={cn('relative inline-flex shrink-0 items-center justify-center', className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <LaurelWreath className={cn('absolute inset-0 h-full', earned ? b.wreath : 'text-border')} />
      <span
        className={cn(
          'relative flex items-center justify-center rounded-full',
          earned
            ? `bg-gradient-to-br ${b.fill} text-white shadow-md ring-4 ring-white`
            : 'border-2 border-dashed border-input/60 bg-white text-ink-soft/60',
        )}
        style={{ width: size * 0.5, height: size * 0.5, marginTop: -size * 0.06 }}
      >
        <Icon style={{ width: size * 0.22, height: size * 0.22 }} strokeWidth={2.2} />
      </span>
      {!earned && (
        <span className="absolute end-[14%] bottom-[16%] flex size-6 items-center justify-center rounded-full bg-ink text-white shadow-sm">
          <Lock className="size-3" />
        </span>
      )}
    </span>
  )
}
