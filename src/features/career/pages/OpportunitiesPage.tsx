import { Link } from '@tanstack/react-router'
import { Briefcase, ClipboardList, Info, Laptop, Rocket, SearchX } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Stagger, StaggerItem } from '@/components/motion'
import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/button'
import { nowMs } from '@/lib/clock'
import { cn } from '@/lib/utils'
import { useApplications, useOpportunities } from '@/store/actions/applications'
import { useMyYouth } from '@/store/hooks'
import { CareerHero } from '../components/CareerHero'
import { OpportunityCard } from '../components/opportunities/OpportunityCard'
import { OpportunityFilters } from '../components/opportunities/OpportunityFilters'
import {
  HUB_TAB_BY_ID,
  HUB_TABS,
  type HubFilters,
  type HubTab,
  NO_FILTERS,
  passesFilters,
  TAB_FOR_ROUTE,
} from '../config/opportunities'
import { explainMatch } from '../lib/match'

const TAB_ICON = { jobs: Briefcase, flex: Laptop, enterprise: Rocket } as const

/** Y14 Opportunity hub: three tabs, adaptive filters and explained recommendations. */
export function OpportunitiesPage() {
  const { t } = useTranslation('career')
  const youth = useMyYouth()
  const opps = useOpportunities()
  const apps = useApplications()
  const [tab, setTab] = useState<HubTab>(youth.route ? TAB_FOR_ROUTE[youth.route] : 'jobs')
  const [filters, setFilters] = useState<HubFilters>(NO_FILTERS)
  const config = HUB_TAB_BY_ID[tab]
  const myApps = apps.filter((a) => a.youthId === youth.id)

  const inTab = opps.filter((o) => config.types.includes(o.type))
  const shown = useMemo(() => {
    const at = nowMs()
    return inTab
      .map((o) => ({ opp: o, match: explainMatch(youth, o) }))
      .filter(({ opp, match }) => passesFilters(opp, filters, at, match.recommended))
      .sort(
        (a, b) =>
          Number(b.match.recommended) - Number(a.match.recommended) ||
          (a.opp.status === 'closed' ? 1 : 0) - (b.opp.status === 'closed' ? 1 : 0),
      )
  }, [inTab, filters, youth])
  const dirty = JSON.stringify(filters) !== JSON.stringify(NO_FILTERS)

  const switchTab = (next: HubTab) => {
    setTab(next)
    setFilters(NO_FILTERS)
  }

  return (
    <div>
      <CareerHero
        icon={Briefcase}
        eyebrow={t('opps.eyebrow')}
        title={t('opps.title')}
        body={t('opps.body')}
        actions={
          <Button
            asChild
            variant="secondary"
            className="rounded-full bg-white text-navy hover:bg-sky-100"
          >
            <Link to="/youth/applications">
              <ClipboardList className="size-4" aria-hidden />
              {t('opps.myApplications', { count: myApps.length })}
            </Link>
          </Button>
        }
      />

      <div
        role="tablist"
        aria-label={t('opps.tabsLabel')}
        className="no-scrollbar -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:px-0"
      >
        {HUB_TABS.map((x) => {
          const Icon = TAB_ICON[x.id]
          const active = x.id === tab
          const count = opps.filter((o) => x.types.includes(o.type)).length
          return (
            <button
              key={x.id}
              type="button"
              role="tab"
              id={`tab-${x.id}`}
              aria-selected={active}
              aria-controls="opps-panel"
              onClick={() => switchTab(x.id)}
              className={cn(
                'flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold shadow-sm transition-colors',
                active
                  ? 'border-blue bg-blue text-white shadow-md'
                  : 'border-border bg-white text-ink hover:border-blue/60',
              )}
            >
              <Icon className="size-4" aria-hidden />
              {t(`opps.tabs.${x.id}`)}
              <span
                className={cn(
                  'rounded-full px-1.5 text-xs tabular-nums',
                  active ? 'bg-white/20' : 'bg-sky-100 text-navy',
                )}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <div id="opps-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="space-y-5">
        <p className="text-sm text-ink-soft">{t(`opps.tabHint.${tab}`)}</p>
        <OpportunityFilters
          keys={config.filters}
          types={config.types}
          opps={inTab}
          value={filters}
          onChange={setFilters}
        />
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold text-ink-soft" aria-live="polite">
            {t('opps.count', { count: shown.length })}
          </p>
          {dirty && (
            <Button variant="ghost" size="sm" onClick={() => setFilters(NO_FILTERS)}>
              {t('common:clearFilters')}
            </Button>
          )}
        </div>

        {shown.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title={t('opps.empty.title')}
            body={t('opps.empty.body')}
            action={
              dirty ? (
                <Button className="rounded-full" onClick={() => setFilters(NO_FILTERS)}>
                  {t('common:clearFilters')}
                </Button>
              ) : undefined
            }
          />
        ) : (
          <Stagger
            key={`${tab}-${shown.length}`}
            className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {shown.map(({ opp, match }) => (
              <StaggerItem key={opp.id} className="h-full">
                <OpportunityCard
                  opp={opp}
                  match={match}
                  app={myApps.find((a) => a.opportunityId === opp.id)}
                />
              </StaggerItem>
            ))}
          </Stagger>
        )}

        <p className="flex items-start gap-2 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm text-ink-soft">
          <Info className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
          {t('opps.match.disclaimer')}
        </p>
      </div>
    </div>
  )
}
