import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LaurelBranch, LaurelWreath } from '@/components/brand'
import { Magnetic, Reveal, SplitWords } from '@/components/motion'
import { SmartImage } from '@/components/shared/SmartImage'
import { Button } from '@/components/ui/button'
import { ClipReveal } from './ClipReveal'
import { Drift } from './Drift'

/** Closing call to action: an image-backed band with a navy gradient and the emblem laurel. */
export function FinalCta() {
  const { t } = useTranslation('public')
  return (
    <section className="bg-white pb-20 sm:pb-24">
      <div className="container-page">
        <ClipReveal className="on-dark relative isolate overflow-hidden rounded-3xl bg-navy text-white shadow-lg">
          <SmartImage
            src="images/generated/cta-youth.webp"
            alt=""
            className="absolute inset-0 -z-20 size-full"
          />
          <div className="absolute inset-0 -z-10 bg-navy/80 md:bg-transparent md:bg-linear-to-r md:from-navy md:from-25% md:via-navy/70 md:via-50% md:to-transparent md:to-85% md:rtl:bg-linear-to-l" />
          <Drift y={10} rotate={10} className="absolute start-2 top-6 text-white/[0.1] sm:start-6">
            <LaurelWreath className="h-64" />
          </Drift>
          <LaurelBranch
            className="absolute -bottom-6 start-[46%] hidden h-48 w-auto text-yellow/30 md:block"
            mirrored
          />
          <div className="relative max-w-xl px-6 py-14 sm:px-12 sm:py-20">
            <p className="mb-3 flex items-center gap-2 text-xs font-bold tracking-widest text-white/90 uppercase">
              <span className="h-0.5 w-6 rounded-full bg-yellow" aria-hidden />
              {t('common:appFullName')}
            </p>
            <h2 className="text-3xl text-white sm:text-[2.75rem]">
              <SplitWords text={t('home.final.title')} />
            </h2>
            <Reveal>
              <p className="mt-4 max-w-md text-lg text-white/85">{t('home.final.body')}</p>
              <Magnetic className="mt-7 inline-block">
                <Button
                  asChild
                  className="h-11 rounded-full bg-yellow px-6 text-ink shadow-lg hover:bg-white"
                >
                  <Link to="/register">
                    {t('home.hero.primary')}
                    <ArrowRight className="size-4 rtl-mirror" aria-hidden />
                  </Link>
                </Button>
              </Magnetic>
            </Reveal>
          </div>
        </ClipReveal>
      </div>
    </section>
  )
}
