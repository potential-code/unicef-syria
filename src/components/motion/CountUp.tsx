import { animate, motion, useInView, useMotionValue, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface CountUpProps {
  value: number
  decimals?: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

/** Animates a number from 0 to `value` when it enters the viewport. Used on KPI cards. */
export function CountUp({
  value,
  decimals = 0,
  suffix = '',
  prefix = '',
  duration = 1.2,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()
  const mv = useMotionValue(reduce ? value : 0)
  const text = useTransform(
    mv,
    (v) =>
      `${prefix}${v.toLocaleString('en-GB', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`,
  )

  useEffect(() => {
    if (reduce) {
      mv.set(value)
      return
    }
    if (!inView) return
    const controls = animate(mv, value, { duration, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [inView, value, duration, reduce, mv])

  return (
    <motion.span ref={ref} className={className} aria-label={`${prefix}${value}${suffix}`}>
      {text}
    </motion.span>
  )
}
