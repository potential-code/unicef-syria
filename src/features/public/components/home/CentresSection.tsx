import { Link } from '@tanstack/react-router'
import { MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { GlobeGrid, Motif } from '@/components/brand'
import { Parallax, Stagger, StaggerItem } from '@/components/motion'
import { SmartImage } from '@/components/shared/SmartImage'
import { CENTRES, COHORTS, PARTNERS, PROGRAMMES } from '@/data/orgs'
import { useLocalized } from '@/i18n'
import { SectionIntro } from '../SectionIntro'
import { ClipReveal } from './ClipReveal'
import { Drift } from './Drift'
import { LaurelDivider } from './LaurelDivider'

/** Sample training centres with the blended programme each one hosts. */
export function CentresSection() {
  const { t } = useTranslation('public')
  const { l } = useLocalized()
  return (
    <section
      aria-labelledby="centres-title"
      className="overflow-hidden bg-white pt-14 pb-20 sm:pb-24"
    >
      <LaurelDivider className="container-page mb-14" />
      <div className="container-page grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <Drift y={18} rotate={40} className="absolute -start-16 -bottom-16 text-blue/[0.08]">
            <GlobeGrid className="size-72" strokeWidth={1} />
          </Drift>
          <Parallax speed={6}>
            <ClipReveal className="overflow-hidden rounded-3xl shadow-lg">
              <SmartImage
                src="images/generated/scene-learning.webp"
                alt={t('home.centres.imageAlt')}
                className="aspect-[4/5] max-h-[34rem] w-full"
              />
            </ClipReveal>
          </Parallax>
          <div className="on-dark absolute -end-2 top-8 max-w-[15rem] overflow-hidden rounded-2xl bg-navy p-4 pe-10 text-sm text-white shadow-pop sm:-end-6">
            <Motif variant="corner" className="text-white/[0.14]" />
            <p className="relative font-bold">{t('home.centres.badgeTitle')}</p>
            <p className="relative mt-1 text-white/80">{t('home.centres.badgeBody')}</p>
          </div>
        </div>
        <div>
          <SectionIntro
            id="centres-title"
            eyebrow={t('home.centres.eyebrow')}
            title={t('home.centres.title')}
            body={t('home.centres.body')}
          />
          <Stagger className="mt-8 space-y-3">
            {CENTRES.map((c) => {
              const cohort = COHORTS.find((k) => k.centreId === c.id)
              const programme = PROGRAMMES.find((p) => p.id === cohort?.programmeId)
              return (
                <StaggerItem key={c.id}>
                  <Link
                    to="/explore"
                    search={{ centre: c.id }}
                    className="card card-hover relative isolate flex items-center gap-4 overflow-hidden p-3 pe-5"
                  >
                    <Motif variant="corner" className="-z-10 text-blue/[0.07]" />
                    <SmartImage
                      src={c.image}
                      alt=""
                      className="size-18 shrink-0 rounded-xl sm:size-20"
                    />
                    <div className="relative min-w-0 flex-1">
                      <p className="flex items-center gap-1 text-xs font-bold tracking-wide text-blue uppercase">
                        <MapPin className="size-3.5" aria-hidden />
                        {t(`governorates.${c.governorate}`)}
                      </p>
                      <h3 className="text-base sm:text-lg">{l(c.name)}</h3>
                      <p className="text-sm text-ink-soft">
                        {t('home.centres.hosts', {
                          programme: l(programme?.name),
                          partner: l(PARTNERS.find((p) => p.id === c.partnerId)?.name),
                        })}
                      </p>
                    </div>
                  </Link>
                </StaggerItem>
              )
            })}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
