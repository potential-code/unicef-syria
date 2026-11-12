import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/shared/PageHeader'
import { CentreCompare } from '../components/CentreCompare'
import { FilterBar } from '../components/FilterBar'
import { OutcomeSections } from '../components/OutcomeSections'
import { ReportContext } from '../components/ReportContext'
import { useAdminFilters } from '../lib/useAdminFilters'
import { useScope } from '../lib/useScope'

/** Partner outcomes: employment, freelance and enterprise kept as separate measures. */
export function PartnerOutcomesPage() {
  const { t } = useTranslation('admin')
  const { filters } = useAdminFilters()
  const { centreIds } = useScope()
  return (
    <div className="space-y-6">
      <PageHeader title={t('partner.outcomes.title')} description={t('partner.outcomes.body')} />
      <FilterBar
        keys={[
          'governorate',
          'centreId',
          'programmeId',
          'route',
          'gender',
          'ageGroup',
          'disability',
          'period',
        ]}
      />
      <ReportContext />
      <OutcomeSections
        historicalExtra={
          <CentreCompare
            centreIds={centreIds.filter((c) => !filters.centreId || c === filters.centreId)}
            filters={filters}
          />
        }
      />
    </div>
  )
}
