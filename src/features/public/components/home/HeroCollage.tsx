import { Briefcase, Lightbulb, Rocket } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { GlobeGrid, LaurelWreath } from '@/components/brand'
import { easeOut } from '@/components/motion/variants'
import { SmartImage } from '@/components/shared/SmartImage'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { gsap } from '@/lib/gsap'

/**
 * Hero visual: one large community photo beside a column of three route photos, aligned on a
 * clean grid with equal gaps and matching radii (no frames or tilted cards). Each route photo
 * carries its route label. A single globe sits behind. Tiles unmask in sequence on load and the
 * two columns drift apart slightly on scroll.
 */
export function HeroCollage() {
  const { t } = useTranslation('public')
  const reduce = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (reduce || !el) return
    const ctx = gsap.context(() => {
      const scrollTrigger = { trigger: el, start: 'top top+=120', end: 'bottom top', scrub: true }
      gsap.to('[data-col="main"]', { yPercent: -4, ease: 'none', scrollTrigger })
      gsap.to('[data-col="side"]', { yPercent: -12, ease: 'none', scrollTrigger })
      gsap.to('[data-globe]', { rotate: 20, ease: 'none', scrollTrigger })
      gsap.to('[data-wreath]', { yPercent: 8, scale: 1.04, ease: 'none', scrollTrigger })
    }, el)
    return () => ctx.revert()
  }, [reduce])

  const reveal = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { clipPath: 'inset(100% 0% 0% 0% round 1.5rem)', scale: 1.08 },
          animate: { clipPath: 'inset(0% 0% 0% 0% round 1.5rem)', scale: 1 },
          transition: { delay, duration: 1.1, ease: easeOut },
        }

  const routes = [
    {
      icon: Briefcase,
      label: t('common:routesShort.employment'),
      img: 'images/generated/route-employment.webp',
      chip: 'bg-white text-navy',
    },
    {
      icon: Lightbulb,
      label: t('common:routesShort.enterprise'),
      img: 'images/generated/route-enterprise.webp',
      chip: 'bg-yellow text-ink',
    },
    {
      icon: Rocket,
      label: t('common:routesShort.freelance'),
      img: 'images/generated/route-freelance.webp',
      chip: 'bg-orange text-white',
    },
  ]

  return (
    <div ref={root} className="relative mx-auto w-full max-w-[34rem] lg:me-0">
      <div
        data-globe
        className="pointer-events-none absolute -inset-[12%] text-white/[0.12]"
        aria-hidden
      >
        <GlobeGrid className="size-full" strokeWidth={0.6} />
      </div>
      {/* The emblem wreath cradles the photo grid, as it cradles the globe in the logo. */}
      <motion.div
        data-wreath
        className="pointer-events-none absolute inset-x-[-16%] -bottom-[12%] text-white/[0.22]"
        initial={reduce ? false : { opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.3, ease: easeOut }}
        aria-hidden
      >
        <LaurelWreath className="w-full" />
      </motion.div>
      <div className="relative grid aspect-[5/6] grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-3 sm:gap-4">
        <div data-col="main" className="min-h-0">
          <motion.div
            {...reveal(0.15)}
            className="relative size-full overflow-hidden rounded-3xl shadow-pop"
          >
            <SmartImage
              src="images/generated/hero-main.webp"
              alt={t('home.hero.imageAlt')}
              className="size-full"
              loading="eager"
            />
            <div
              className="absolute inset-0 bg-linear-to-t from-navy/50 via-transparent to-transparent"
              aria-hidden
            />
          </motion.div>
        </div>
        <div data-col="side" className="grid min-h-0 grid-rows-3 gap-3 sm:gap-4">
          {routes.map((r, i) => (
            <motion.div
              key={r.label}
              {...reveal(0.35 + i * 0.15)}
              className="relative min-h-0 overflow-hidden rounded-3xl shadow-lg"
            >
              <SmartImage src={r.img} alt="" className="size-full" loading="eager" />
              <div
                className="absolute inset-0 bg-linear-to-t from-navy/55 via-navy/0 to-transparent"
                aria-hidden
              />
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.12, duration: 0.5, ease: easeOut }}
                className={`absolute start-2.5 bottom-2.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold shadow-md sm:start-3 sm:bottom-3 sm:text-xs ${r.chip}`}
              >
                <r.icon className="size-3.5" aria-hidden />
                {r.label}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
