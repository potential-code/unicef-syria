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
    <section aria-labelledby={id} className="rounded-3xl border bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-blue">
          <Icon className="size-5" aria-hidden />
        </span>
        <div>
          <h2 id={id} className="text-lg">
            {title}
          </h2>
          {intro && <p className="text-sm text-ink-soft">{intro}</p>}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  )
}
