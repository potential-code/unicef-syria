import { Eye } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AdminHero } from '../components/AdminHero'
import { FilterBar } from '../components/FilterBar'
import { ReportBody } from '../components/ReportBody'
import { ReportContext } from '../components/ReportContext'

/**
 * Optional reporting viewer: read-only aggregates. No individual records, no contact details,
 * no action buttons; filters only change what is displayed.
 */
export function ViewerPage() {
  const { t } = useTranslation('admin')
  return (
    <div className="space-y-6">
      <AdminHero
        eyebrow={t('viewer.eyebrow')}
        title={t('viewer.title')}
        body={t('viewer.body')}
        aside={
          <span className="inline-flex items-center gap-2 rounded-full bg-yellow px-4 py-2 text-sm font-semibold text-ink">
            <Eye className="size-4" aria-hidden />
            {t('viewer.optional')}
          </span>
        }
      />
      <FilterBar />
      <ReportContext />
      <ReportBody />
    </div>
  )
}
