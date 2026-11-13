import { Link } from '@tanstack/react-router'
import { BookOpen, Info } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Stagger, StaggerItem } from '@/components/motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { CENTRES, COHORTS, INTAKES, PROGRAMMES } from '@/data/orgs'
import { SESSIONS } from '@/data/sessions'
import { useMyYouth } from '@/store/hooks'
import { ProgrammeCard } from '../components/ProgrammeCard'

/**
 * Training programmes (UNICEF: training announcements and online application). Lists the open
 * centre intakes; the one matching the learner's route and governorate is recommended first.
 * Applying sends the application to the programme's trainer, who accepts and assigns a cohort.
 */
export function ProgrammesPage() {
  const { t } = useTranslation('career')
  const youth = useMyYouth()
  const items = INTAKES.map((i) => {
    const cohort = COHORTS.find((c) => c.id === i.cohortId)
    const programme = PROGRAMMES.find((p) => p.id === cohort?.programmeId)
    const centre = CENTRES.find((c) => c.id === cohort?.centreId)
    const recommended = !!youth.route && programme?.route === youth.route
    const near = centre?.governorate === youth.profile.governorate
    return { ...i, cohort, recommended, score: (recommended ? 2 : 0) + (near ? 1 : 0) }
  }).sort((a, b) => b.score - a.score)

  return (
    <div className="space-y-6">
      <PageHeader title={t('programmes.title')} description={t('programmes.body')} />
      <div className="flex items-start gap-3 rounded-2xl bg-sky-50 p-4 text-sm text-navy ring-1 ring-cyan/25">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
        <p className="flex-1">
          {t('programmes.how')}{' '}
          <Link
            to="/youth/library"
            className="inline-flex items-center gap-1 font-semibold text-blue hover:underline"
          >
            <BookOpen className="size-3.5" aria-hidden />
            {t('programmes.library')}
          </Link>
        </p>
      </div>
      <Stagger className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,19rem),1fr))] gap-5">
        {items.map((i) =>
          i.cohort ? (
            <StaggerItem key={i.cohortId}>
              <ProgrammeCard
                cohort={i.cohort}
                youth={youth}
                start={i.start}
                placesLeft={i.placesLeft}
                sessions={SESSIONS.filter((s) => s.cohortId === i.cohortId).length}
                recommended={i.recommended}
              />
            </StaggerItem>
          ) : null,
        )}
      </Stagger>
    </div>
  )
}
