import type { CareerRoute, OpportunityType, Youth } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Briefcase } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ORGANISATIONS } from '@/data/orgs'
import { formatDate, useLocalized } from '@/i18n'
import { useOpportunities } from '@/store/actions/applications'
import { CAREER_LINKS } from '../config'

const TYPES: Record<CareerRoute, OpportunityType[]> = {
  employment: ['job', 'internship', 'partTime'],
  enterprise: ['enterprise'],
  freelance: ['freelance', 'partTime'],
}

/** Relevant open opportunities for the selected route (no match scores, no hiring predictions). */
export function OpportunitiesCard({ youth }: { youth: Youth }) {
  const { t } = useTranslation('learn')
  const { l, lang } = useLocalized()
  const all = useOpportunities()
  const types = youth.route ? TYPES[youth.route] : null
  const list = all
    .filter((o) => o.status === 'open' && (!types || types.includes(o.type)))
    .slice(0, 2)

  return (
    <section className="card p-5 sm:p-6" aria-labelledby="dash-opps">
      <div className="flex items-center justify-between gap-3">
        <h2 id="dash-opps" className="flex min-w-0 flex-1 items-center gap-2 text-lg">
          <Briefcase className="size-5 shrink-0 text-orange" aria-hidden />
          {t('dash.opportunities')}
        </h2>
        <Link
          to={CAREER_LINKS.opportunities}
          className="shrink-0 text-sm font-semibold text-blue hover:underline"
        >
          {t('common:viewAll')}
        </Link>
      </div>
      {list.length === 0 ? (
        <p className="mt-4 text-sm text-ink-soft">{t('dash.noOpps')}</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {list.map((o) => (
            <li key={o.id}>
              <Link
                to={CAREER_LINKS.opportunities}
                className="card-hover flex min-h-12 items-start gap-3 rounded-xl border border-border/70 bg-white p-3 shadow-sm"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-bold tracking-wide text-blue">
                    {t(`common:oppTypes.${o.type}`)}
                  </span>
                  <span className="block text-sm font-semibold">{l(o.title)}</span>
                  <span className="block text-xs text-ink-soft">
                    {l(ORGANISATIONS.find((g) => g.id === o.orgId)?.name)} ·{' '}
                    {t('dash.deadline', { date: formatDate(o.deadline, lang) })}
                  </span>
                </span>
                <ArrowRight className="mt-1 size-4 text-blue rtl-mirror" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-3 text-xs text-ink-soft">{t('dash.oppsNote')}</p>
    </section>
  )
}
