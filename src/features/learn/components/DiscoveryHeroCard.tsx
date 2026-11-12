import { Link } from '@tanstack/react-router'
import { ArrowRight, Clock, Compass, ListChecks, ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Blobs } from './Blobs'

/** Before the assessment the discovery card dominates the dashboard (brief §2 Y02). */
export function DiscoveryHeroCard() {
  const { t } = useTranslation('learn')
  const facts = [
    { icon: Clock, label: t('discovery.factTime') },
    { icon: ListChecks, label: t('discovery.factQuestions') },
    { icon: ShieldCheck, label: t('discovery.factNoPass') },
  ]
  return (
    <section className="on-dark relative overflow-hidden rounded-3xl bg-grad-unicef p-6 text-white shadow-lg sm:p-10">
      <Blobs />
      <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">
            <Compass className="size-4" aria-hidden />
            {t('dash.discoveryEyebrow')}
          </p>
          <h2 className="mt-4 text-3xl text-white sm:text-5xl">{t('dash.discoveryTitle')}</h2>
          <p className="mt-3 max-w-xl text-lg text-white/90">{t('dash.discoveryBody')}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {facts.map((f) => (
              <li
                key={f.label}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-sm"
              >
                <f.icon className="size-4" aria-hidden />
                {f.label}
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-7 rounded-full bg-yellow text-ink hover:bg-white">
            <Link to="/youth/discovery">
              {t('dash.discoveryCta')}
              <ArrowRight className="size-5 rtl-mirror" aria-hidden />
            </Link>
          </Button>
        </div>
        <div className="relative mx-auto hidden aspect-square w-full max-w-72 md:block" aria-hidden>
          {(['bg-cyan', 'bg-yellow', 'bg-orange', 'bg-white'] as const).map((tone, i) => (
            <motion.span
              key={tone}
              className={`absolute size-24 rounded-3xl ${tone} shadow-lg`}
              style={{ top: `${[8, 8, 52, 52][i]}%`, insetInlineStart: `${[8, 52, 8, 52][i]}%` }}
              animate={{ y: [0, i % 2 ? -8 : 8, 0], rotate: [0, i % 2 ? 4 : -4, 0] }}
              transition={{ duration: 4 + i, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            />
          ))}
          <span className="absolute inset-[30%] flex items-center justify-center rounded-full bg-navy text-white shadow-pop">
            <Compass className="size-12" />
          </span>
        </div>
      </div>
    </section>
  )
}
