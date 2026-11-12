import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

const BLOBS = [
  {
    cls: '-start-32 -top-24 size-[28rem] bg-cyan/45',
    x: [0, 40, -10, 0],
    y: [0, 30, 60, 0],
    d: 18,
  },
  {
    cls: 'end-[-8rem] top-1/3 size-[24rem] bg-yellow/30',
    x: [0, -50, 10, 0],
    y: [0, -30, 40, 0],
    d: 22,
  },
  {
    cls: 'start-1/3 -bottom-40 size-[30rem] bg-blue/60',
    x: [0, 30, -40, 0],
    y: [0, -40, 10, 0],
    d: 26,
  },
  { cls: 'end-1/4 top-[8%] size-48 bg-orange/25', x: [0, 20, -20, 0], y: [0, 25, -15, 0], d: 16 },
]

/** Slow drifting colour blobs behind the hero. Static under reduced motion. */
export function FloatingBlobs() {
  const reduce = useReducedMotion()
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
      {BLOBS.map((b) => (
        <motion.span
          key={b.cls}
          className={`absolute rounded-full blur-3xl ${b.cls}`}
          animate={reduce ? undefined : { x: b.x, y: b.y }}
          transition={{ duration: b.d, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        />
      ))}
      <svg className="absolute inset-0 size-full opacity-[0.07]" aria-hidden>
        <defs>
          <pattern id="hero-dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.6" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>
    </div>
  )
}
