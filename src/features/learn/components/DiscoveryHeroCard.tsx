import { Link } from '@tanstack/react-router'
import { ArrowRight, Clock, Compass, ListChecks, ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { GlobeGrid, LaurelWreath, Motif } from '@/components/brand'
import { Button } from '@/components/ui/button'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

/** Before the assessment the discovery card dominates the dashboard (brief §2 Y02). */
export function DiscoveryHeroCard() {
  const { t } = useTranslation('learn')
  const reduce = useReducedMotion()
  const facts = [
    { icon: Clock, label: t('discovery.factTime') },
    { icon: ListChecks, label: t('discovery.factQuestions') },
    { icon: ShieldCheck, label: t('discovery.factNoPass') },
  ]
  return (
    <section className="on-dark relative overflow-hidden rounded-3xl bg-grad-unicef p-6 text-white shadow-lg sm:p-10">
      <Motif variant="banner" className="text-white/[0.1]" />
      <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-xs font-bold tracking-wider text-white/85 uppercase">
            <Compass className="size-4 text-yellow" aria-hidden />
            {t('dash.discoveryEyebrow')}
          </p>
          <h2 className="mt-3 text-3xl text-white sm:text-5xl">{t('dash.discoveryTitle')}</h2>
          <p className="mt-3 max-w-xl text-lg text-white/90">{t('dash.discoveryBody')}</p>
          <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold">
            {facts.map((f) => (
              <li key={f.label} className="inline-flex items-center gap-1.5">
                <f.icon className="size-4 text-yellow" aria-hidden />
                {f.label}
              </li>
            ))}
          </ul>
          <Button
            asChild
            size="lg"
            className="mt-7 rounded-full bg-yellow text-ink shadow-md hover:bg-white"
          >
            <Link to="/youth/discovery">
              {t('dash.discoveryCta')}
              <ArrowRight className="size-4 rtl-mirror" aria-hidden />
            </Link>
          </Button>
        </div>
        <div
          className="relative mx-auto hidden aspect-square w-full max-w-64 items-center justify-center md:flex"
          aria-hidden
        >
          <motion.span
            className="absolute inset-0 text-white/30"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
          >
            <GlobeGrid className="size-full" strokeWidth={1.2} />
          </motion.span>
          <LaurelWreath className="absolute inset-[8%] size-[84%] text-yellow/90" />
          <Compass className="relative -mt-4 size-16 text-white" strokeWidth={1.6} />
        </div>
      </div>
    </section>
  )
}
