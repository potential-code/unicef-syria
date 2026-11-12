import { CalendarX2, FilterX, Layers } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/button'
import type { HistoricalAvailability } from '../lib/filters'
import { useAdminFilters } from '../lib/useAdminFilters'

/** Meaningful empty state when the historical sample cannot answer the current filters. */
export function HistoricalEmpty({ availability }: { availability: HistoricalAvailability }) {
  const { t } = useTranslation('admin')
  const { setFilter, clear } = useAdminFilters()
  if (availability === 'cohort')
    return (
      <EmptyState
        icon={Layers}
        title={t('empty.cohortTitle')}
        body={t('empty.cohortBody')}
        action={
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => setFilter('cohortId', undefined)}
          >
            {t('empty.clearCohort')}
          </Button>
        }
      />
    )
  if (availability === 'period')
    return (
      <EmptyState
        icon={CalendarX2}
        title={t('empty.periodTitle')}
        body={t('empty.periodBody')}
        action={
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => setFilter('period', undefined)}
          >
            {t('empty.usePeriod')}
          </Button>
        }
      />
    )
  return (
    <EmptyState
      icon={FilterX}
      title={t('empty.noRowsTitle')}
      body={t('empty.noRowsBody')}
      action={
        <Button variant="outline" size="sm" className="rounded-full" onClick={clear}>
          {t('common:clearFilters')}
        </Button>
      }
    />
  )
}
