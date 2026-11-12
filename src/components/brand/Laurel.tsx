import type { CSSProperties } from 'react'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/utils'

/**
 * Laurel wreath and branch taken directly from the UNICEF emblem (globe removed). Rendered as a
 * CSS mask over `currentColor`, so it takes any text colour class. Decorative only.
 * Source: public/brand/motif/laurel-{wreath,branch}.webp, cut from the emblem Aliya provided.
 */
function masked(file: string, ratio: string, extra?: CSSProperties): CSSProperties {
  const url = `url("${asset(`brand/motif/${file}`)}")`
  return {
    aspectRatio: ratio,
    maskImage: url,
    WebkitMaskImage: url,
    maskSize: 'contain',
    WebkitMaskSize: 'contain',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskPosition: 'center',
    ...extra,
  }
}

/** One branch of the emblem wreath (the left half). `mirrored` gives the right-hand branch. */
export function LaurelBranch({
  className,
  mirrored = false,
}: {
  className?: string
  mirrored?: boolean
}) {
  return (
    <span
      aria-hidden
      className={cn('block bg-current', className)}
      style={masked(
        'laurel-branch.webp',
        '345 / 575',
        mirrored ? { transform: 'scaleX(-1)' } : undefined,
      )}
    />
  )
}

/** The full emblem wreath (both branches and the crossed stems). */
export function LaurelWreath({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn('block bg-current', className)}
      style={masked('laurel-wreath.webp', '690 / 575')}
    />
  )
}
