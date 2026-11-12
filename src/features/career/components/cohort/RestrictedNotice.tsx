import type { CohortId } from '@shared/types'
import { Lock, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

/** Shows that other cohorts' restricted sessions exist but are not listed (brief §11, §22). */
export function RestrictedNotice({
  hiddenCount,
  hiddenCohorts,
}: {
  hiddenCount: number
  hiddenCohorts: CohortId[]
}) {
  const { t } = useTranslation('career')
  return (
    <div className="card flex flex-col gap-3 border-s-4 border-s-navy p-4 sm:flex-row sm:items-center">
      <div className="min-w-0 text-sm">
        <p className="flex items-start gap-2 font-semibold text-navy">
          <Lock className="mt-0.5 size-4 shrink-0" aria-hidden />
          {t('cohort.restricted.title', { count: hiddenCount, cohorts: hiddenCohorts.join(', ') })}
        </p>
        <p className="ps-6 text-ink-soft">{t('cohort.restricted.body')}</p>
      </div>
      <span className="flex items-center gap-1 text-xs font-semibold text-navy sm:ms-auto">
        <ShieldCheck className="size-4" aria-hidden />
        {t('cohort.restricted.badge')}
      </span>
    </div>
  )
}
