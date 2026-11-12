import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { useId } from 'react'

/** One group of profile fields (Account, Background, Interests, Support, Permissions). */
export function FormSection({
  icon: Icon,
  title,
  intro,
  children,
}: {
  icon: LucideIcon
  title: string
  intro?: string
  children: ReactNode
}) {
  const id = useId()
  return (
    <section aria-labelledby={id} className="card rounded-3xl p-5 sm:p-6">
      <div className="mb-4 border-b border-border/70 pb-3">
        <div>
          <h2 id={id} className="flex items-center gap-2 text-lg">
            <Icon className="size-5 shrink-0 text-blue" aria-hidden />
            {title}
          </h2>
          {intro && <p className="mt-0.5 text-sm text-ink-soft">{intro}</p>}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  )
}
