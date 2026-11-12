import { Link } from '@tanstack/react-router'
import {
  Briefcase,
  Building2,
  CalendarClock,
  FileCheck2,
  Laptop,
  MapPin,
  SearchX,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/motion'
import { EmptyState } from '@/components/shared/EmptyState'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import { formatDate, useLocalized } from '@/i18n'
import { useApplications, useOpportunities } from '@/store/actions/applications'
import { useMyYouth } from '@/store/hooks'
import { CareerHero } from '../components/CareerHero'
import { LText } from '../components/LText'
import { ApplyPanel } from '../components/opportunities/ApplyPanel'
import { MatchPanel } from '../components/opportunities/MatchPanel'
import { orgOf } from '../config/opportunities'
import { explainMatch } from '../lib/match'

/** Y14 opportunity detail: requirements, match explanation and the application form. */
export function OpportunityDetailPage({ oppId }: { oppId: string }) {
  const { t } = useTranslation('career')
  const { l, lang } = useLocalized()
  const youth = useMyYouth()
  const opp = useOpportunities().find((o) => o.id === oppId)
  const app = useApplications().find((a) => a.youthId === youth.id && a.opportunityId === oppId)

  if (!opp) {
    return (
      <EmptyState
        icon={SearchX}
        title={t('opps.detail.notFoundTitle')}
        body={t('opps.detail.notFoundBody')}
        action={
          <Button asChild className="rounded-full">
            <Link to="/youth/opportunities">{t('opps.detail.back')}</Link>
          </Button>
        }
      />
    )
  }

  const org = orgOf(opp.orgId)
  const facts: { icon: typeof MapPin; label: string; value: string }[] = [
    { icon: Building2, label: t('opps.detail.organisation'), value: org ? l(org.name) : opp.orgId },
    { icon: MapPin, label: t('opps.detail.location'), value: l(opp.location) },
    { icon: Laptop, label: t('opps.detail.format'), value: t(`common:format.${opp.workFormat}`) },
    {
      icon: CalendarClock,
      label: t('opps.detail.deadline'),
      value: formatDate(opp.deadline, lang),
    },
  ]

  return (
    <div>
      <CareerHero
        icon={Briefcase}
        tone={opp.type === 'enterprise' ? 'navy' : 'unicef'}
        crumbs={[{ label: t('opps.title'), to: '/youth/opportunities' }, { label: l(opp.title) }]}
        eyebrow={
          <span className="flex flex-wrap items-center gap-2">
            {t(`common:oppTypes.${opp.type}`)}
            <StatusBadge tone={opp.status === 'open' ? 'success' : 'neutral'}>
              {opp.status === 'open' ? t('opps.open') : t('opps.closed')}
            </StatusBadge>
          </span>
        }
        title={l(opp.title)}
        body={org ? l(org.name) : undefined}
      >
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="rounded-2xl bg-white/15 p-3">
              <dt className="flex items-center gap-1.5 text-xs font-semibold text-white/85">
                <f.icon className="size-3.5" aria-hidden />
                {f.label}
              </dt>
              <dd className="mt-0.5 font-bold text-white">{f.value}</dd>
            </div>
          ))}
        </dl>
      </CareerHero>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_26rem]">
        <div className="space-y-6">
          <Reveal className="space-y-5 rounded-2xl border bg-white p-5 shadow-sm">
            <section>
              <h2 className="mb-2 text-lg">{t('opps.detail.about')}</h2>
              <p>
                <LText value={opp.description} />
              </p>
              {org && <p className="mt-2 text-sm text-ink-soft">{l(org.description)}</p>}
            </section>
            <section>
              <h2 className="mb-2 text-lg">{t('opps.detail.skills')}</h2>
              <ul className="flex flex-wrap gap-2">
                {opp.skills.map((s) => (
                  <li
                    key={s.en}
                    className="rounded-full bg-sky-100 px-3 py-1.5 text-sm font-semibold text-navy"
                  >
                    {l(s)}
                  </li>
                ))}
              </ul>
            </section>
            <section className="flex items-start gap-3 rounded-xl bg-yellow/15 p-4">
              <FileCheck2 className="mt-0.5 size-5 shrink-0 text-ink" aria-hidden />
              <div>
                <h2 className="text-base">{t('opps.detail.evidence')}</h2>
                <p className="text-sm">{l(opp.evidence)}</p>
              </div>
            </section>
            {(opp.type === 'enterprise' || opp.type === 'freelance') && (
              <p className="text-sm text-ink-soft">{t(`opps.detail.note.${opp.type}`)}</p>
            )}
          </Reveal>
          <Reveal>
            <MatchPanel match={explainMatch(youth, opp)} />
          </Reveal>
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ApplyPanel youth={youth} opp={opp} app={app} />
        </div>
      </div>
    </div>
  )
}
