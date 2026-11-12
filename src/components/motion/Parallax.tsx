import { gsap } from '@/lib/gsap'
import { type ReactNode, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'


/**
 * Drifts its content vertically while it crosses the viewport (GSAP scrub). `speed` is the
 * travel in percent of the element's height each way; negative moves against the scroll.
 */
export function Parallax({
  children,
  speed = 10,
  className,
}: {
  children: ReactNode
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        el,
        { yPercent: -speed },
        {
          yPercent: speed,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    })
    return () => media.revert()
  }, [speed])

  return (
    <div ref={ref} className={cn('will-change-transform', className)}>
      {children}
    </div>
  )
}
