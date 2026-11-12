import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/shared/PageHeader'
import { FilterBar } from '../components/FilterBar'
import { OutcomeSections } from '../components/OutcomeSections'
import { ReportContext } from '../components/ReportContext'

/** Employment, freelance and enterprise outcomes as separate measures. */
export function UnicefOutcomesPage() {
  const { t } = useTranslation('admin')
  return (
    <div className="space-y-6">
      <PageHeader title={t('unicef.outcomes.title')} description={t('unicef.outcomes.body')} />
      <FilterBar />
      <ReportContext />
      <OutcomeSections />
    </div>
  )
}
