import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { GlobeGrid, LaurelWreath } from '@/components/brand'
import { SmartImage } from '@/components/shared/SmartImage'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { JOURNEY_STEPS } from '../../config'
import { SectionIntro } from '../SectionIntro'

/** Brand tone per step: accent bar, dot, icon colour and corner motif. */
const FIRST_TONE = { bar: 'bg-cyan', dot: 'bg-cyan', icon: 'text-blue', motif: 'text-cyan/25' }
const TONES = [
  FIRST_TONE,
  { bar: 'bg-blue', dot: 'bg-blue', icon: 'text-blue', motif: 'text-blue/15' },
  { bar: 'bg-yellow', dot: 'bg-yellow', icon: 'text-orange', motif: 'text-yellow/35' },
  { bar: 'bg-orange', dot: 'bg-orange', icon: 'text-orange', motif: 'text-orange/20' },
  { bar: 'bg-navy', dot: 'bg-navy', icon: 'text-navy', motif: 'text-navy/15' },
]
const MOTIFS = [LaurelWreath, GlobeGrid, LaurelWreath, GlobeGrid, LaurelWreath]

/**
 * "How the journey works": a zig-zag timeline. A progress line draws down the centre as you
 * scroll; each step card slides in from its own side as the line reaches it. On phones the line
 * runs down the start edge and every card sits beside it.
 */
export function JourneyPath() {
  const { t } = useTranslation('public')
  const reduce = useReducedMotion()
  const list = useRef<HTMLOListElement>(null)
  const line = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = list.current
    if (reduce || !root) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top 70%', end: 'bottom 70%', scrub: 0.4 },
        },
      )
      const rtl = document.documentElement.dir === 'rtl'
      const wide = window.matchMedia('(min-width: 1024px)').matches
      gsap.utils.toArray<HTMLElement>('[data-step]', root).forEach((item, i) => {
        const fromStart = !wide || i % 2 === 0
        const dx = (fromStart ? -1 : 1) * (rtl ? -1 : 1) * 70
        const trigger = { trigger: item, start: 'top 72%', once: true }
        gsap.from(item.querySelector('[data-dot]'), {
          scale: 0,
          duration: 0.5,
          ease: 'back.out(2.4)',
          scrollTrigger: trigger,
        })
        gsap.from(item.querySelector('[data-body]'), {
          x: dx,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: trigger,
        })
        const pic = item.querySelector('[data-pic]')
        if (pic) {
          gsap.fromTo(
            pic,
            { clipPath: 'inset(0% 0% 100% 0% round 1.5rem)', scale: 1.06 },
            {
              clipPath: 'inset(0% 0% 0% 0% round 1.5rem)',
              scale: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: trigger,
            },
          )
        }
        gsap.from(item.querySelector('[data-num]'), {
          yPercent: 40,
          autoAlpha: 0,
          duration: 1,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: trigger,
        })
      })
    }, root)
    return () => ctx.revert()
  }, [reduce])

  return (
    <section
      aria-labelledby="journey-title"
      className="relative overflow-hidden bg-white py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0 text-blue/[0.06]" aria-hidden>
        <LaurelWreath className="absolute end-6 top-16 h-56" />
        <LaurelWreath className="absolute start-6 bottom-8 h-44" />
      </div>
      <div className="container-page relative">
        <SectionIntro
          id="journey-title"
          eyebrow={t('home.journey.eyebrow')}
          title={t('home.journey.title')}
          body={t('home.journey.body')}
          className="mx-auto mb-14 text-center [&>p:first-child]:justify-center"
        />
        <ol ref={list} className="relative mx-auto max-w-5xl space-y-8 lg:space-y-10">
          <span
            className="absolute start-[0.6875rem] top-2 bottom-2 w-0.5 rounded-full bg-sky-100 lg:start-1/2 lg:-translate-x-1/2 rtl:lg:translate-x-1/2"
            aria-hidden
          />
          <span
            ref={line}
            className="absolute start-[0.6875rem] top-2 bottom-2 w-0.5 origin-top rounded-full bg-grad-unicef-v lg:start-1/2 lg:-translate-x-1/2 rtl:lg:translate-x-1/2"
            aria-hidden
          />
          {JOURNEY_STEPS.map((s, i) => {
            const tone = TONES[i % TONES.length] ?? FIRST_TONE
            const Motif = MOTIFS[i % MOTIFS.length] ?? GlobeGrid
            const end = i % 2 === 1
            return (
              <li
                key={s.id}
                data-step
                className="relative grid grid-cols-[1.5rem_minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)] lg:gap-8"
              >
                <span
                  data-dot
                  className={cn(
                    'relative z-10 mt-7 size-6 rounded-full border-4 border-white shadow-md lg:col-start-2 lg:row-start-1 lg:mx-auto lg:mt-0 lg:self-center',
                    tone.dot,
                  )}
                  aria-hidden
                />
                <div
                  data-body
                  className={cn(
                    'card relative isolate min-w-0 self-center overflow-hidden p-6 lg:row-start-1',
                    end ? 'lg:col-start-3' : 'lg:col-start-1',
                  )}
                >
                  <span className={cn('absolute inset-x-0 top-0 h-1.5', tone.bar)} aria-hidden />
                  <SmartImage
                    src={s.image}
                    alt=""
                    className="-mx-6 -mt-6 mb-5 block aspect-[16/9] w-[calc(100%+3rem)] max-w-none lg:hidden"
                  />
                  <span
                    data-num
                    className="pointer-events-none absolute end-4 -top-3 -z-10 text-[5.5rem] leading-none font-extrabold text-blue/[0.07] select-none"
                    aria-hidden
                  >
                    0{i + 1}
                  </span>
                  <Motif
                    className={cn(
                      'pointer-events-none absolute end-4 bottom-4 -z-10 h-20 w-auto',
                      tone.motif,
                    )}
                  />
                  <p className="mb-2 flex items-center gap-2 text-xs font-bold tracking-widest text-ink-soft uppercase">
                    <s.icon className={cn('size-4', tone.icon)} aria-hidden />
                    {t('home.journey.step', { n: i + 1 })}
                  </p>
                  <h3 className="text-lg sm:text-xl">{t(`home.journey.steps.${s.id}.title`)}</h3>
                  <p className="mt-1.5 max-w-sm text-ink-soft">
                    {t(`home.journey.steps.${s.id}.body`)}
                  </p>
                </div>
                <div
                  data-pic
                  className={cn(
                    'relative hidden aspect-[16/9] overflow-hidden rounded-3xl shadow-lg lg:row-start-1 lg:block',
                    end ? 'lg:col-start-1' : 'lg:col-start-3',
                  )}
                >
                  <SmartImage src={s.image} alt="" className="size-full" />
                  <div className={cn('absolute inset-x-0 bottom-0 h-1.5', tone.bar)} aria-hidden />
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
