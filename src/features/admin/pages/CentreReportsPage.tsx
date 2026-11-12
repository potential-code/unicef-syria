import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/shared/PageHeader'
import { FilterBar } from '../components/FilterBar'
import { ReportBody } from '../components/ReportBody'
import { ReportContext } from '../components/ReportContext'

/** Centre reports: historical layer filtered to the own centre plus current cohort activity. */
export function CentreReportsPage() {
  const { t } = useTranslation('admin')
  return (
    <div className="space-y-6">
      <PageHeader title={t('centre.reports.title')} description={t('centre.reports.body')} />
      <FilterBar
        keys={[
          'centreId',
          'programmeId',
          'cohortId',
          'route',
          'gender',
          'ageGroup',
          'disability',
          'period',
        ]}
      />
      <ReportContext />
      <ReportBody recordsTo="/centre/participants" />
    </div>
  )
}
