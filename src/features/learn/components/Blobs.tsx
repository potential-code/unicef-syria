import { cn } from '@/lib/utils'

/** CSS illustration: soft blobs and rings for colour-block cards. Decorative only. */
export function Blobs({
  className,
  tone = 'light',
}: {
  className?: string
  tone?: 'light' | 'warm'
}) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      aria-hidden
    >
      <span
        className={cn(
          'absolute -end-16 -top-16 size-56 rounded-full blur-2xl',
          tone === 'warm' ? 'bg-yellow/40' : 'bg-cyan/40',
        )}
      />
      <span className="absolute -bottom-20 start-1/3 size-48 rounded-full bg-white/10" />
      <span className="absolute end-10 bottom-6 size-24 rounded-full border-[10px] border-white/15" />
      <span className="absolute start-6 top-6 size-3 rounded-full bg-yellow" />
    </div>
  )
}
