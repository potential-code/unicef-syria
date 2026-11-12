import {
  Bar,
  CartesianGrid,
  Cell,
  LabelList,
  BarChart as RBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useLocalized } from '@/i18n'
import { ChartTooltipBody } from './ChartTooltip'
import { AXIS_TICK, CHART } from './palette'

export interface BarDatum {
  key: string
  label: string
  value: number
  /** Fixed entity colour; defaults to the chart colour. */
  color?: string
  /** Extra line for the tooltip, e.g. "of 400 graduates". */
  note?: string
}

interface HoverPayload {
  payload?: BarDatum
}

/**
 * Bar chart wrapper. `bar` = horizontal bars for categories (labels read easily, value at the
 * tip); `column` = vertical columns for short ordered categories. Thin marks (max 24px), 4px
 * rounded data end, square at the baseline. Mirrors in Arabic.
 */
export function BarChart({
  data,
  layout = 'bar',
  color = CHART.primary,
  format = (n) => String(n),
  seriesLabel,
  height,
  domainMax,
}: {
  data: BarDatum[]
  layout?: 'bar' | 'column'
  color?: string
  format?: (n: number) => string
  seriesLabel: string
  height?: number
  domainMax?: number
}) {
  const { dir } = useLocalized()
  const rtl = dir === 'rtl'
  const horizontal = layout === 'bar'
  const h = height ?? (horizontal ? Math.max(120, data.length * 40 + 16) : 220)
  const longest = Math.max(...data.map((d) => d.label.length), 4)
  const labelWidth = Math.min(190, Math.max(72, longest * 7.5 + 16))
  const tooltip = ({
    active,
    payload,
  }: {
    active?: boolean
    payload?: readonly HoverPayload[]
  }) => {
    const d = active ? payload?.[0]?.payload : undefined
    if (!d) return null
    return (
      <ChartTooltipBody
        title={d.label}
        rows={[
          {
            key: d.key,
            label: d.note ?? seriesLabel,
            value: format(d.value),
            color: d.color ?? color,
          },
        ]}
      />
    )
  }
  return (
    <div style={{ height: h }} className="w-full" dir="ltr">
      <ResponsiveContainer width="100%" height="100%">
        <RBarChart
          data={data}
          layout={horizontal ? 'vertical' : 'horizontal'}
          margin={
            horizontal
              ? { top: 0, right: rtl ? 8 : 48, left: rtl ? 48 : 8, bottom: 0 }
              : { top: 24, right: 8, left: 8, bottom: 0 }
          }
          barCategoryGap={horizontal ? 10 : '28%'}
        >
          {!horizontal && <CartesianGrid vertical={false} stroke={CHART.grid} />}
          {horizontal ? (
            <>
              <XAxis type="number" hide reversed={rtl} domain={[0, domainMax ?? 'auto']} />
              <YAxis
                type="category"
                dataKey="label"
                width={labelWidth}
                orientation={rtl ? 'right' : 'left'}
                tick={AXIS_TICK}
                tickLine={false}
                axisLine={false}
              />
            </>
          ) : (
            <>
              <XAxis
                dataKey="label"
                reversed={rtl}
                tick={AXIS_TICK}
                tickLine={false}
                axisLine={{ stroke: CHART.grid }}
                interval={0}
              />
              <YAxis hide domain={[0, domainMax ?? 'auto']} />
            </>
          )}
          <Tooltip cursor={{ fill: 'var(--unicef-sky-50)' }} content={tooltip} />
          <Bar
            dataKey="value"
            name={seriesLabel}
            maxBarSize={24}
            radius={horizontal ? (rtl ? [4, 0, 0, 4] : [0, 4, 4, 0]) : [4, 4, 0, 0]}
            isAnimationActive={false}
          >
            {data.map((d) => (
              <Cell key={d.key} fill={d.color ?? color} />
            ))}
            <LabelList
              dataKey="value"
              position={horizontal ? (rtl ? 'left' : 'right') : 'top'}
              formatter={(v: unknown) => format(Number(v))}
              style={{ fill: 'var(--unicef-ink)', fontSize: 12, fontWeight: 600 }}
            />
          </Bar>
        </RBarChart>
      </ResponsiveContainer>
    </div>
  )
}
