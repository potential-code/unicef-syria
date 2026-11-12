import type { Youth } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { ShieldAlert, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { COHORTS } from '@/data/orgs'
import { canSeeYouth } from '@/domain/access'
import { useAllYouth } from '@/store/actions/youth'
import { ApplicationsTable } from '../components/ApplicationsTable'
import { CompletionTable } from '../components/CompletionTable'
import { PracticalsList } from '../components/PracticalsList'
import { RosterTable } from '../components/RosterTable'
import { useScope } from '../lib/useScope'
import { useViewParam } from '../lib/useViewParam'

const VIEWS = ['applications', 'roster', 'completion', 'practicals'] as const

/** Applications and roster for the own centre, assign to cohort, and the role-boundary demo. */
export function CentreParticipantsPage() {
  const { t } = useTranslation('admin')
  const { me, cohortIds } = useScope()
  const all = Object.values(useAllYouth())
  const [view, setView] = useViewParam(VIEWS, 'applications')
  const visible: Youth[] = all.filter((y) => canSeeYouth(me, y))
  const applicants = visible.filter(
    (y) =>
      y.trainingApplication &&
      COHORTS.some(
        (c) => c.programmeId === y.trainingApplication?.programmeId && cohortIds.includes(c.id),
      ),
  )
  const roster = visible.filter((y) => y.cohortIds.some((k) => cohortIds.includes(k)))
  const outside = all.find((y) => !canSeeYouth(me, y) && y.cohortIds.length > 0)
  return (
    <div className="space-y-6">
      <PageHeader title={t('participants.title')} description={t('participants.body')} />
      <Tabs value={view} onValueChange={setView}>
        <TabsList className="flex h-auto w-full flex-wrap justify-start">
          {VIEWS.map((v) => (
            <TabsTrigger key={v} value={v} className="min-h-11">
              {t(`participants.tabs.${v}`)}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="applications" className="mt-4">
          {applicants.length ? (
            <ApplicationsTable youth={applicants} />
          ) : (
            <EmptyState
              icon={Users}
              title={t('empty.noApplicants')}
              body={t('empty.noApplicantsBody')}
            />
          )}
        </TabsContent>
        <TabsContent value="roster" className="mt-4">
          {roster.length ? (
            <RosterTable youth={roster} />
          ) : (
            <EmptyState icon={Users} title={t('empty.noRoster')} body={t('empty.noRosterBody')} />
          )}
        </TabsContent>
        <TabsContent value="completion" className="mt-4">
          <CompletionTable youth={roster} />
        </TabsContent>
        <TabsContent value="practicals" className="mt-4">
          <PracticalsList youth={roster} />
        </TabsContent>
      </Tabs>
      {outside && (
        <aside className="flex flex-col gap-3 rounded-2xl border border-dashed border-orange/40 bg-white p-4 sm:flex-row sm:items-center">
          <ShieldAlert className="size-6 shrink-0 text-orange" aria-hidden />
          <div className="flex-1 text-sm">
            <p className="font-semibold">{t('participants.boundaryTitle')}</p>
            <p className="text-ink-soft">{t('participants.boundaryBody')}</p>
          </div>
          <Link
            to="/centre/participants/$youthId"
            params={{ youthId: outside.id }}
            className="inline-flex min-h-11 items-center rounded-full border-2 border-blue px-4 text-sm font-semibold text-blue hover:bg-sky-50"
          >
            {t('participants.boundaryCta', { id: outside.id })}
          </Link>
        </aside>
      )}
    </div>
  )
}
