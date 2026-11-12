import { createFileRoute } from '@tanstack/react-router'
import { ROSTER_PRESETS, type RosterPreset } from '@/features/trainer/config'
import { TrainerCohortsPage } from '@/features/trainer/pages/TrainerCohortsPage'

export const Route = createFileRoute('/trainer/cohorts')({
  validateSearch: (s: Record<string, unknown>): { filter?: RosterPreset } =>
    ROSTER_PRESETS.includes(s.filter as RosterPreset) ? { filter: s.filter as RosterPreset } : {},
  component: function CohortsRoute() {
    const { filter } = Route.useSearch()
    return <TrainerCohortsPage key={filter ?? 'all'} filter={filter} />
  },
})
