import { asset } from '@/lib/asset'
import { cn } from '@/lib/utils'

/** UNICEF logo: blue (provided) on light surfaces, white (public site) on dark. */
export function Logo({ variant = 'blue', className }: { variant?: 'blue' | 'white'; className?: string }) {
  return (
    <img
      src={asset(variant === 'blue' ? 'brand/unicef-logo-blue.png' : 'brand/unicef-logo-white.webp')}
      alt="UNICEF for every child"
      className={cn('h-7 w-auto select-none', className)}
      draggable={false}
    />
  )
}
