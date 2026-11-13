import { Link } from '@tanstack/react-router'
import { ArrowRight, Building2, Handshake } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LaurelWreath } from '@/components/brand'
import { SmartImage } from '@/components/shared/SmartImage'
import { cn } from '@/lib/utils'
import { ClipReveal } from './ClipReveal'
import { LaurelDivider } from './LaurelDivider'

const BLOCKS = [
  {
    id: 'employers',
    icon: Building2,
    image: 'images/generated/band-employer.webp',
    accent: 'bg-yellow',
    eyebrow: 'text-yellow',
    cta: 'bg-yellow text-ink hover:bg-white',
  },
  {
    id: 'partners',
    icon: Handshake,
    image: 'images/generated/band-partner.webp',
    accent: 'bg-cyan',
    eyebrow: 'text-white',
    cta: 'bg-white text-navy hover:bg-yellow hover:text-ink',
  },
] as const

/** Two image-led cards: links for employers and for programme partners (brief §2 P01). */
export function PartnerBand() {
  const { t } = useTranslation('public')
  return (
    <section aria-label={t('home.partnerBand.label')} className="bg-white pt-14 pb-20 sm:pb-24">
      <LaurelDivider className="container-page mb-14" />
      <div className="container-page grid gap-6 md:grid-cols-2">
        {BLOCKS.map((b, i) => (
          <ClipReveal
            key={b.id}
            as="article"
            delay={i * 0.12}
            className="on-dark group relative isolate flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl bg-navy text-white shadow-lg sm:min-h-[26rem]"
          >
            <SmartImage
              src={b.image}
              alt=""
              className="absolute inset-0 -z-20 size-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 -z-10 bg-linear-to-t from-navy from-25% via-navy/75 via-55% to-navy/0" />
            <LaurelWreath className="absolute end-5 top-5 h-20 text-white/[0.2]" />
            <span className={cn('absolute inset-x-0 top-0 h-1.5', b.accent)} aria-hidden />
            <div className="relative p-6 sm:p-8">
              <p
                className={cn(
                  'mb-2 flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase',
                  b.eyebrow,
                )}
              >
                <b.icon className="size-4" aria-hidden />
                {t(`home.partnerBand.${b.id}.eyebrow`)}
              </p>
              <h2 className="text-2xl text-white sm:text-3xl">
                {t(`home.partnerBand.${b.id}.title`)}
              </h2>
              <p className="mt-2 max-w-md text-white/85">{t(`home.partnerBand.${b.id}.body`)}</p>
              <Link
                to="/partners"
                className={cn(
                  'mt-5 inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-bold shadow-md transition-colors',
                  b.cta,
                )}
              >
                {t(`home.partnerBand.${b.id}.cta`)}
                <ArrowRight className="size-4 rtl-mirror" aria-hidden />
              </Link>
            </div>
          </ClipReveal>
        ))}
      </div>
    </section>
  )
}
