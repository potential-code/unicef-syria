import Lenis from 'lenis'
import { type ReactNode, useEffect } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { gsap, ScrollTrigger } from '@/lib/gsap'

let active: Lenis | null = null

/** The running Lenis instance, if smooth scrolling is on (public pages, motion allowed). */
export function getLenis() {
  return active
}

/**
 * Smooth scrolling for the public site only (portals keep native scroll so dashboards stay fast).
 * Lenis drives GSAP's ticker so ScrollTrigger stays in sync. Disabled under reduced motion.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    active = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      if (active === lenis) active = null
    }
  }, [reduce])

  return <>{children}</>
}
