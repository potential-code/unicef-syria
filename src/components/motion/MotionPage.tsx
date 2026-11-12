import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { easeOut } from './variants'

/** Wraps a routed page so it fades and rises in on navigation. */
export function MotionPage({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: easeOut }}
    >
      {children}
    </motion.div>
  )
}
