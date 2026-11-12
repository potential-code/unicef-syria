import { Link } from '@tanstack/react-router'
import { ArrowRight, ChevronDown, PlayCircle } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Magnetic, SplitWords } from '@/components/motion'
import { DemoTag } from '@/components/shared/DemoTag'
import { Button } from '@/components/ui/button'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { gsap } from '@/lib/gsap'
import { scrollToId } from '../../scroll-to'
import { HeroBackdrop } from './HeroBackdrop'
import { HeroCollage } from './HeroCollage'

/** Hero (brief §2 P01): exact headline, copy and the two CTAs, with a layered photo collage. */
export function Hero() {
  const { t } = useTranslation('public')
  const reduce = useReducedMotion()
  const root = useRef<HTMLElement>(null)
  const copy = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduce || !root.current) return
    const ctx = gsap.context(() => {
      const trigger = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to(copy.current, { yPercent: 12, opacity: 0.3, ease: 'none', scrollTrigger: trigger })
    }, root)
    return () => ctx.revert()
  }, [reduce])

  const sentences = [t('home.hero.line1'), t('home.hero.line2'), t('home.hero.line3')]

  return (
    <section
      ref={root}
      className="on-dark relative isolate flex min-h-[min(100dvh,56rem)] items-center overflow-hidden bg-grad-unicef pt-28 pb-28 sm:pb-32 text-white lg:pt-32"
    >
      <HeroBackdrop />

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
        <div ref={copy} className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex flex-wrap items-center gap-2"
          >
            <span className="text-xs font-bold tracking-widest text-white uppercase">
              {t('common:appFullName')}
            </span>
            <span className="h-3 w-px bg-white/30" aria-hidden />
            <DemoTag onDark />
          </motion.div>
          <h1 className="text-[clamp(2.25rem,4.2vw,3.75rem)] leading-[1.08] font-extrabold text-white">
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
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/90"
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
                className="h-11 rounded-full bg-yellow px-5 text-ink shadow-lg hover:bg-white"
              >
                <Link to="/register">
                  {t('home.hero.primary')}
                  <ArrowRight className="size-4 rtl-mirror" aria-hidden />
                </Link>
              </Button>
            </Magnetic>
            <Button
              asChild
              variant="ghost"
              className="h-11 rounded-full border border-white/50 px-5 text-white hover:bg-white/15 hover:text-white"
            >
              <Link to="/explore">
                <PlayCircle className="size-4" aria-hidden />
                {t('home.hero.secondary')}
              </Link>
            </Button>
          </motion.div>
        </div>

        <HeroCollage />
      </div>
      <button
        type="button"
        onClick={() => scrollToId('routes', -64)}
        className="absolute bottom-14 start-1/2 sm:bottom-20 hidden -translate-x-1/2 flex-col items-center gap-0.5 text-xs font-semibold text-white/80 hover:text-white lg:flex rtl:translate-x-1/2"
      >
        {t('home.hero.scroll')}
        <ChevronDown className="size-4 animate-bounce" aria-hidden />
      </button>
    </section>
  )
}
