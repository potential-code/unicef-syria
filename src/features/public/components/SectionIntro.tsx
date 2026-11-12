import type { ReactNode } from 'react'
import { ScrollReveal } from '@/components/motion'
import { cn } from '@/lib/utils'

/**
 * Eyebrow, h2 and lead paragraph used by every public section (consistent, refined scale). The
 * three lines rise in one after another as the intro scrolls into view.
 */
export function SectionIntro({
  id,
  eyebrow,
  title,
  body,
  className,
}: {
  id: string
  eyebrow: string
  title: ReactNode
  body?: ReactNode
  className?: string
}) {
  return (
    <ScrollReveal className={cn('max-w-2xl', className)}>
      <p
        data-reveal
        className="mb-3 flex items-center gap-2 text-xs font-bold tracking-widest text-blue uppercase"
      >
        <span className="h-0.5 w-6 rounded-full bg-yellow" aria-hidden />
        {eyebrow}
      </p>
      <h2 data-reveal id={id} className="text-3xl sm:text-4xl lg:text-[2.625rem]">
        {title}
      </h2>
      {body && (
        <p data-reveal className="mt-4 text-lg leading-relaxed text-ink-soft">
          {body}
        </p>
      )}
    </ScrollReveal>
  )
}
