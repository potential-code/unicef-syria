import type { ReactNode } from 'react'
import { usePageTitle } from '@/hooks/use-page-title'

/** Calm branded header band for admin home pages: title, scope line and actions. */
export function AdminHero({
  eyebrow,
  title,
  body,
  actions,
  aside,
}: {
  eyebrow: string
  title: string
  body?: ReactNode
  actions?: ReactNode
  aside?: ReactNode
}) {
  usePageTitle(title)
  return (
    <header className="on-dark relative mb-6 overflow-hidden rounded-3xl bg-grad-unicef p-6 text-white shadow-md sm:p-8">
      <div
        className="pointer-events-none absolute -end-16 -top-20 size-64 rounded-full border-[28px] border-white/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 end-40 size-48 rounded-full bg-cyan/30 blur-2xl"
        aria-hidden
      />
      <div className="relative flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80">{eyebrow}</p>
          <h1 className="text-2xl text-white sm:text-4xl">{title}</h1>
          {body && <p className="text-white/85">{body}</p>}
          {actions && <div className="flex flex-wrap gap-2 pt-2">{actions}</div>}
        </div>
        {aside}
      </div>
    </header>
  )
}
