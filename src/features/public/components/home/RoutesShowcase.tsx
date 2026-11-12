import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { usePrefs } from '@/store/actions/session'
import { ROUTE_CARDS } from '../../config'
import { RouteCard } from './RouteCard'

/**
 * Three career routes. Wide screens with motion: the section pins and the cards travel
 * horizontally with the scroll. Narrow screens and reduced motion: a plain stack.
 */
export function RoutesShowcase() {
  const { t } = useTranslation('public')
  const reduce = useReducedMotion()
  const { lang } = usePrefs()
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduce || !section.current || !track.current) return
    const el = track.current
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const rtl = lang === 'ar'
      const distance = () => Math.max(0, el.scrollWidth - window.innerWidth + 64)
      gsap.to(el, {
        x: () => (rtl ? distance() : -distance()),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
      gsap.from(el.querySelectorAll('[data-route-card]'), {
        opacity: 0,
        y: 60,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: section.current, start: 'top 70%' },
      })
    })
    return () => mm.revert()
  }, [reduce, lang])

  return (
    <section
      id="routes"
      ref={section}
      aria-labelledby="routes-title"
      className="relative overflow-hidden bg-sky-50 py-20 lg:flex lg:min-h-dvh lg:items-center lg:py-0"
    >
      <div
        ref={track}
        className={cn(
          'flex flex-col gap-6 px-4 sm:px-6 lg:px-8',
          !reduce && 'lg:w-max lg:flex-row lg:items-stretch lg:gap-8',
        )}
      >
        <div
          className={cn(
            'flex flex-col justify-center',
            reduce ? 'max-w-3xl' : 'lg:w-[30rem] lg:shrink-0',
          )}
        >
          <p className="mb-3 text-sm font-bold tracking-wider text-blue uppercase">
            {t('home.routes.eyebrow')}
          </p>
          <h2 id="routes-title" className="text-4xl sm:text-5xl">
            {t('home.routes.title')}{' '}
            <span className="text-grad-unicef">{t('home.routes.titleAccent')}</span>
          </h2>
          <p className="mt-4 text-lg text-ink-soft">{t('home.routes.body')}</p>
          <p className="mt-6 hidden text-sm font-semibold text-ink-soft lg:block">
            {reduce ? null : t('home.routes.hint')}
          </p>
        </div>
        <div className={cn('grid gap-6', reduce ? 'lg:grid-cols-3' : 'lg:flex lg:gap-8')}>
          {ROUTE_CARDS.map((r, i) => (
            <RouteCard key={r.id} route={r} index={i} wide={!reduce} />
          ))}
        </div>
      </div>
    </section>
  )
}
