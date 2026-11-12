import { Link } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
import type { Crumb } from '@/components/shared/PageHeader'
import { usePageTitle } from '@/hooks/use-page-title'
import { cn } from '@/lib/utils'

const TONES = {
  unicef: 'bg-grad-unicef text-white',
  sunrise: 'bg-grad-unicef text-white',
  navy: 'bg-[linear-gradient(135deg,var(--unicef-navy),#002a73)] text-white',
} as const

/**
 * Youth career-area page header: a bold brand colour block with the emblem motif, an inline icon,
 * optional breadcrumbs and actions. Sets the document title.
 */
export function CareerHero({
  title,
  body,
  eyebrow,
  icon: Icon,
  tone = 'unicef',
  crumbs,
  actions,
  leading,
  children,
}: {
  title: string
  body?: ReactNode
  eyebrow?: ReactNode
  icon?: LucideIcon
  tone?: keyof typeof TONES
  crumbs?: Crumb[]
  actions?: ReactNode
  /** Optional identity element beside the title (e.g. a coach avatar). */
  leading?: ReactNode
  children?: ReactNode
}) {
  const { t } = useTranslation()
  usePageTitle(title)
  return (
    <header className="mb-6 sm:mb-8">
      {crumbs && crumbs.length > 0 && (
        <nav aria-label={t('common:breadcrumb')} className="mb-3">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-soft">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1">
                {c.to ? (
                  <Link to={c.to} className="hover:text-blue hover:underline">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink">
                    {c.label}
                  </span>
                )}
                {i < crumbs.length - 1 && (
                  <ChevronRight className="size-3.5 rtl-mirror" aria-hidden />
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div
        className={cn(
          'relative overflow-hidden rounded-3xl p-6 shadow-lg sm:p-8',
          TONES[tone],
          'on-dark',
        )}
      >
        <Motif
          variant="banner"
          className={tone === 'navy' ? 'text-cyan/20' : 'text-white/[0.13]'}
        />
        <div className="relative flex flex-wrap items-end justify-between gap-5">
          <div className="flex min-w-0 items-center gap-4 sm:gap-5">
            {leading}
            <div className="min-w-0 space-y-1.5">
              {(eyebrow || Icon) && (
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/85">
                  {Icon && <Icon className="size-4 shrink-0" aria-hidden />}
                  {eyebrow}
                </div>
              )}
              <h1 className="text-2xl text-white sm:text-[2.15rem] sm:leading-tight">{title}</h1>
              {body && <div className="max-w-2xl text-white/85">{body}</div>}
            </div>
          </div>
          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </div>
        {children && <div className="relative mt-5">{children}</div>}
      </div>
    </header>
  )
}
