import { gsap, ScrollTrigger } from '@/lib/gsap'
import { type ReactNode, useLayoutEffect, useRef } from 'react'


let refreshQueued = false
/** One ScrollTrigger refresh per frame, however many reveals mount in it. */
function queueRefresh() {
  if (refreshQueued) return
  refreshQueued = true
  requestAnimationFrame(() => {
    refreshQueued = false
    ScrollTrigger.refresh()
  })
}

/**
 * Reveals a section's pieces one by one as they scroll in, in reading order. Mark children with
 * `data-reveal` (text: fades and rises) or `data-reveal="card"` (cards: rise, tip forward and
 * settle). Elements entering together stagger; later rows wait for their own entrance. Nothing is
 * hidden under reduced motion.
 *
 * Content that arrives later (query results) goes in its own nested `ScrollReveal`, mounted with
 * the data; each reveal only handles elements whose nearest reveal root is itself.
 */
export function ScrollReveal({
  children,
  className,
  query = '(prefers-reduced-motion: no-preference)',
}: {
  children: ReactNode
  className?: string
  /** Media query the reveal runs under (it always also needs motion allowed). */
  query?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    const own = (el: HTMLElement) => el.parentElement?.closest('[data-reveal-root]') === root
    const media = gsap.matchMedia()
    media.add(query, () => {
      const text = gsap.utils
        .toArray<HTMLElement>('[data-reveal]:not([data-reveal="card"])', root)
        .filter(own)
      const cards = gsap.utils.toArray<HTMLElement>('[data-reveal="card"]', root).filter(own)
      gsap.set(text, { autoAlpha: 0, y: 36 })
      gsap.set(cards, {
        autoAlpha: 0,
        y: 90,
        scale: 0.92,
        rotateX: 14,
        transformPerspective: 1100,
        transformOrigin: '50% 100%',
      })
      const batch = (targets: HTMLElement[], vars: gsap.TweenVars) =>
        ScrollTrigger.batch(targets, {
          start: 'top 88%',
          interval: 0.08,
          once: true,
          // Measure after pinned sections have added their scroll distance. Batch forwards
          // ScrollTrigger options to each trigger; its typings just omit this one.
          ...({ refreshPriority: -1 } as ScrollTrigger.BatchVars),
          onEnter: (els) => gsap.to(els, { ...vars, stagger: 0.12, overwrite: true }),
        })
      batch(text, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'transform',
      })
      batch(cards, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 1.1,
        ease: 'expo.out',
        delay: 0.15,
        clearProps: 'transform',
      })
      queueRefresh()
    })
    return () => media.revert()
  }, [query])

  return (
    <div ref={ref} data-reveal-root className={className}>
      {children}
    </div>
  )
}
