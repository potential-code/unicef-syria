import type { CentreId } from '@shared/types'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { BarChart, ChartCard } from '@/components/charts'
import { ANALYTICS_ROWS } from '@/data/analytics'
import { filterRows, kpis, sumRows } from '@/domain/kpi'
import { ENTITY_COLOR } from '../lib/entities'
import { type AdminFilters, toKpiFilters } from '../lib/filters'
import { useLabels } from '../lib/useLabels'

/**
 * Compare centres on enrolment, completion and outcomes (historical sample). Three small
 * multiples, one measure each, so no chart mixes scales.
 */
export function CentreCompare({
  centreIds,
  filters,
}: {
  centreIds: CentreId[]
  filters: AdminFilters
}) {
  const { t } = useTranslation('admin')
  const { n, p } = useLabels()
  const per = useMemo(
    () =>
      centreIds.map((id) => {
        const k = kpis(
          sumRows(filterRows(ANALYTICS_ROWS, { ...toKpiFilters(filters), centreId: id })),
        )
        return { id, k }
      }),
    [centreIds, filters],
  )
  const label = (id: string) => id
  const measures = [
    {
      key: 'enrol',
      title: t('compare.enrolments'),
      sub: t('compare.enrolmentsSub'),
      fmt: n,
      val: (k: (typeof per)[number]['k']) => k.completionRate.denominator,
    },
    {
      key: 'compl',
      title: t('compare.completion'),
      sub: t('compare.completionSub'),
      fmt: (v: number) => p(v),
      val: (k: (typeof per)[number]['k']) => k.completionRate.value ?? 0,
      max: 100,
    },
    {
      key: 'placed',
      title: t('compare.placed'),
      sub: t('compare.placedSub'),
      fmt: n,
      val: (k: (typeof per)[number]['k']) => k.uniquePlaced,
    },
  ]
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {measures.map((m) => {
        const data = per.map(({ id, k }) => ({
          key: id,
          label: label(id),
          value: m.val(k),
          color: ENTITY_COLOR[id],
        }))
        return (
          <ChartCard
            key={m.key}
            title={m.title}
            subtitle={m.sub}
            table={{
              columns: [t('filters.centreId'), m.title],
              rows: data.map((d) => [d.label, m.fmt(d.value)]),
            }}
          >
            <BarChart
              data={data}
              layout="column"
              seriesLabel={m.title}
              format={m.fmt}
              domainMax={m.max}
              height={190}
            />
          </ChartCard>
        )
      })}
    </div>
  )
}
