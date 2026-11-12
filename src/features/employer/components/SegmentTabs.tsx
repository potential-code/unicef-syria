import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

/** Compact segmented filter tabs with optional counts (status queues, opportunity filters). */
export function SegmentTabs<T extends string>({
  value,
  onChange,
  items,
  label,
}: {
  value: T
  onChange: (v: T) => void
  items: { value: T; label: string; count?: number }[]
  label?: string
}) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as T)}>
      <TabsList
        aria-label={label}
        className="no-scrollbar h-auto max-w-full justify-start overflow-x-auto rounded-xl border border-border/70 bg-white p-1 shadow-sm"
      >
        {items.map((it) => (
          <TabsTrigger
            key={it.value}
            value={it.value}
            className="group h-8 flex-none rounded-lg px-3 text-ink-soft hover:text-navy data-[state=active]:bg-blue data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            {it.label}
            {it.count !== undefined && (
              <span className="rounded-full bg-sky-100 px-1.5 text-[11px] font-bold text-navy tabular-nums group-data-[state=active]:bg-white/20 group-data-[state=active]:text-white">
                {it.count}
              </span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
