import type { Application, OutcomeType } from '@shared/types'
import { Megaphone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { reportOutcome } from '@/store/actions/career-extra'

/** Lets the learner report an outcome; it stays "pending confirmation" until confirmed. */
export function ReportOutcomeButton({ app, type }: { app: Application; type: OutcomeType }) {
  const { t } = useTranslation('career')
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-border bg-sky-50/50 p-3">
      <Button
        variant="outline"
        size="sm"
        className="rounded-full"
        onClick={() => {
          reportOutcome(app.youthId, app.opportunityId, type)
          toast.success(t('apps.outcomes.reportToast'))
        }}
      >
        <Megaphone className="size-4" aria-hidden />
        {t(`apps.outcomes.report.${type}`)}
      </Button>
      <p className="min-w-0 flex-1 text-xs text-ink-soft">{t('apps.outcomes.reportHint')}</p>
    </div>
  )
}
