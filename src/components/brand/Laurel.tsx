import { cn } from '@/lib/utils'

/**
 * Laurel branch from the UNICEF emblem's wreath (stem plus paired, tapering leaves). Pure SVG in
 * currentColor; decorative only. Geometry precomputed for a stable, crisp shape.
 */
const STEM = 'M 53.3 119.2 A 50 50 0 0 1 55.0 20.5'
const LEAF = 'M0 0 C 7 -5, 19 -6, 28 -1 C 19 4, 7 4, 0 0 Z'
const LEAVES = [
  'translate(53.3 119.2) rotate(156.0) scale(1.00)',
  'translate(45.7 117.3) rotate(233.0) scale(0.97)',
  'translate(38.5 114.1) rotate(174.0) scale(0.95)',
  'translate(31.9 109.9) rotate(251.0) scale(0.93)',
  'translate(26.0 104.7) rotate(192.0) scale(0.90)',
  'translate(21.0 98.7) rotate(269.0) scale(0.88)',
  'translate(17.1 91.9) rotate(210.0) scale(0.85)',
  'translate(14.2 84.6) rotate(287.0) scale(0.82)',
  'translate(12.5 77.0) rotate(228.0) scale(0.80)',
  'translate(12.0 69.1) rotate(305.0) scale(0.78)',
  'translate(12.8 61.3) rotate(246.0) scale(0.75)',
  'translate(14.7 53.7) rotate(323.0) scale(0.72)',
  'translate(17.9 46.5) rotate(264.0) scale(0.70)',
  'translate(22.1 39.9) rotate(341.0) scale(0.68)',
  'translate(27.3 34.0) rotate(282.0) scale(0.65)',
  'translate(33.3 29.0) rotate(359.0) scale(0.62)',
  'translate(40.1 25.1) rotate(300.0) scale(0.60)',
  'translate(47.4 22.2) rotate(377.0) scale(0.57)',
  'translate(55.0 20.5) rotate(352.0) scale(0.55)',
]

export function LaurelBranch({
  className,
  mirrored = false,
}: {
  className?: string
  mirrored?: boolean
}) {
  return (
    <svg
      viewBox="-8 4 84 130"
      className={cn('block overflow-visible', className)}
      aria-hidden
      fill="currentColor"
    >
      <g transform={mirrored ? 'translate(68 0) scale(-1 1)' : undefined}>
        <path d={STEM} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        {LEAVES.map((t) => (
          <path key={t} d={LEAF} transform={t} />
        ))}
      </g>
    </svg>
  )
}

/** Two mirrored branches, like the emblem wreath. */
export function LaurelWreath({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-end justify-center', className)} aria-hidden>
      <LaurelBranch className="h-full w-auto" />
      <LaurelBranch className="-ms-[18%] h-full w-auto" mirrored />
    </span>
  )
}
