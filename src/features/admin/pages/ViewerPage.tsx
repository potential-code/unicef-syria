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
          <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-yellow px-3 py-1 text-xs font-semibold text-ink shadow-xs sm:self-end">
            <Eye className="size-3.5" aria-hidden />
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
