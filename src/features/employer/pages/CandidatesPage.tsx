import type { CourseId } from '@shared/types'
import { SearchX, ShieldCheck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Stagger, StaggerItem } from '@/components/motion'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { useAllYouth } from '@/store/actions/youth'
import { CandidateCard } from '../components/CandidateCard'
import {
  type CandidateFilterState,
  CandidateFilters,
  EMPTY_FILTERS,
} from '../components/CandidateFilters'
import { useOrgScope } from '../hooks/use-org-scope'
import { completedCourses, declaredSkills, explainMatch, hasMatch } from '../lib/match'

const uniq = <T,>(xs: T[]) => Array.from(new Set(xs)).sort()

/** E02 candidate discovery: opted-in profiles only. */
export function CandidatesPage() {
  const { t } = useTranslation('employer')
  const { opportunities } = useOrgScope()
  const all = useAllYouth()
  const visible = useMemo(
    () => Object.values(all).filter((y) => y.profile.consentEmployerVisible && y.profileComplete),
    [all],
  )
  const firstOpen = opportunities.find((o) => o.status === 'open') ?? opportunities[0]
  const [f, setF] = useState<CandidateFilterState>({
    opp: firstOpen?.id ?? 'none',
    ...EMPTY_FILTERS,
  })
  const opp = opportunities.find((o) => o.id === f.opp)

  const shown = visible
    .filter(
      (y) =>
        !f.skill.trim() ||
        declaredSkills(y).some((s) => s.toLowerCase().includes(f.skill.trim().toLowerCase())),
    )
    .filter((y) => f.course === 'any' || completedCourses(y).includes(f.course as CourseId))
    .filter((y) => f.interest === 'any' || y.profile.interests.includes(f.interest))
    .filter((y) => f.location === 'any' || y.profile.governorate === f.location)
    .filter((y) => f.availability === 'any' || y.profile.availability === f.availability)
    .filter((y) => !opp || hasMatch(explainMatch(y, opp)))

  const reset = () => setF({ opp: f.opp, ...EMPTY_FILTERS })
  return (
    <div>
      <PageHeader title={t('candidates.title')} description={t('candidates.body')} />
      <p className="mb-4 flex items-start gap-2 rounded-xl bg-sky-50 p-3 text-sm text-navy">
        <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
        {t('candidates.privacy')}
      </p>
      <CandidateFilters
        value={f}
        onChange={setF}
        opportunities={opportunities}
        courses={uniq(visible.flatMap(completedCourses))}
        interests={uniq(visible.flatMap((y) => y.profile.interests))}
        availability={uniq(visible.map((y) => y.profile.availability))}
      />
      <p className="mt-5 mb-3 text-sm text-ink-soft" aria-live="polite">
        {t('candidates.count', { count: shown.length, total: visible.length })}
      </p>
      {shown.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title={t('empty.noMatch.title')}
          body={t('empty.noMatch.body')}
          action={
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => setF({ ...f, ...EMPTY_FILTERS, opp: 'none' })}
            >
              {t('common:clearFilters')}
            </Button>
          }
        />
      ) : (
        <Stagger className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          {shown.map((y) => (
            <StaggerItem key={y.id}>
              <CandidateCard youth={y} opp={opp} />
            </StaggerItem>
          ))}
        </Stagger>
      )}
      {shown.length > 0 && (
        <Button variant="ghost" size="sm" className="mt-4 text-blue" onClick={reset}>
          {t('common:clearFilters')}
        </Button>
      )}
    </div>
  )
}
