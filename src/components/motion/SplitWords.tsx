import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { easeOut } from './variants'

/**
 * Masked word-by-word rise for headings. Renders inline spans only, so it sits inside any heading
 * and keeps the heading's accessible text intact. Visibility is observed on the unclipped wrapper
 * (the words themselves start clipped, so they can never report as in view).
 */
export function SplitWords({
  text,
  delay = 0,
  stagger = 0.06,
  onView = true,
}: {
  text: string
  delay?: number
  stagger?: number
  /** false plays on mount (above-the-fold headings). */
  onView?: boolean
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const show = !onView || inView
  const words = text.split(' ').map((word, position) => ({ word, id: `${word}-${position}` }))
  return (
    <span ref={ref}>
      {words.map(({ word, id }, i) => (
        <span key={id}>
          <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
            <motion.span
              className="inline-block"
              initial={reduce ? false : { y: '110%', rotate: 4 }}
              animate={show ? { y: 0, rotate: 0 } : undefined}
              transition={{ delay: delay + i * stagger, duration: 0.9, ease: easeOut }}
            >
              {word}
            </motion.span>
          </span>
          {/* A real, collapsible space between the clipped boxes keeps words apart. */}
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </span>
  )
}
