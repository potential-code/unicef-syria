import { Link } from '@tanstack/react-router'
import { ArrowRight, Building2, Check, Eye, Handshake, LogIn, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { SmartImage } from '@/components/shared/SmartImage'
import { Button } from '@/components/ui/button'
import { usePageTitle } from '@/hooks/use-page-title'
import { PageBanner } from '../components/PageBanner'

const AUDIENCES = [
  { id: 'employers', icon: Building2, image: 'images/generated/route-employment.webp' },
  { id: 'partners', icon: Handshake, image: 'images/generated/scene-mentor.webp' },
] as const
const ROLE_VIEWS = ['trainer', 'employer', 'centre', 'partner', 'unicef', 'viewer'] as const

/** For employers and programme partners: what the platform offers and how role views work. */
export function PartnersPage() {
  const { t } = useTranslation('public')
  usePageTitle(t('partners.title'))
  const signIn = (
    <Button asChild size="lg" className="rounded-full bg-yellow text-ink hover:bg-white">
      <Link to="/sign-in">
        <LogIn className="size-5 rtl-mirror" aria-hidden />
        {t('partners.signIn')}
      </Link>
    </Button>
  )
  return (
    <>
      <PageBanner
        eyebrow={t('partners.eyebrow')}
        title={t('partners.title')}
        body={t('partners.body')}
      >
        <div className="mt-8">{signIn}</div>
      </PageBanner>

      <div className="container-page grid gap-8 py-16 lg:grid-cols-2">
        {AUDIENCES.map((a) => {
          const points = t(`partners.${a.id}.points`, { returnObjects: true }) as string[]
          return (
            <Reveal
              key={a.id}
              as="article"
              className="overflow-hidden rounded-[2rem] border bg-white shadow-sm"
            >
              <SmartImage src={a.image} alt="" className="aspect-[16/7] w-full" />
              <div className="p-6 sm:p-8">
                <a.icon className="mb-3 size-8 text-blue" aria-hidden />
                <h2 className="text-3xl">{t(`partners.${a.id}.title`)}</h2>
                <p className="mt-2 text-ink-soft">{t(`partners.${a.id}.body`)}</p>
                <ul className="mt-5 space-y-2.5">
                  {points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <Check className="mt-0.5 size-5 shrink-0 text-success" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>

      <section aria-labelledby="views-title" className="bg-sky-50 py-16">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <h2 id="views-title" className="flex items-center gap-2 text-3xl">
              <Eye className="size-7 text-blue" aria-hidden />
              {t('partners.views.title')}
            </h2>
            <p className="mt-3 text-ink-soft">{t('partners.views.body')}</p>
          </Reveal>
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ROLE_VIEWS.map((r) => (
              <StaggerItem key={r} className="rounded-2xl border bg-white p-5 shadow-sm">
                <h3 className="text-lg">{t(`common:roles.${r}`)}</h3>
                <p className="mt-1 text-sm text-ink-soft">{t(`partners.views.${r}`)}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-6 flex gap-2 text-sm text-ink-soft">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
            {t('partners.views.privacy')}
          </p>
        </div>
      </section>

      <section className="on-dark bg-navy py-14 text-white">
        <div className="container-page flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl text-white">{t('partners.cta.title')}</h2>
            <p className="mt-2 text-white/80">{t('partners.cta.body')}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {signIn}
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="rounded-full border-2 border-white/60 text-white hover:bg-white/15 hover:text-white"
            >
              <Link to="/opportunities">
                {t('partners.cta.opps')}
                <ArrowRight className="size-5 rtl-mirror" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
