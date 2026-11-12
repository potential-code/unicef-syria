import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { fadeUp, staggerContainer } from './variants'

interface RevealProps {
  children: ReactNode
  className?: string
  variants?: Variants
  delay?: number
  as?: 'div' | 'section' | 'li' | 'article'
}

/** Reveals content once as it scrolls into view. Static under reduced motion. */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  as = 'div',
}: RevealProps) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      variants={variants}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay }}
    >
      {children}
    </Tag>
  )
}

/** Parent that staggers its `StaggerItem` children into view. */
export function Stagger({
  children,
  className,
  stagger = 0.07,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  variants = fadeUp,
}: {
  children: ReactNode
  className?: string
  variants?: Variants
}) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  )
}
