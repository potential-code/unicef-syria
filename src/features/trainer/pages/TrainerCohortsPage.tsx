import { SearchX, Users } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { CohortBanner } from '../components/CohortBanner'
import { NO_FILTERS, type RosterFilterState, RosterFilters } from '../components/RosterFilters'
import { RosterTable } from '../components/RosterTable'
import type { RosterPreset } from '../config'
import { type LearnerStats, useTrainerScope } from '../hooks/useTrainerScope'

const PRESETS: Record<RosterPreset, Partial<RosterFilterState>> = {
  all: {},
  attendance: { attendance: 'below' },
  completion: { progress: 'incomplete' },
  grading: { practical: 'submitted' },
  followUp: { followUp: true },
}

function matches(s: LearnerStats, f: RosterFilterState) {
  if (f.progress === 'notStarted' && s.progress > 0) return false
  if (f.progress === 'incomplete' && s.progress >= 100) return false
  if (f.progress === 'complete' && s.progress < 100) return false
  if (f.attendance === 'below' && s.absent === 0) return false
  if (f.attendance === 'full' && (s.absent > 0 || s.present === 0)) return false
  if (f.assessment !== 'all' && s.assessment !== f.assessment) return false
  if (f.practical === 'submitted' && s.pendingPracticals.length === 0) return false
  if (f.followUp && !s.followUp) return false
  return true
}

/** T02 My Cohorts: roster for assigned cohorts only, filterable from the performance panel. */
export function TrainerCohortsPage({ filter = 'all' }: { filter?: RosterPreset }) {
  const { t } = useTranslation('trainer')
  const { cohorts, stats } = useTrainerScope()
  const [f, setF] = useState<RosterFilterState>({ ...NO_FILTERS, ...(PRESETS[filter] ?? {}) })
  const rows = stats
    .filter((s) => matches(s, f))
    .sort((a, b) => a.youth.profile.name.localeCompare(b.youth.profile.name))

  return (
    <div className="space-y-6">
      <PageHeader title={t('cohorts.title')} description={t('cohorts.subtitle')} />
      <CohortBanner cohorts={cohorts} named={stats.length} />
      <RosterFilters value={f} onChange={setF} />
      <p className="text-sm font-medium text-ink-soft" aria-live="polite">
        {t('cohorts.showing', { count: rows.length, total: stats.length })}
      </p>
      {stats.length === 0 ? (
        <EmptyState icon={Users} title={t('cohorts.empty')} body={t('cohorts.emptyBody')} />
      ) : rows.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title={t('common:noResults')}
          body={t('cohorts.noMatchBody')}
          action={
            <Button variant="secondary" size="sm" onClick={() => setF(NO_FILTERS)}>
              {t('common:clearFilters')}
            </Button>
          }
        />
      ) : (
        <RosterTable rows={rows} />
      )}
      <p className="text-xs text-ink-soft">{t('cohorts.note')}</p>
    </div>
  )
}
