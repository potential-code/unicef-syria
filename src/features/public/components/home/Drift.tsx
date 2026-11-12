import { type ReactNode, useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'

/** Slow scroll-linked drift and turn for decorative brand motifs (homepage only). */
export function Drift({
  children,
  className,
  y = 14,
  rotate = 12,
}: {
  children: ReactNode
  className?: string
  y?: number
  rotate?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  useEffect(() => {
    const el = ref.current
    if (reduce || !el) return
    const tween = gsap.fromTo(
      el,
      { yPercent: -y, rotate: -rotate / 2 },
      {
        yPercent: y,
        rotate: rotate / 2,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reduce, y, rotate])
  return (
    <div
      ref={ref}
      className={cn('pointer-events-none will-change-transform', className)}
      aria-hidden
    >
      {children}
    </div>
  )
}
