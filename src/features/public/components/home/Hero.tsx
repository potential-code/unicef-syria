import { Link } from '@tanstack/react-router'
import { ArrowRight, Briefcase, ChevronDown, Lightbulb, PlayCircle, Rocket } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Magnetic, SplitWords } from '@/components/motion'
import { DemoTag } from '@/components/shared/DemoTag'
import { SmartImage } from '@/components/shared/SmartImage'
import { Button } from '@/components/ui/button'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { gsap } from '@/lib/gsap'
import { FloatingBlobs } from './FloatingBlobs'

/** Full-viewport hero (brief §2 P01): exact headline, copy and the two CTAs. */
export function Hero() {
  const { t } = useTranslation('public')
  const reduce = useReducedMotion()
  const root = useRef<HTMLElement>(null)
  const copy = useRef<HTMLDivElement>(null)
  const art = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduce || !root.current) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const trigger = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to(copy.current, { yPercent: 18, opacity: 0.2, ease: 'none', scrollTrigger: trigger })
      gsap.to(art.current, { yPercent: -10, scale: 1.04, ease: 'none', scrollTrigger: trigger })
    })
    return () => mm.revert()
  }, [reduce])

  const sentences = [t('home.hero.line1'), t('home.hero.line2'), t('home.hero.line3')]
  const chips = [
    {
      icon: Briefcase,
      label: t('common:routesShort.employment'),
      cls: 'start-0 top-[12%] bg-white text-navy',
      delay: 0.9,
    },
    {
      icon: Lightbulb,
      label: t('common:routesShort.enterprise'),
      cls: 'end-0 top-[44%] bg-yellow text-ink',
      delay: 1.05,
    },
    {
      icon: Rocket,
      label: t('common:routesShort.freelance'),
      cls: 'start-[8%] bottom-[6%] bg-orange text-white',
      delay: 1.2,
    },
  ]

  return (
    <section
      ref={root}
      className="on-dark relative isolate flex min-h-dvh items-center overflow-hidden bg-grad-unicef pt-24 pb-16 text-white"
    >
      <FloatingBlobs />
      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div ref={copy}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex flex-wrap items-center gap-2"
          >
            <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold backdrop-blur">
              {t('common:appFullName')}
            </span>
            <DemoTag onDark />
          </motion.div>
          <h1 className="text-[2.6rem] leading-[1.05] font-extrabold text-white sm:text-6xl xl:text-[4.25rem]">
            {sentences.map((s, i) => (
              <span key={s} className={i === 1 ? 'block text-yellow' : 'block'}>
                <SplitWords text={s} onView={false} delay={0.15 + i * 0.25} />
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="mt-6 max-w-xl text-lg text-white/90 sm:text-xl"
          >
            {t('home.hero.body')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Button
                asChild
                size="lg"
                className="rounded-full bg-yellow text-ink shadow-pop hover:bg-white"
              >
                <Link to="/register">
                  {t('home.hero.primary')}
                  <ArrowRight className="size-5 rtl-mirror" aria-hidden />
                </Link>
              </Button>
            </Magnetic>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="rounded-full border-2 border-white/60 text-white hover:bg-white/15 hover:text-white"
            >
              <Link to="/explore">
                <PlayCircle className="size-5" aria-hidden />
                {t('home.hero.secondary')}
              </Link>
            </Button>
          </motion.div>
        </div>

        <div ref={art} className="relative mx-auto aspect-square w-full max-w-[34rem]">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-[6%] overflow-hidden rounded-[42%_58%_55%_45%/48%_42%_58%_52%] border-[6px] border-white/25 shadow-pop"
          >
            <SmartImage
              src="images/generated/hero-main.webp"
              alt={t('home.hero.imageAlt')}
              className="size-full"
              loading="eager"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute -end-2 -bottom-2 size-[34%] overflow-hidden rounded-full border-[5px] border-yellow shadow-pop"
          >
            <SmartImage
              src="images/generated/scene-learning.webp"
              alt=""
              className="size-full"
              loading="eager"
            />
          </motion.div>
          <span
            className="absolute -start-4 top-[30%] size-20 rounded-full border-[10px] border-cyan/70"
            aria-hidden
          />
          <span className="absolute end-[18%] -top-2 size-10 rounded-full bg-yellow" aria-hidden />
          {chips.map((c) => (
            <motion.span
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: c.delay, type: 'spring', stiffness: 200, damping: 16 }}
              className={`absolute inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold shadow-lg ${c.cls}`}
            >
              <c.icon className="size-4" aria-hidden />
              {c.label}
            </motion.span>
          ))}
        </div>
      </div>
      <a
        href="#routes"
        className="absolute bottom-6 start-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-sm text-white/80 hover:text-white md:flex rtl:translate-x-1/2"
      >
        {t('home.hero.scroll')}
        <ChevronDown className="size-5 animate-bounce" aria-hidden />
      </a>
    </section>
  )
}
