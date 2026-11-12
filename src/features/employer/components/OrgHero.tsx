import { BadgeCheck, Building2, Clock } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from '@/hooks/use-page-title'
import { useLocalized } from '@/i18n'
import type { OrgScope } from '../hooks/use-org-scope'

/** Calm branded banner: own organisation, sector and approval state. */
export function OrgHero({
  scope,
  title,
  body,
  actions,
}: {
  scope: OrgScope
  title: string
  body?: string
  actions?: ReactNode
}) {
  const { t } = useTranslation('employer')
  const { l } = useLocalized()
  usePageTitle(title)
  return (
    <section className="on-dark relative mb-6 overflow-hidden rounded-2xl bg-grad-unicef p-5 text-white shadow-md sm:p-7">
      <div
        className="pointer-events-none absolute -end-16 -top-20 size-64 rounded-full border-[28px] border-white/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 end-24 size-48 rounded-full bg-cyan/30 blur-2xl"
        aria-hidden
      />
      <div className="relative flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0 space-y-2">
          <p className="flex flex-wrap items-center gap-2 text-sm text-white/85">
            <Building2 className="size-4" aria-hidden />
            <span className="font-semibold">{l(scope.org.name)}</span>
            <span aria-hidden>·</span>
            <span>{l(scope.org.sector)}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-semibold">
              {scope.approved ? (
                <BadgeCheck className="size-3.5" aria-hidden />
              ) : (
                <Clock className="size-3.5" aria-hidden />
              )}
              {scope.approved ? t('approval.approved') : t('approval.pending')}
            </span>
          </p>
          <h1 className="text-2xl text-white sm:text-3xl">{title}</h1>
          {body && <p className="max-w-2xl text-white/85">{body}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
    </section>
  )
}
