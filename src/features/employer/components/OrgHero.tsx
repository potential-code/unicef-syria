import { BadgeCheck, Building2, Clock } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
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
    <section className="on-dark relative mb-8 overflow-hidden rounded-3xl bg-grad-unicef p-6 text-white shadow-lg sm:p-8">
      <Motif variant="banner" className="text-white/[0.12]" />
      <div className="relative flex flex-wrap items-end justify-between gap-x-6 gap-y-5">
        <div className="min-w-0 flex-1 basis-80 space-y-2.5">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm text-white/85">
            <Building2 className="size-4" aria-hidden />
            <span className="font-semibold">{l(scope.org.name)}</span>
            <span aria-hidden>·</span>
            <span>{l(scope.org.sector)}</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/15 px-2.5 py-0.5 text-xs font-semibold text-white">
              {scope.approved ? (
                <BadgeCheck className="size-3.5" aria-hidden />
              ) : (
                <Clock className="size-3.5" aria-hidden />
              )}
              {scope.approved ? t('approval.approved') : t('approval.pending')}
            </span>
          </p>
          <h1 className="text-3xl leading-tight font-extrabold text-white sm:text-4xl">{title}</h1>
          {body && <p className="max-w-2xl text-white/85">{body}</p>}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
      </div>
    </section>
  )
}
