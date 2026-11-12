import { motion, useMotionValue, useSpring } from 'motion/react'
import { type PointerEvent, type ReactNode, useRef } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

/**
 * Pulls its child gently towards the cursor (CTAs). Mouse only: touch, pen and reduced motion
 * get a plain wrapper.
 */
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 })

  function move(event: PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== 'mouse' || !ref.current) return
    const box = ref.current.getBoundingClientRect()
    x.set((event.clientX - (box.left + box.width / 2)) * strength)
    y.set((event.clientY - (box.top + box.height / 2)) * strength)
  }
  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
      style={{ x, y }}
      className={cn('inline-flex', className)}
    >
      {children}
    </motion.div>
  )
}
