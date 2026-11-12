import { LaurelWreath } from '@/components/brand'
import { cn } from '@/lib/utils'

/** Subtle section divider: hairlines either side of a small emblem wreath. Decorative. */
export function LaurelDivider({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center gap-4', className)} aria-hidden>
      <span className="h-px w-full max-w-40 bg-linear-to-r from-transparent to-blue/20 rtl:bg-linear-to-l" />
      <LaurelWreath className="h-9 shrink-0 text-blue/25" />
      <span className="h-px w-full max-w-40 bg-linear-to-l from-transparent to-blue/20 rtl:bg-linear-to-r" />
    </div>
  )
}
