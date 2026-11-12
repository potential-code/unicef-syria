import type { CentreId, PartnerId } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { Building2, ChevronRight, Globe2, MapPin, Network } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
import { ANALYTICS_ROWS } from '@/data/analytics'
import { CENTRES, COHORTS, PARTNERS } from '@/data/orgs'
import { filterRows, kpis, sumRows } from '@/domain/kpi'
import { type AdminFilters, toKpiFilters } from '../lib/filters'
import { useAdminFilters } from '../lib/useAdminFilters'
import { useLabels } from '../lib/useLabels'

/**
 * Oversight hierarchy (brief §18): UNICEF Syria → partners → centres. Governorate is a filter,
 * not an owner. Each node shows the historical registered count so parents equal their children.
 */
export function OrgTree({ filters }: { filters: AdminFilters }) {
  const { t } = useTranslation('admin')
  const { l, n, value } = useLabels()
  const { linkSearch } = useAdminFilters()
  const base = toKpiFilters({ ...filters, partnerId: undefined, centreId: undefined })
  const reg = (f: { partnerId?: PartnerId; centreId?: CentreId }) =>
    kpis(sumRows(filterRows(ANALYTICS_ROWS, { ...base, ...f }))).registered
  return (
    <div className="card p-4 sm:p-5">
      <div className="on-dark relative flex items-center gap-3 overflow-hidden rounded-2xl bg-navy p-4 text-white shadow-md">
        <Motif variant="corner" className="text-cyan/25" />
        <Globe2 className="relative size-5 shrink-0 text-cyan" aria-hidden />
        <div className="relative min-w-0 flex-1">
          <p className="font-semibold">{t('tree.unicef')}</p>
          <p className="text-xs text-white/80">{t('tree.unicefBody')}</p>
        </div>
        <p className="relative text-end">
          <span className="block text-2xl leading-none font-extrabold tabular-nums">
            {n(reg({}))}
          </span>
          <span className="text-xs text-white/80">{t('kpi.registered')}</span>
        </p>
      </div>
      <ul className="mt-3 grid items-start gap-4 lg:grid-cols-2">
        {PARTNERS.map((p) => (
          <li key={p.id} className="space-y-2">
            <Link
              to="/unicef/programmes"
              search={linkSearch({ partnerId: p.id })}
              className="card-hover group flex items-center gap-3 rounded-xl bg-blue-50 px-3 py-2.5 ring-1 ring-blue/15 hover:ring-blue/40 focus-visible:outline-2"
            >
              <Network className="size-4 shrink-0 text-blue" aria-hidden />
              <span className="min-w-0 flex-1 text-sm">
                <strong className="me-1.5 font-bold text-blue">{p.id}</strong>
                <span className="font-semibold text-ink">{l(p.name)}</span>
              </span>
              <span className="text-base font-bold text-navy tabular-nums">
                {n(reg({ partnerId: p.id }))}
              </span>
              <ChevronRight
                className="size-4 shrink-0 text-ink-soft rtl-mirror group-hover:text-blue"
                aria-hidden
              />
            </Link>
            <ul className="ms-3 space-y-1.5 border-s-2 border-sky-100 ps-3 sm:ms-5 sm:ps-4">
              {CENTRES.filter((c) => c.partnerId === p.id).map((c) => (
                <li key={c.id}>
                  <Link
                    to="/unicef/programmes"
                    search={linkSearch({ partnerId: p.id, centreId: c.id })}
                    className="group flex items-center gap-3 rounded-xl bg-white px-3 py-2 ring-1 ring-border/70 transition-colors hover:bg-sky-50 hover:ring-blue/30 focus-visible:outline-2"
                  >
                    <Building2 className="size-4 shrink-0 text-blue" aria-hidden />
                    <span className="min-w-0 flex-1 text-sm">
                      <span className="block">
                        <strong className="me-1.5 font-semibold text-ink-soft">{c.id}</strong>
                        <span className="font-medium text-ink">{l(c.name)}</span>
                      </span>
                      <span className="flex flex-wrap items-center gap-x-2 text-xs text-ink-soft">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="size-3" aria-hidden />
                          {value('governorate', c.governorate)}
                        </span>
                        <span>
                          {t('tree.cohorts', {
                            ids: COHORTS.filter((k) => k.centreId === c.id)
                              .map((k) => k.id)
                              .join(', '),
                          })}
                        </span>
                      </span>
                    </span>
                    <span className="text-sm font-semibold text-ink tabular-nums">
                      {n(reg({ centreId: c.id }))}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-ink-soft">{t('tree.note')}</p>
    </div>
  )
}
