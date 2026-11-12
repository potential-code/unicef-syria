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
    <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-navy/25 bg-blue-50 p-4 sm:flex-row sm:items-center">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
        <Lock className="size-5" aria-hidden />
      </span>
      <div className="min-w-0 text-sm">
        <p className="font-semibold text-navy">
          {t('cohort.restricted.title', { count: hiddenCount, cohorts: hiddenCohorts.join(', ') })}
        </p>
        <p className="text-ink-soft">{t('cohort.restricted.body')}</p>
      </div>
      <span className="flex items-center gap-1 text-xs font-semibold text-navy sm:ms-auto">
        <ShieldCheck className="size-4" aria-hidden />
        {t('cohort.restricted.badge')}
      </span>
    </div>
  )
}
