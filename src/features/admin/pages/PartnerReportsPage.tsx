import { ArrowLeft, FileDown, Printer } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { FilterBar } from '../components/FilterBar'
import { PrintReport } from '../components/PrintReport'
import { ReportBody } from '../components/ReportBody'
import { ReportContext } from '../components/ReportContext'
import { useLabels } from '../lib/useLabels'
import { useScope } from '../lib/useScope'

/** Partner reports with an export preview: a printable report carrying the filter context. */
export function PartnerReportsPage() {
  const { t } = useTranslation('admin')
  const { partner } = useLabels()
  const { me } = useScope()
  const [preview, setPreview] = useState(false)
  return (
    <div className="space-y-6">
      <PageHeader
        title={t('partner.reports.title')}
        description={t('partner.reports.body')}
        actions={
          preview ? (
            <>
              <Button variant="outline" className="rounded-full" onClick={() => setPreview(false)}>
                <ArrowLeft className="size-4 rtl-mirror" aria-hidden />
                {t('print.back')}
              </Button>
              <Button
                className="rounded-full"
                onClick={() => {
                  toast.success(t('print.toast'))
                  window.print()
                }}
              >
                <Printer className="size-4" aria-hidden />
                {t('common:print')}
              </Button>
            </>
          ) : (
            <Button className="rounded-full" onClick={() => setPreview(true)}>
              <FileDown className="size-4" aria-hidden />
              {t('print.open')}
            </Button>
          )
        }
      />
      {preview ? (
        <PrintReport
          title={t('partner.reports.title')}
          scope={`${me.partnerId} ${partner(me.partnerId)}`}
        />
      ) : (
        <>
          <FilterBar
            keys={[
              'governorate',
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
          <ReportBody recordsTo="/partner/participants" />
        </>
      )}
    </div>
  )
}
