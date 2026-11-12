import { Link } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from '@/hooks/use-page-title'

export interface Crumb {
  label: string
  to?: string
}

/** Page title, optional breadcrumbs (detail pages) and actions. Sets the document title. */
export function PageHeader({ title, description, crumbs, actions, eyebrow }: { title: string; description?: ReactNode; crumbs?: Crumb[]; actions?: ReactNode; eyebrow?: ReactNode }) {
  const { t } = useTranslation()
  usePageTitle(title)
  return (
    <header className="mb-6 flex flex-col gap-3 sm:mb-8">
      {crumbs && crumbs.length > 0 && (
        <nav aria-label={t('breadcrumb')}>
          <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-soft">
            {crumbs.map((c, i) => (
              <li key={`${c.label}-${i}`} className="flex items-center gap-1">
                {c.to ? <Link to={c.to} className="hover:text-blue hover:underline">{c.label}</Link> : <span aria-current="page" className="text-ink">{c.label}</span>}
                {i < crumbs.length - 1 && <ChevronRight className="size-3.5 rtl-mirror" aria-hidden />}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0 space-y-1.5">
          {eyebrow}
          <h1 className="text-2xl sm:text-3xl">{title}</h1>
          {description && <p className="max-w-3xl text-ink-soft">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
    </header>
  )
}
