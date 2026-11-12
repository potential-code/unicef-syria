import { cn } from '@/lib/utils'

/** Numbered step title in the booking journey. */
export function StepHeading({ n, title, dark }: { n: number; title: string; dark?: boolean }) {
  return (
    <h3 className={cn('mb-3 flex items-center gap-2 text-base', dark && 'text-white')}>
      <span
        className={cn(
          'flex size-7 items-center justify-center rounded-full text-sm font-bold',
          dark ? 'bg-yellow text-ink' : 'bg-blue text-white',
        )}
      >
        {n}
      </span>
      {title}
    </h3>
  )
}
