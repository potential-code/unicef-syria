import { Link } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { Crumb } from '@/components/shared/PageHeader'
import { usePageTitle } from '@/hooks/use-page-title'
import { cn } from '@/lib/utils'

const TONES = {
  unicef: 'bg-grad-unicef text-white',
  sunrise: 'bg-grad-sunrise text-ink',
  navy: 'bg-navy text-white',
} as const

/**
 * Youth career-area page header: a bold colour block with CSS blobs and rings, an icon tile,
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
  children,
}: {
  title: string
  body?: ReactNode
  eyebrow?: ReactNode
  icon?: LucideIcon
  tone?: keyof typeof TONES
  crumbs?: Crumb[]
  actions?: ReactNode
  children?: ReactNode
}) {
  const { t } = useTranslation()
  usePageTitle(title)
  const dark = tone !== 'sunrise'
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
          'relative overflow-hidden rounded-3xl p-6 shadow-md sm:p-8',
          TONES[tone],
          dark && 'on-dark',
        )}
      >
        <div
          className="pointer-events-none absolute -end-16 -top-16 size-56 rounded-full bg-white/10"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -end-4 top-10 size-32 rounded-full border-[10px] border-white/15"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 start-1/3 size-44 rounded-full bg-yellow/20 blur-2xl"
          aria-hidden
        />
        <div className="relative flex flex-wrap items-end justify-between gap-5">
          <div className="flex min-w-0 items-start gap-4">
            {Icon && (
              <span
                className={cn(
                  'hidden size-14 shrink-0 items-center justify-center rounded-2xl sm:flex',
                  dark ? 'bg-white/15' : 'bg-white/60',
                )}
              >
                <Icon className="size-7" aria-hidden />
              </span>
            )}
            <div className="min-w-0 space-y-1.5">
              {eyebrow && (
                <div
                  className={cn(
                    'text-xs font-bold uppercase tracking-wide',
                    dark ? 'text-white/85' : 'text-ink/75',
                  )}
                >
                  {eyebrow}
                </div>
              )}
              <h1 className={cn('text-2xl sm:text-4xl', dark ? 'text-white' : 'text-ink')}>
                {title}
              </h1>
              {body && (
                <div className={cn('max-w-2xl', dark ? 'text-white/85' : 'text-ink/80')}>
                  {body}
                </div>
              )}
            </div>
          </div>
          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </div>
        {children && <div className="relative mt-5">{children}</div>}
      </div>
    </header>
  )
}
