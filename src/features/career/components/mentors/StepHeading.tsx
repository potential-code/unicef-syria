import { cn } from '@/lib/utils'

/** Numbered step title in the booking journey: a quiet step number, then the title. */
export function StepHeading({ n, title, dark }: { n: number; title: string; dark?: boolean }) {
  return (
    <h3 className={cn('mb-3 flex items-baseline gap-2.5 text-base', dark && 'text-white')}>
      <span
        className={cn('text-sm font-extrabold tabular-nums', dark ? 'text-yellow' : 'text-blue')}
      >
        {String(n).padStart(2, '0')}
      </span>
      {title}
    </h3>
  )
}
