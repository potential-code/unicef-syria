import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

const TONES = ['bg-cyan', 'bg-yellow', 'bg-orange', 'bg-blue', 'bg-white']
const PIECES = Array.from({ length: 22 }, (_, i) => {
  const angle = (i / 22) * Math.PI * 2 + (i % 3) * 0.2
  const dist = 90 + ((i * 37) % 70)
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    rotate: (i * 47) % 360,
    tone: TONES[i % TONES.length],
    round: i % 2 === 0,
  }
})

/** Celebratory confetti-like burst built with Motion (decorative, hidden from assistive tech). */
export function Burst({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  if (reduce) return null
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible',
        className,
      )}
      aria-hidden
    >
      {PIECES.map((p, i) => (
        <motion.span
          // biome-ignore lint/suspicious/noArrayIndexKey: static decorative pieces
          key={i}
          className={cn('absolute size-2.5', p.tone, p.round ? 'rounded-full' : 'rounded-sm')}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.4, rotate: 0 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 1, rotate: p.rotate }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: (i % 4) * 0.04 }}
        />
      ))}
    </div>
  )
}
