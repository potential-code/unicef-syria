import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { inkOn } from './palette'

export interface Segment {
  key: string
  label: string
  value: number
  color: string
}

/**
 * One whole split into parts: a segmented bar with 2px surface gaps. Each segment is focusable
 * and carries its own tooltip; labels sit inside only when the segment is wide enough.
 */
export function StackedBar({
  segments,
  total,
  format = (n) => String(n),
  ariaLabel,
  height = 'h-7',
}: {
  segments: Segment[]
  total?: number
  format?: (n: number) => string
  ariaLabel: string
  height?: string
}) {
  const sum = total ?? segments.reduce((a, s) => a + s.value, 0)
  if (sum <= 0)
    return (
      <div className={`${height} w-full rounded-md bg-muted`} role="img" aria-label={ariaLabel} />
    )
  return (
    <div className={`flex w-full gap-0.5 ${height}`} role="img" aria-label={ariaLabel}>
      {segments
        .filter((s) => s.value > 0)
        .map((s, i, arr) => {
          const share = (s.value / sum) * 100
          return (
            <Tooltip key={s.key}>
              <TooltipTrigger asChild>
                <span
                  // biome-ignore lint/a11y/noNoninteractiveTabindex: segment exposes its tooltip on keyboard focus
                  tabIndex={0}
                  className={`flex min-w-1 items-center justify-center overflow-hidden text-[11px] font-semibold outline-offset-2 transition-[filter] hover:brightness-110 focus-visible:outline-2 ${i === 0 ? 'rounded-s-md' : ''} ${i === arr.length - 1 ? 'rounded-e-md' : ''}`}
                  style={{ width: `${share}%`, background: s.color, color: inkOn(s.color) }}
                >
                  {share >= 12 ? format(s.value) : null}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <span className="font-semibold tabular-nums">{format(s.value)}</span> {s.label}
              </TooltipContent>
            </Tooltip>
          )
        })}
    </div>
  )
}
