import { cn } from '@/lib/utils'

/** The emblem's globe grid: outline, meridians and parallels as fine strokes. Decorative. */
export function GlobeGrid({
  className,
  strokeWidth = 1.4,
}: {
  className?: string
  strokeWidth?: number
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn('block', className)}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    >
      <circle cx="60" cy="60" r="56" />
      <ellipse cx="60" cy="60" rx="20" ry="56" />
      <ellipse cx="60" cy="60" rx="40" ry="56" />
      <line x1="60" y1="4" x2="60" y2="116" />
      <path d="M 8 40 Q 60 30 112 40" />
      <path d="M 4 60 L 116 60" />
      <path d="M 8 80 Q 60 90 112 80" />
    </svg>
  )
}

/** Concentric rings, echoing the globe outline. Decorative. */
export function Rings({ className, count = 3 }: { className?: string; count?: number }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn('block', className)}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      {Array.from({ length: count }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static decorative geometry
        <circle key={i} cx="60" cy="60" r={56 - i * 14} />
      ))}
    </svg>
  )
}
