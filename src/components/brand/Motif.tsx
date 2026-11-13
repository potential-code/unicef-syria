import { cn } from '@/lib/utils'
import { GlobeGrid } from './GlobeGrid'
import { LaurelWreath } from './Laurel'

export type MotifVariant = 'banner' | 'sidebar' | 'card' | 'auth' | 'corner'

/**
 * The emblem composition: globe grid sitting inside the full laurel wreath, the way the UNICEF
 * emblem draws it. Size it with a height (or width) class; the aspect ratio follows the wreath.
 * Globe placement matches the wreath opening in public/brand/motif/laurel-wreath.webp.
 */
export function Emblem({
  className,
  strokeWidth = 1.2,
}: {
  className?: string
  strokeWidth?: number
}) {
  return (
    <span aria-hidden className={cn('block aspect-[690/575]', className)}>
      <span className="relative block size-full">
        <LaurelWreath className="absolute inset-0 size-full" />
        <GlobeGrid
          className="absolute start-[21%] top-[10%] h-auto w-[58%]"
          strokeWidth={strokeWidth}
        />
      </span>
    </span>
  )
}

/**
 * Brand motif layer: the laurel wreath and globe grid from the UNICEF emblem, always shown whole
 * (never cropped at an edge). Place inside a `relative overflow-hidden` container. Colour comes
 * from `className` (e.g. `text-white/15` on blue, `text-blue/10` on white). Always decorative.
 */
export function Motif({ variant, className }: { variant: MotifVariant; className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 select-none', className)} aria-hidden>
      {variant === 'banner' && (
        <Emblem className="absolute end-8 top-1/2 h-44 -translate-y-1/2" strokeWidth={1.1} />
      )}
      {variant === 'sidebar' && (
        <Emblem className="absolute start-1/2 bottom-16 w-48 -translate-x-1/2 rtl:translate-x-1/2" />
      )}
      {variant === 'card' && <LaurelWreath className="absolute end-4 bottom-4 h-20" />}
      {variant === 'corner' && <LaurelWreath className="absolute end-3 bottom-3 h-14" />}
      {variant === 'auth' && (
        <Emblem className="absolute end-10 top-20 h-[20rem]" strokeWidth={0.9} />
      )}
    </div>
  )
}
