import type { AnalyticsRow } from '@shared/types'
import { CircleCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BarChart, CHART, ChartCard, DonutChart } from '@/components/charts'
import { breakdown, type FilterKey } from '@/domain/kpi'
import { ENTITY_COLOR, ORDER } from '../lib/entities'
import { useLabels } from '../lib/useLabels'

type Dim = 'ageGroup' | 'gender' | 'disability' | 'governorate'
type Metric = 'registered' | 'graduates' | 'active'

/** Participation by age, gender, disability (with Not disclosed) and governorate, plus route split. */
export function ParticipationCharts({
  rows,
  metric = 'registered',
  dims = ['ageGroup', 'gender', 'disability', 'governorate'],
  showRoute = true,
}: {
  rows: AnalyticsRow[]
  metric?: Metric
  dims?: Dim[]
  showRoute?: boolean
}) {
  const { t } = useTranslation('admin')
  const { n, value } = useLabels()
  const total = rows.reduce((a, r) => a + r[metric], 0)
  const series = (key: FilterKey & keyof typeof ORDER) => {
    const map = new Map(breakdown(rows, key, metric).map((b) => [String(b.key), b.value]))
    return (ORDER[key] as readonly string[])
      .filter((k) => map.has(k))
      .map((k) => ({
        key: k,
        label: value(key, k),
        value: map.get(k) ?? 0,
        color: key === 'ageGroup' ? CHART.primary : (ENTITY_COLOR[k] ?? CHART.neutral),
      }))
  }
  const metricLabel = t(`metric.${metric}`)
  const table = (data: { label: string; value: number }[]) => ({
    columns: [t('charts.group'), metricLabel, t('charts.share')],
    rows: data.map((d) => [
      d.label,
      n(d.value),
      `${total ? Math.round((d.value / total) * 1000) / 10 : 0}%`,
    ]),
  })
  const route = series('route')
  const gov = series('governorate')
  const govSum = gov.reduce((a, g) => a + g.value, 0)
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),1fr))] gap-3">
      {showRoute && (
        <ChartCard
          title={t('charts.route')}
          subtitle={t('charts.of', { metric: metricLabel, total: n(total) })}
          legend={route.map((r) => ({ key: r.key, label: r.label, color: r.color }))}
          table={table(route)}
        >
          <DonutChart segments={route} centreLabel={metricLabel} format={n} />
        </ChartCard>
      )}
      {dims.map((d) => {
        const data = series(d)
        return (
          <ChartCard
            key={d}
            title={t(`charts.by.${d}`)}
            subtitle={t('charts.of', { metric: metricLabel, total: n(total) })}
            table={table(data)}
            footer={
              d === 'governorate' ? (
                <span className="inline-flex items-center gap-1.5">
                  <CircleCheck className="size-3.5 text-success" aria-hidden />
                  {t('charts.reconciles', { sum: n(govSum), total: n(total) })}
                </span>
              ) : d === 'disability' ? (
                t('charts.disabilityNote')
              ) : undefined
            }
          >
            <BarChart data={data} seriesLabel={metricLabel} format={n} />
          </ChartCard>
        )
      })}
    </div>
  )
}
