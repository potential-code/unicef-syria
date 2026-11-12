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
import { MiniStats } from '../components/MiniStats'
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
      <Stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,22rem),1fr))] gap-4">
        {centres.map((c) => {
          const k = kpis(
            sumRows(filterRows(ANALYTICS_ROWS, { ...toKpiFilters(filters), centreId: c.id })),
          )
          const cohorts = COHORTS.filter((x) => x.centreId === c.id)
          return (
            <StaggerItem key={c.id}>
              <article className="card flex h-full flex-col overflow-hidden">
                <SmartImage src={c.image} alt="" className="h-32 w-full" />
                <div className="flex flex-1 flex-col gap-4 p-5">
                  <div>
                    <p className="text-xs font-semibold text-blue">{c.id}</p>
                    <h2 className="text-lg">{l(c.name)}</h2>
                    <p className="mt-1 inline-flex items-center gap-1 text-sm text-ink-soft">
                      <MapPin className="size-4" aria-hidden />
                      {value('governorate', c.governorate)}
                    </p>
                  </div>
                  <MiniStats
                    tones={['navy', 'sky', 'navy']}
                    items={[
                      { key: 'registered', v: n(k.registered) },
                      { key: 'completion', v: p(k.completionRate.value) },
                      { key: 'uniquePlaced', v: n(k.uniquePlaced) },
                    ].map((s) => ({ key: s.key, label: t(`kpi.${s.key}`), value: s.v }))}
                  />
                  <p className="text-xs text-ink-soft">{t('partner.centres.sampleNote')}</p>
                  <ul className="space-y-2">
                    {cohorts.map((k2) => (
                      <li key={k2.id}>
                        <Link
                          to="/partner/programmes"
                          search={linkSearch({ centreId: c.id, programmeId: k2.programmeId })}
                          className="group flex min-h-11 items-center justify-between gap-2 rounded-xl bg-white px-3 py-2 shadow-xs ring-1 ring-border/70 transition-colors hover:bg-sky-50 hover:ring-blue/40"
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
