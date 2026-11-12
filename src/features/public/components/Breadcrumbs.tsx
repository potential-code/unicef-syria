import { Link } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function Breadcrumbs({
  items,
}: {
  items: { label: string; to?: '/' | '/explore' | '/opportunities' }[]
}) {
  const { t } = useTranslation()
  return (
    <nav aria-label={t('breadcrumb')} className="mb-4 text-xs text-white/85">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="size-3.5 rtl-mirror" aria-hidden />}
            {it.to ? (
              <Link to={it.to} className="font-semibold hover:underline">
                {it.label}
              </Link>
            ) : (
              <span aria-current="page">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
