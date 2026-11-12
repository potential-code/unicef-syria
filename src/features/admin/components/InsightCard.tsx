import { Lightbulb } from 'lucide-react'
import type { ReactNode } from 'react'
import { Motif } from '@/components/brand'

/** One labour-market insight sentence with its follow-up actions. */
export function InsightCard({
  label,
  sentence,
  children,
  footer,
}: {
  label: string
  sentence: string
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <article className="on-dark relative flex flex-col gap-4 overflow-hidden rounded-3xl bg-navy p-6 text-white shadow-lg">
      <Motif variant="card" className="text-cyan/20" />
      <p className="relative flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/80">
        <Lightbulb className="size-4 text-yellow" aria-hidden />
        {label}
      </p>
      <p className="relative text-lg font-semibold leading-snug sm:text-xl">{sentence}</p>
      {footer && <p className="relative text-sm text-white/80">{footer}</p>}
      <div className="relative mt-auto flex flex-wrap gap-2">{children}</div>
    </article>
  )
}
