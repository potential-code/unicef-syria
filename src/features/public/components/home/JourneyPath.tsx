import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/motion'
import { SmartImage } from '@/components/shared/SmartImage'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { gsap } from '@/lib/gsap'
import { JOURNEY_STEPS } from '../../config'

const STEP_TONES = [
  'bg-cyan text-ink',
  'bg-blue text-white',
  'bg-yellow text-ink',
  'bg-orange text-white',
  'bg-navy text-white',
]

/** "How the journey works": a numbered path whose progress line draws as you scroll. */
export function JourneyPath() {
  const { t } = useTranslation('public')
  const reduce = useReducedMotion()
  const list = useRef<HTMLOListElement>(null)
  const line = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (reduce || !list.current) return
    const root = list.current
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top 65%', end: 'bottom 65%', scrub: true },
        },
      )
      const shift = document.documentElement.dir === 'rtl' ? -40 : 40
      for (const item of root.querySelectorAll<HTMLElement>('[data-step]')) {
        gsap.from(item.querySelector('[data-dot]'), {
          scale: 0.4,
          opacity: 0.3,
          duration: 0.5,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: item,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        })
        gsap.from(item.querySelector('[data-body]'), {
          x: shift,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 75%' },
        })
      }
    })
    return () => mm.revert()
  }, [reduce])

  return (
    <section
      aria-labelledby="journey-title"
      className="relative overflow-x-clip bg-white py-20 sm:py-28"
    >
      <span
        className="pointer-events-none absolute -end-40 top-20 size-[30rem] rounded-full bg-sky-100 blur-3xl"
        aria-hidden
      />
      <div className="container-page relative grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="mb-3 text-sm font-bold tracking-wider text-blue uppercase">
              {t('home.journey.eyebrow')}
            </p>
            <h2 id="journey-title" className="text-4xl sm:text-5xl">
              {t('home.journey.title')}
            </h2>
            <p className="mt-4 text-lg text-ink-soft">{t('home.journey.body')}</p>
          </Reveal>
          <Reveal className="relative mt-8 hidden lg:block">
            <div className="overflow-hidden rounded-[2rem] shadow-lg">
              <SmartImage
                src="images/generated/scene-mentor.webp"
                alt={t('home.journey.imageAlt')}
                className="aspect-[4/3] w-full"
              />
            </div>
            <p className="absolute -bottom-5 start-6 max-w-xs rounded-2xl bg-yellow px-4 py-3 text-sm font-bold text-ink shadow-lg">
              {t('home.journey.caption')}
            </p>
          </Reveal>
        </div>
        <ol ref={list} className="relative space-y-10 ps-2">
          <span
            className="absolute start-[2.1rem] top-4 bottom-4 w-1 rounded-full bg-sky-100"
            aria-hidden
          />
          <span
            ref={line}
            className="absolute start-[2.1rem] top-4 bottom-4 w-1 origin-top rounded-full bg-grad-unicef"
            aria-hidden
          />
          {JOURNEY_STEPS.map((s, i) => (
            <li key={s.id} data-step className="relative flex gap-5">
              <span
                data-dot
                className={`relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl text-xl font-extrabold shadow-md ${STEP_TONES[i]}`}
              >
                {i + 1}
              </span>
              <div data-body className="flex-1 rounded-2xl border bg-white p-5 shadow-sm">
                <div className="mb-1 flex items-center gap-2">
                  <s.icon className="size-5 text-blue" aria-hidden />
                  <h3 className="text-xl">{t(`home.journey.steps.${s.id}.title`)}</h3>
                </div>
                <p className="text-ink-soft">{t(`home.journey.steps.${s.id}.body`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
