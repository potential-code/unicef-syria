import type { ReactNode } from 'react'

export interface TooltipRow {
  key: string
  label: ReactNode
  value: ReactNode
  color: string
}

/** Tooltip body: the value leads, the series name follows, keyed by a short line of the colour. */
export function ChartTooltipBody({ title, rows }: { title?: ReactNode; rows: TooltipRow[] }) {
  if (!rows.length) return null
  return (
    <div className="min-w-36 rounded-xl border border-border/70 bg-white px-3 py-2 text-sm shadow-lg">
      {title && <p className="mb-1 text-xs font-medium text-ink-soft">{title}</p>}
      <ul className="space-y-1">
        {rows.map((r) => (
          <li key={r.key} className="flex items-center gap-2">
            <span
              className="h-0.5 w-3 shrink-0 rounded-full"
              style={{ background: r.color }}
              aria-hidden
            />
            <span className="font-semibold tabular-nums text-ink">{r.value}</span>
            <span className="text-ink-soft">{r.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
