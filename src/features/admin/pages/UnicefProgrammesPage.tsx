import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/shared/PageHeader'
import { FilterBar } from '../components/FilterBar'
import { ProgrammeTable } from '../components/ProgrammeTable'
import { ReportBody } from '../components/ReportBody'
import { ReportContext } from '../components/ReportContext'
import { useAdminFilters } from '../lib/useAdminFilters'
import { useLabels } from '../lib/useLabels'

/** Programme filters and per-programme KPIs across the national scope. */
export function UnicefProgrammesPage() {
  const { t } = useTranslation('admin')
  const { filters } = useAdminFilters()
  const { programme } = useLabels()
  return (
    <div className="space-y-6">
      <PageHeader
        title={
          filters.programmeId
            ? `${filters.programmeId} ${programme(filters.programmeId)}`
            : t('unicef.programmes.title')
        }
        description={t('unicef.programmes.body')}
        crumbs={[
          { label: t('common:nav.unicef.overview'), to: '/unicef' },
          { label: t('common:nav.unicef.programmes') },
        ]}
      />
      <FilterBar />
      <ReportContext />
      {filters.cohortId || filters.period === 'q4' ? null : (
        <ProgrammeTable
          filters={{ ...filters, programmeId: undefined }}
          to="/unicef/programmes"
          selected={filters.programmeId}
        />
      )}
      <ReportBody recordsTo="/unicef/followup" charts={false} />
    </div>
  )
}
