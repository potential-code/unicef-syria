import type { Role } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { NAV } from '@/config/nav'
import { cn } from '@/lib/utils'

export function SideNav({ role, onNavigate }: { role: Role; onNavigate?: () => void }) {
  const { t } = useTranslation()
  return (
    <nav aria-label={t('menu')}>
      <ul className="flex flex-col gap-0.5">
        {NAV[role].map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              activeOptions={{ exact: !!item.exact }}
              onClick={onNavigate}
              className={cn(
                'group flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white',
                'data-[status=active]:bg-white data-[status=active]:font-semibold data-[status=active]:text-navy data-[status=active]:shadow-md',
              )}
            >
              <item.icon className="size-[18px] shrink-0" aria-hidden />
              <span className="truncate">{t(`nav.${role}.${item.key}`)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
