import { Link } from '@tanstack/react-router'
import { MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Parallax, Reveal, Stagger, StaggerItem } from '@/components/motion'
import { SmartImage } from '@/components/shared/SmartImage'
import { CENTRES, COHORTS, PARTNERS, PROGRAMMES } from '@/data/orgs'
import { useLocalized } from '@/i18n'

/** Sample training centres with the blended programme each one hosts. */
export function CentresSection() {
  const { t } = useTranslation('public')
  const { l } = useLocalized()
  return (
    <section aria-labelledby="centres-title" className="overflow-hidden bg-white py-20 sm:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
        <Reveal className="relative">
          <Parallax speed={6} className="overflow-hidden rounded-[2rem] shadow-lg">
            <SmartImage
              src="images/generated/scene-learning.webp"
              alt={t('home.centres.imageAlt')}
              className="aspect-[4/5] w-full"
            />
          </Parallax>
          <div className="absolute -end-3 top-8 max-w-[15rem] rounded-2xl bg-navy p-4 text-sm text-white shadow-pop sm:-end-8">
            <p className="font-bold">{t('home.centres.badgeTitle')}</p>
            <p className="mt-1 text-white/80">{t('home.centres.badgeBody')}</p>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <p className="mb-3 text-sm font-bold tracking-wider text-blue uppercase">
              {t('home.centres.eyebrow')}
            </p>
            <h2 id="centres-title" className="text-4xl sm:text-5xl">
              {t('home.centres.title')}
            </h2>
            <p className="mt-3 text-lg text-ink-soft">{t('home.centres.body')}</p>
          </Reveal>
          <Stagger className="mt-8 space-y-4">
            {CENTRES.map((c) => {
              const cohort = COHORTS.find((k) => k.centreId === c.id)
              const programme = PROGRAMMES.find((p) => p.id === cohort?.programmeId)
              return (
                <StaggerItem key={c.id}>
                  <Link
                    to="/explore"
                    search={{ centre: c.id }}
                    className="lift flex items-center gap-4 rounded-2xl border bg-white p-3 pe-5 shadow-sm"
                  >
                    <SmartImage
                      src={c.image}
                      alt=""
                      className="size-20 shrink-0 rounded-xl sm:size-24"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-1 text-sm font-semibold text-blue">
                        <MapPin className="size-4" aria-hidden />
                        {t(`governorates.${c.governorate}`)}
                      </p>
                      <h3 className="text-lg">{l(c.name)}</h3>
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
