import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GlobeGrid } from '@/components/brand'
import { ScrollReveal } from '@/components/motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { ROUTE_CARDS } from '../../config'
import { SectionIntro } from '../SectionIntro'
import { Drift } from './Drift'
import { RouteCard } from './RouteCard'

/**
 * Three career routes, driven by scroll. From 1024px the section holds in place while you scroll
 * through it; each third of that scroll selects the next route and its card swaps in place
 * (photo wipes across, copy rises line by line). The route tabs show progress and jump to their
 * route. Below 1024px, or with reduced motion, the cards simply stack.
 */
export function RoutesShowcase() {
  const { t } = useTranslation('public')
  const reduce = useReducedMotion()
  const section = useRef<HTMLElement>(null)
  const trigger = useRef<ScrollTrigger | null>(null)
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = section.current
    if (reduce || !el) return
    const n = ROUTE_CARDS.length
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      trigger.current = ScrollTrigger.create({
        trigger: el,
        start: 'top top+=64',
        end: () => `+=${window.innerHeight * 1.5}`,
        pin: true,
        onUpdate: (self) => {
          const pos = Math.min(n - 0.0001, self.progress * n)
          setActive(Math.floor(pos))
          setProgress(pos - Math.floor(pos))
        },
      })
      return () => {
        trigger.current = null
      }
    })
    return () => mm.revert()
  }, [reduce])

  const select = (i: number) => {
    const st = trigger.current
    if (!st) return setActive(i)
    const n = ROUTE_CARDS.length
    window.scrollTo({ top: st.start + ((st.end - st.start) * (i + 0.05)) / n, behavior: 'smooth' })
  }
  const route = ROUTE_CARDS[active] ?? ROUTE_CARDS[0]

  return (
    <section
      ref={section}
      id="routes"
      aria-labelledby="routes-title"
      className="relative scroll-mt-16 overflow-clip bg-sky-50 py-16 sm:py-24 lg:flex lg:min-h-[calc(100dvh-4rem)] lg:items-center lg:py-12"
    >
      <Drift y={14} rotate={24} className="absolute -start-32 -top-10 text-blue/[0.06]">
        <GlobeGrid className="size-[30rem]" strokeWidth={0.9} />
      </Drift>
      <div className="container-page relative grid w-full gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:items-center lg:gap-14">
        <div>
          <SectionIntro
            id="routes-title"
            eyebrow={t('home.routes.eyebrow')}
            title={
              <>
                {t('home.routes.title')}{' '}
                <span className="text-blue">{t('home.routes.titleAccent')}</span>
              </>
            }
            body={t('home.routes.body')}
          />
          <div
            role="tablist"
            aria-label={t('home.routes.eyebrow')}
            className="mt-8 hidden gap-2 lg:grid"
          >
            {ROUTE_CARDS.map((r, i) => {
              const on = i === active
              return (
                <button
                  key={r.id}
                  type="button"
                  role="tab"
                  id={`route-tab-${r.id}`}
                  aria-selected={on}
                  aria-controls="route-panel"
                  onClick={() => select(i)}
                  className={cn(
                    'relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border px-4 py-3.5 text-start text-sm font-semibold transition-all duration-300',
                    on
                      ? 'border-blue bg-blue text-white shadow-lg'
                      : 'border-border/70 bg-white text-ink shadow-sm hover:border-blue/40 hover:shadow-md',
                  )}
                >
                  <span className={cn('text-xs font-extrabold', on ? 'text-yellow' : 'text-blue')}>
                    0{i + 1}
                  </span>
                  <r.icon className={cn('size-4', on ? 'text-white' : 'text-blue')} aria-hidden />
                  <span className="min-w-0 flex-1">{t(`common:routes.${r.id}`)}</span>
                  {on && (
                    <span
                      className="absolute inset-x-0 bottom-0 h-1 origin-left bg-yellow rtl:origin-right"
                      style={{ transform: `scaleX(${Math.max(0.04, progress)})` }}
                      aria-hidden
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Desktop: one stage, the selected card swaps in place. */}
        <div
          id="route-panel"
          role="tabpanel"
          aria-labelledby={`route-tab-${route?.id}`}
          className="relative hidden lg:block"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={route?.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.25 } }}
              transition={{ duration: 0.3 }}
            >
              {route && <RouteCard route={route} index={active} animate={!reduce} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Phones and tablets: all three cards, revealed as they scroll in. */}
        <ScrollReveal className="flex min-w-0 flex-col gap-6 lg:hidden">
          {ROUTE_CARDS.map((r, i) => (
            <div key={r.id} data-reveal="card">
              <RouteCard route={r} index={i} />
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
