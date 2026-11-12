import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Magnetic, Reveal, SplitWords } from '@/components/motion'
import { Button } from '@/components/ui/button'

export function FinalCta() {
  const { t } = useTranslation('public')
  return (
    <section className="on-dark relative overflow-hidden bg-grad-unicef py-20 text-center text-white sm:py-28">
      <span
        className="pointer-events-none absolute start-[10%] top-10 size-24 rounded-full bg-yellow/80"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute end-[8%] bottom-10 size-40 rounded-full border-[16px] border-white/15"
        aria-hidden
      />
      <div className="container-page relative">
        <h2 className="mx-auto max-w-3xl text-4xl text-white sm:text-6xl">
          <SplitWords text={t('home.final.title')} />
        </h2>
        <Reveal>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">{t('home.final.body')}</p>
          <Magnetic className="mt-8">
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
        </Reveal>
      </div>
    </section>
  )
}
