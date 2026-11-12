import type { CentreId, PartnerId } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { Building2, Globe2, MapPin, Network } from 'lucide-react'
import { useTranslation } from 'react-i18next'
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
    <div className="rounded-3xl border bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3 rounded-2xl bg-navy p-4 text-white">
        <Globe2 className="size-6" aria-hidden />
        <div className="flex-1">
          <p className="font-semibold">{t('tree.unicef')}</p>
          <p className="text-xs text-white/80">{t('tree.unicefBody')}</p>
        </div>
        <p className="text-end">
          <span className="block text-2xl font-bold tabular-nums">{n(reg({}))}</span>
          <span className="text-xs text-white/80">{t('kpi.registered')}</span>
        </p>
      </div>
      <ul className="mt-3 space-y-3 border-s-2 border-sky-200 ps-4 sm:ms-6">
        {PARTNERS.map((p) => (
          <li key={p.id} className="space-y-2">
            <Link
              to="/unicef/programmes"
              search={linkSearch({ partnerId: p.id })}
              className="flex items-center gap-3 rounded-2xl border bg-sky-50 p-3 hover:border-blue"
            >
              <Network className="size-5 text-blue" aria-hidden />
              <span className="flex-1">
                <strong>{p.id}</strong> {l(p.name)}
              </span>
              <span className="text-end text-sm tabular-nums">
                <strong>{n(reg({ partnerId: p.id }))}</strong>
              </span>
            </Link>
            <ul className="space-y-2 border-s-2 border-sky-100 ps-4 sm:ms-6">
              {CENTRES.filter((c) => c.partnerId === p.id).map((c) => (
                <li key={c.id}>
                  <Link
                    to="/unicef/programmes"
                    search={linkSearch({ partnerId: p.id, centreId: c.id })}
                    className="flex flex-wrap items-center gap-3 rounded-2xl border p-3 hover:border-blue hover:bg-sky-50"
                  >
                    <Building2 className="size-5 text-blue" aria-hidden />
                    <span className="min-w-0 flex-1">
                      <strong>{c.id}</strong> {l(c.name)}
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
                    <span className="text-sm tabular-nums">{n(reg({ centreId: c.id }))}</span>
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
