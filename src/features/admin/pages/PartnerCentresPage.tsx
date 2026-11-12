import { Link } from '@tanstack/react-router'
import { ArrowRight, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Stagger, StaggerItem } from '@/components/motion'
import { PageHeader } from '@/components/shared/PageHeader'
import { SmartImage } from '@/components/shared/SmartImage'
import { ANALYTICS_ROWS } from '@/data/analytics'
import { COHORTS } from '@/data/orgs'
import { filterRows, kpis, sumRows } from '@/domain/kpi'
import { useAllYouth } from '@/store/actions/youth'
import { ReportContext } from '../components/ReportContext'
import { toKpiFilters } from '../lib/filters'
import { useAdminFilters } from '../lib/useAdminFilters'
import { useLabels } from '../lib/useLabels'
import { useScope } from '../lib/useScope'

/** Centre directory for the partner network. Each card drills into that centre's programmes. */
export function PartnerCentresPage() {
  const { t } = useTranslation('admin')
  const { l, n, p, value, trainer, programme } = useLabels()
  const { centres } = useScope()
  const youth = Object.values(useAllYouth())
  const { filters, linkSearch } = useAdminFilters()
  return (
    <div className="space-y-6">
      <PageHeader
        title={t('partner.centres.title')}
        description={t('partner.centres.body')}
        crumbs={[
          { label: t('common:nav.partner.overview'), to: '/partner' },
          { label: t('common:nav.partner.centres') },
        ]}
      />
      <ReportContext />
      <Stagger className="grid gap-4 lg:grid-cols-2">
        {centres.map((c) => {
          const k = kpis(
            sumRows(filterRows(ANALYTICS_ROWS, { ...toKpiFilters(filters), centreId: c.id })),
          )
          const cohorts = COHORTS.filter((x) => x.centreId === c.id)
          return (
            <StaggerItem key={c.id}>
              <article className="lift flex h-full flex-col overflow-hidden rounded-3xl border bg-white shadow-sm">
                <SmartImage src={c.image} alt="" className="h-32 w-full" />
                <div className="flex flex-1 flex-col gap-4 p-5">
                  <div>
                    <p className="text-xs font-semibold text-blue">{c.id}</p>
                    <h2 className="text-xl">{l(c.name)}</h2>
                    <p className="mt-1 inline-flex items-center gap-1 text-sm text-ink-soft">
                      <MapPin className="size-4" aria-hidden />
                      {value('governorate', c.governorate)}
                    </p>
                  </div>
                  <dl className="grid grid-cols-3 gap-2 text-center">
                    {[
                      { k: 'registered', v: n(k.registered) },
                      { k: 'completion', v: p(k.completionRate.value) },
                      { k: 'uniquePlaced', v: n(k.uniquePlaced) },
                    ].map((s) => (
                      <div key={s.k} className="flex flex-col-reverse rounded-2xl bg-sky-50 p-2">
                        <dt className="text-[11px] leading-tight text-ink-soft">
                          {t(`kpi.${s.k}`)}
                        </dt>
                        <dd className="text-lg font-bold tabular-nums">{s.v}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="text-xs text-ink-soft">{t('partner.centres.sampleNote')}</p>
                  <ul className="space-y-2">
                    {cohorts.map((k2) => (
                      <li key={k2.id}>
                        <Link
                          to="/partner/programmes"
                          search={linkSearch({ centreId: c.id, programmeId: k2.programmeId })}
                          className="group flex min-h-11 items-center justify-between gap-2 rounded-2xl border px-4 py-2 hover:border-blue hover:bg-sky-50"
                        >
                          <span className="text-sm">
                            <strong>
                              {k2.programmeId} {programme(k2.programmeId)}
                            </strong>
                            <span className="block text-xs text-ink-soft">
                              {t('partner.centres.cohortLine', {
                                cohort: k2.id,
                                trainer: trainer(k2.trainerId),
                                count: youth.filter((y) => y.cohortIds.includes(k2.id)).length,
                              })}
                            </span>
                          </span>
                          <ArrowRight className="size-4 text-blue rtl-mirror" aria-hidden />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </StaggerItem>
          )
        })}
      </Stagger>
    </div>
  )
}
