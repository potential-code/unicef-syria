import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { ChartTooltipBody } from './ChartTooltip'
import type { Segment } from './StackedBar'

interface HoverPayload {
  payload?: Segment
}

/** Part-to-whole for three to five categories, with the total in the centre. */
export function DonutChart({
  segments,
  centreLabel,
  format = (n) => String(n),
  size = 180,
}: {
  segments: Segment[]
  centreLabel: string
  format?: (n: number) => string
  size?: number
}) {
  const total = segments.reduce((a, s) => a + s.value, 0)
  const tooltip = ({
    active,
    payload,
  }: {
    active?: boolean
    payload?: readonly HoverPayload[]
  }) => {
    const s = active ? payload?.[0]?.payload : undefined
    if (!s) return null
    const share = total ? Math.round((s.value / total) * 1000) / 10 : 0
    return (
      <ChartTooltipBody
        rows={[
          { key: s.key, label: `${s.label} (${share}%)`, value: format(s.value), color: s.color },
        ]}
      />
    )
  }
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }} dir="ltr">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={segments}
            dataKey="value"
            nameKey="label"
            innerRadius="64%"
            outerRadius="100%"
            paddingAngle={1.5}
            stroke="#ffffff"
            strokeWidth={2}
            isAnimationActive={false}
          >
            {segments.map((s) => (
              <Cell key={s.key} fill={s.color} />
            ))}
          </Pie>
          <Tooltip content={tooltip} />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold tabular-nums text-ink">{format(total)}</span>
        <span className="max-w-[60%] text-[11px] leading-tight text-ink-soft">{centreLabel}</span>
      </div>
    </div>
  )
}
