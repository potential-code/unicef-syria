import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react'
import { type PointerEvent, type ReactNode, useRef } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

/**
 * Pointer-driven 3D tilt with a moving glare, for elevated cards. Sets `--mx` / `--my` on itself
 * so children can use `.qt-spotlight`. Flat under reduced motion and for touch.
 */
export function TiltCard({
  children,
  className,
  max = 6,
  glare = true,
}: {
  children: ReactNode
  className?: string
  /** Maximum rotation in degrees. */
  max?: number
  glare?: boolean
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 180, damping: 20, mass: 0.5 }
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring)
  const gx = useTransform(px, (v) => `${v * 100}%`)
  const gy = useTransform(py, (v) => `${v * 100}%`)
  const glareBg = useMotionTemplate`radial-gradient(560px circle at ${gx} ${gy}, rgb(255 255 255 / 0.12), transparent 55%)`

  function move(event: PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== 'mouse' || !ref.current) return
    const box = ref.current.getBoundingClientRect()
    const nx = (event.clientX - box.left) / box.width
    const ny = (event.clientY - box.top) / box.height
    px.set(nx)
    py.set(ny)
    ref.current.style.setProperty('--mx', `${nx * 100}%`)
    ref.current.style.setProperty('--my', `${ny * 100}%`)
  }
  function reset() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div className={cn('[perspective:1200px]', className)}>
      <motion.div
        ref={ref}
        onPointerMove={move}
        onPointerLeave={reset}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group/tilt relative size-full"
      >
        {children}
        {glare && !reduce ? (
          <motion.div
            aria-hidden
            style={{ background: glareBg }}
            className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
          />
        ) : null}
      </motion.div>
    </div>
  )
}
