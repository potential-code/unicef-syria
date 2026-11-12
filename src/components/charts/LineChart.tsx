import {
  CartesianGrid,
  Line,
  ResponsiveContainer,
  LineChart as RLineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useLocalized } from '@/i18n'
import { ChartTooltipBody } from './ChartTooltip'
import { AXIS_TICK, CHART } from './palette'

export interface LinePoint {
  x: string
  label: string
  value: number
}

interface HoverPayload {
  payload?: LinePoint
}

/** One series over time: 2px line, ringed end markers, crosshair tooltip, value at the end. */
export function LineChart({
  data,
  seriesLabel,
  color = CHART.primary,
  height = 200,
}: {
  data: LinePoint[]
  seriesLabel: string
  color?: string
  height?: number
}) {
  const { dir } = useLocalized()
  const rtl = dir === 'rtl'
  const last = data.length - 1
  const tooltip = ({
    active,
    payload,
  }: {
    active?: boolean
    payload?: readonly HoverPayload[]
  }) => {
    const p = active ? payload?.[0]?.payload : undefined
    if (!p) return null
    return (
      <ChartTooltipBody
        title={p.label}
        rows={[{ key: p.x, label: seriesLabel, value: p.value, color }]}
      />
    )
  }
  return (
    <div style={{ height }} className="w-full" dir="ltr">
      <ResponsiveContainer width="100%" height="100%">
        <RLineChart data={data} margin={{ top: 20, right: 24, left: 24, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={CHART.grid} />
          <XAxis
            dataKey="label"
            reversed={rtl}
            tick={AXIS_TICK}
            tickLine={false}
            axisLine={{ stroke: CHART.grid }}
          />
          <YAxis
            orientation={rtl ? 'right' : 'left'}
            tick={AXIS_TICK}
            tickLine={false}
            axisLine={false}
            width={28}
            allowDecimals={false}
          />
          <Tooltip cursor={{ stroke: CHART.axis, strokeWidth: 1 }} content={tooltip} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            isAnimationActive={false}
            dot={{ r: 4, fill: color, stroke: '#ffffff', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: color, stroke: '#ffffff', strokeWidth: 2 }}
            label={({
              x,
              y,
              index,
              value,
            }: {
              x?: unknown
              y?: unknown
              index?: number
              value?: unknown
            }) =>
              index === last ? (
                <text
                  key="end"
                  x={Number(x)}
                  y={Number(y) - 10}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight={600}
                  fill="var(--unicef-ink)"
                >
                  {String(value ?? '')}
                </text>
              ) : (
                <g key={`l${index}`} />
              )
            }
          />
        </RLineChart>
      </ResponsiveContainer>
    </div>
  )
}
