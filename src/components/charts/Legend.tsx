export interface LegendItem {
  key: string
  label: string
  color: string
  shape?: 'rect' | 'line'
}

/** Legend for two or more series: identity is never colour alone. */
export function ChartLegend({ items }: { items: LegendItem[] }) {
  if (items.length < 2) return null
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-soft">
      {items.map((i) => (
        <li key={i.key} className="flex items-center gap-1.5">
          <span
            className={i.shape === 'line' ? 'h-0.5 w-3.5 rounded-full' : 'size-2.5 rounded-[3px]'}
            style={{ background: i.color }}
            aria-hidden
          />
          {i.label}
        </li>
      ))}
    </ul>
  )
}
