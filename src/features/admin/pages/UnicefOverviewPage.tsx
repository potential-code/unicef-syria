import { Link } from '@tanstack/react-router'
import { HandHeart, Network, Route, ShieldCheck, TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { AdminHero } from '../components/AdminHero'
import { DrillCards } from '../components/DrillCards'
import { FilterBar } from '../components/FilterBar'
import { ReportBody } from '../components/ReportBody'
import { ReportContext } from '../components/ReportContext'
import { useAdminFilters } from '../lib/useAdminFilters'

/** UNICEF national overview (brief §18, §23 step 6). */
export function UnicefOverviewPage() {
  const { t } = useTranslation('admin')
  const { linkSearch } = useAdminFilters()
  return (
    <div className="space-y-6">
      <AdminHero
        eyebrow={t('unicef.eyebrow')}
        title={t('unicef.overview.title')}
        body={t('unicef.overview.body')}
        actions={
          <Button
            asChild
            variant="secondary"
            className="rounded-full bg-white text-navy hover:bg-sky-100"
          >
            <Link to="/unicef/followup" search={linkSearch()}>
              <ShieldCheck className="size-4" aria-hidden />
              {t('unicef.overview.followUpCta')}
            </Link>
          </Button>
        }
      />
      <FilterBar />
      <ReportContext />
      <ReportBody recordsTo="/unicef/followup" />
      <section aria-labelledby="drill" className="space-y-3">
        <h2 id="drill" className="text-xl">
          {t('drill.title')}
        </h2>
        <DrillCards
          items={[
            {
              to: '/unicef/partners',
              icon: Network,
              title: t('common:nav.unicef.partners'),
              body: t('drill.partners'),
            },
            {
              to: '/unicef/programmes',
              icon: Route,
              title: t('common:nav.unicef.programmes'),
              body: t('drill.programmes'),
            },
            {
              to: '/unicef/inclusion',
              icon: HandHeart,
              title: t('common:nav.unicef.inclusion'),
              body: t('drill.inclusion'),
            },
            {
              to: '/unicef/outcomes',
              icon: TrendingUp,
              title: t('common:nav.unicef.outcomes'),
              body: t('drill.outcomes'),
            },
          ]}
        />
      </section>
    </div>
  )
}
