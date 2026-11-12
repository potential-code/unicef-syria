import { Link } from '@tanstack/react-router'
import { BookOpen, Compass } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
import { Reveal, Stagger, StaggerItem } from '@/components/motion'
import { NextAction } from '@/components/shared/NextAction'
import { useMyYouth } from '@/store/hooks'
import { DashboardGreeting } from '../components/DashboardGreeting'
import { DashboardStats } from '../components/DashboardStats'
import { DiscoveryHeroCard } from '../components/DiscoveryHeroCard'
import { LearningProgressCard } from '../components/LearningProgressCard'
import { MentorAccessCard } from '../components/MentorAccessCard'
import { NextSessionCard } from '../components/NextSessionCard'
import { OpportunitiesCard } from '../components/OpportunitiesCard'
import { PointsBadgesCard } from '../components/PointsBadgesCard'
import { useNextAction } from '../hooks/use-next-action'

/** Y02 youth dashboard. */
export function DashboardPage() {
  const { t } = useTranslation('learn')
  const youth = useMyYouth()
  const next = useNextAction(youth)
  const before = !youth.assessment

  return (
    <div className="space-y-6">
      <Reveal>
        <DashboardGreeting youth={youth} />
      </Reveal>

      {before ? (
        <>
          <Reveal>
            <DiscoveryHeroCard />
          </Reveal>
          <Stagger className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-3 [&>*]:min-w-0">
            <StaggerItem>
              <NextSessionCard youth={youth} />
            </StaggerItem>
            <StaggerItem>
              <section className="card h-full p-5 sm:p-6">
                <h2 className="flex items-center gap-2 text-lg">
                  <BookOpen className="size-5 shrink-0 text-blue" aria-hidden />
                  {t('dash.libraryTitle')}
                </h2>
                <p className="mt-2 text-sm text-ink-soft">{t('dash.libraryBody')}</p>
                <Link
                  to="/youth/library"
                  className="mt-4 inline-flex h-10 items-center rounded-full bg-blue px-4 text-sm font-semibold text-white shadow-md hover:bg-navy"
                >
                  {t('dash.browseLibrary')}
                </Link>
              </section>
            </StaggerItem>
            <StaggerItem>
              <PointsBadgesCard youth={youth} />
            </StaggerItem>
          </Stagger>
        </>
      ) : (
        <>
          <Reveal className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr] [&>*]:min-w-0">
            <NextAction
              label={t('dash.nextLabel')}
              title={next.title}
              body={next.body}
              to={next.to}
              cta={next.cta}
              className="h-full rounded-3xl p-6 sm:p-8 [&>p:nth-child(3)]:text-2xl"
            />
            <NextSessionCard youth={youth} />
          </Reveal>
          <Reveal>
            <DashboardStats youth={youth} />
          </Reveal>
          <Stagger className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-3 [&>*]:min-w-0">
            <StaggerItem className="space-y-4">
              <LearningProgressCard youth={youth} />
              <section className="relative flex flex-col justify-between gap-3 overflow-hidden rounded-3xl bg-sky-100 p-5 shadow-md sm:p-6">
                <Motif variant="corner" className="text-blue/10" />
                <div className="relative">
                  <h2 className="flex items-center gap-2 text-lg">
                    <Compass className="size-5 text-blue" aria-hidden />
                    {t('dash.discoveryDone')}
                  </h2>
                  <p className="mt-2 text-sm text-ink-soft">{t('dash.discoveryDoneBody')}</p>
                </div>
                <Link
                  to="/youth/discovery/results"
                  className="relative inline-flex h-10 w-fit items-center rounded-full bg-white px-4 text-sm font-semibold text-blue shadow-md hover:bg-sky-50"
                >
                  {t('dash.viewResults')}
                </Link>
              </section>
            </StaggerItem>
            <StaggerItem className="space-y-4">
              <OpportunitiesCard youth={youth} />
              <MentorAccessCard youth={youth} />
            </StaggerItem>
            <StaggerItem>
              <PointsBadgesCard youth={youth} />
            </StaggerItem>
          </Stagger>
        </>
      )}
    </div>
  )
}
