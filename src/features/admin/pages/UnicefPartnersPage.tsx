import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/shared/PageHeader'
import { CentreCompare } from '../components/CentreCompare'
import { FilterBar } from '../components/FilterBar'
import { HistoricalEmpty } from '../components/HistoricalEmpty'
import { OrgTree } from '../components/OrgTree'
import { ReportContext } from '../components/ReportContext'
import { useAdminFilters } from '../lib/useAdminFilters'
import { useHistorical } from '../lib/useHistorical'

/** Partner and centre directory with the oversight hierarchy. */
export function UnicefPartnersPage() {
  const { t } = useTranslation('admin')
  const { filters } = useAdminFilters()
  const h = useHistorical({ ...filters, partnerId: undefined, centreId: undefined })
  return (
    <div className="space-y-6">
      <PageHeader title={t('unicef.partners.title')} description={t('unicef.partners.body')} />
      <FilterBar
        keys={['governorate', 'programmeId', 'route', 'gender', 'ageGroup', 'disability', 'period']}
      />
      <ReportContext />
      {h.availability !== 'ok' ? (
        <HistoricalEmpty availability={h.availability} />
      ) : (
        <div className="space-y-8">
          <OrgTree filters={filters} />
          <section className="space-y-3">
            <h2 className="text-xl">{t('unicef.partners.compare')}</h2>
            <CentreCompare
              centreIds={['T01', 'T02', 'T03']}
              filters={{ ...filters, partnerId: undefined, centreId: undefined }}
            />
          </section>
        </div>
      )}
    </div>
  )
}
