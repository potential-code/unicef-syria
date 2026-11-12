import { cn } from '@/lib/utils'
import { GlobeGrid, Rings } from './GlobeGrid'
import { LaurelBranch } from './Laurel'

export type MotifVariant = 'banner' | 'sidebar' | 'card' | 'auth' | 'corner'

/**
 * Brand motif layer: laurel branches and globe grid lines from the UNICEF emblem, plus rings.
 * Place inside a `relative overflow-hidden` container. Colour comes from `className`
 * (e.g. `text-white/15` on blue, `text-blue/10` on white). Always decorative.
 */
export function Motif({ variant, className }: { variant: MotifVariant; className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 select-none', className)} aria-hidden>
      {variant === 'banner' && (
        <>
          <GlobeGrid className="absolute -end-10 -top-16 size-72 opacity-70" strokeWidth={1.1} />
          <LaurelBranch className="absolute end-56 -bottom-8 h-40 w-auto opacity-80" mirrored />
          <Rings className="absolute -bottom-20 end-4 size-44 opacity-50" />
        </>
      )}
      {variant === 'sidebar' && (
        <>
          <GlobeGrid className="absolute -bottom-24 -start-20 size-72 opacity-60" strokeWidth={1} />
          <LaurelBranch className="absolute -end-4 bottom-10 h-44 w-auto opacity-80" mirrored />
        </>
      )}
      {variant === 'card' && (
        <>
          <LaurelBranch className="absolute -end-3 -bottom-4 h-28 w-auto" mirrored />
          <Rings className="absolute -end-10 -top-12 size-32 opacity-60" count={2} />
        </>
      )}
      {variant === 'corner' && (
        <LaurelBranch className="absolute -end-2 -bottom-3 h-20 w-auto" mirrored />
      )}
      {variant === 'auth' && (
        <>
          <GlobeGrid
            className="absolute -end-32 -top-32 size-[28rem] opacity-60"
            strokeWidth={0.8}
          />
          <LaurelBranch className="absolute -start-6 bottom-0 h-72 w-auto opacity-80" />
          <LaurelBranch className="absolute start-24 bottom-0 h-72 w-auto opacity-80" mirrored />
        </>
      )}
    </div>
  )
}
