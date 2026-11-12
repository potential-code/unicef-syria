import type { ReactNode } from 'react'
import { Motif } from '@/components/brand'
import { usePageTitle } from '@/hooks/use-page-title'

/** Calm branded banner for admin home pages: title, scope line and actions. */
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
    <header className="on-dark relative overflow-hidden rounded-3xl bg-grad-unicef p-6 text-white shadow-lg sm:p-8">
      <Motif variant="banner" className="text-white/[0.12]" />
      <div className="relative flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold tracking-wider text-white/80 uppercase">{eyebrow}</p>
          <h1 className="text-2xl text-white sm:text-3xl">{title}</h1>
          {body && <p className="text-sm text-white/85 sm:text-base">{body}</p>}
          {actions && <div className="flex flex-wrap gap-2 pt-3">{actions}</div>}
        </div>
        {aside}
      </div>
    </header>
  )
}
