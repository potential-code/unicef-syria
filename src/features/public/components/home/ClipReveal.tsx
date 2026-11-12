import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { easeOut } from '@/components/motion/variants'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

/** Image/band entrance: unmasks upwards from a clipped band while settling from a slight zoom. */
export function ClipReveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'article'
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={reduce ? false : { clipPath: 'inset(22% 0% 0% 0% round 24px)', opacity: 0, y: 40 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 24px)', opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: easeOut }}
    >
      {children}
    </Tag>
  )
}
