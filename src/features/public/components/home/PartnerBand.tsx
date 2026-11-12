import { Link } from '@tanstack/react-router'
import { ArrowRight, Building2, Handshake } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/motion'

/** Split band: links for employers and for programme partners (brief §2 P01). */
export function PartnerBand() {
  const { t } = useTranslation('public')
  const blocks = [
    { id: 'employers', icon: Building2, cls: 'bg-yellow text-ink' },
    { id: 'partners', icon: Handshake, cls: 'on-dark bg-blue text-white' },
  ] as const
  return (
    <section aria-label={t('home.partnerBand.label')} className="grid md:grid-cols-2">
      {blocks.map((b, i) => (
        <Reveal
          key={b.id}
          delay={i * 0.1}
          className={`relative overflow-hidden px-6 py-16 sm:px-12 lg:py-24 ${b.cls}`}
        >
          <span
            className="pointer-events-none absolute -end-16 -bottom-16 size-64 rounded-full border-[24px] border-current opacity-10"
            aria-hidden
          />
          <b.icon className="mb-5 size-10" aria-hidden />
          <h2 className="max-w-md text-3xl text-current sm:text-4xl">
            {t(`home.partnerBand.${b.id}.title`)}
          </h2>
          <p className="mt-3 max-w-md opacity-90">{t(`home.partnerBand.${b.id}.body`)}</p>
          <Link
            to="/partners"
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 font-bold text-navy shadow-md transition-transform hover:-translate-y-0.5"
          >
            {t(`home.partnerBand.${b.id}.cta`)}
            <ArrowRight className="size-4 rtl-mirror" aria-hidden />
          </Link>
        </Reveal>
      ))}
    </section>
  )
}
