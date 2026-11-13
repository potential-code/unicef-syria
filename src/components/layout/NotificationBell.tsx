import type { CourseId, OpportunityId } from '@shared/types'
import { useNavigate } from '@tanstack/react-router'
import { Bell, BellOff } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { COURSE_BY_ID } from '@/data/courses'
import { OPPORTUNITIES } from '@/data/opportunities'
import { PROGRAMMES } from '@/data/orgs'
import { formatDate, useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { markAllNoticesRead, markNoticeRead, useNotices } from '@/store/actions/notices'
import { usePersona } from '@/store/actions/session'
import type { InAppNotice } from '@/store/db'

/** In-app notifications for the signed-in profile (brief §16: simulated in-app only). */
export function NotificationBell() {
  const { t } = useTranslation()
  const { l, lang } = useLocalized()
  const navigate = useNavigate()
  const persona = usePersona()
  const to = persona ? (persona.role === 'youth' ? persona.youthId : persona.id) : undefined
  const notices = useNotices(to)
  if (!persona || !to) return null
  const unread = notices.filter((n) => !n.read).length

  const text = (n: InAppNotice) => {
    const p = n.params
    const programme = l(PROGRAMMES.find((x) => x.id === p.programme)?.name)
    const course = p.course ? l(COURSE_BY_ID[p.course as CourseId]?.title) : ''
    const opp = l(OPPORTUNITIES.find((o) => o.id === (p.opp as OpportunityId))?.title)
    return t(`notices.${n.kind}`, {
      ...p,
      programme,
      course,
      opp,
      status: p.status ? t(`notices.status.${p.status}`) : '',
      stage: p.stage ? t(`stages.${p.stage}`) : '',
      result: p.approved === 'true' ? t('notices.approved') : t('notices.returned'),
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={t('notices.title', { count: unread })}
        >
          <Bell className="size-5" aria-hidden />
          {unread > 0 && (
            <span className="absolute end-1 top-1 flex min-w-4 items-center justify-center rounded-full bg-orange px-1 text-[10px] font-bold text-white">
              {unread}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between gap-2 pe-1">
          <DropdownMenuLabel>{t('notices.heading')}</DropdownMenuLabel>
          {unread > 0 && (
            <button
              type="button"
              className="text-xs font-semibold text-blue hover:underline"
              onClick={() => markAllNoticesRead(to)}
            >
              {t('notices.markAll')}
            </button>
          )}
        </div>
        <DropdownMenuSeparator />
        {notices.length === 0 ? (
          <p className="flex items-center gap-2 px-3 py-6 text-sm text-ink-soft">
            <BellOff className="size-4" aria-hidden />
            {t('notices.empty')}
          </p>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {notices.slice(0, 20).map((n) => (
              <DropdownMenuItem
                key={n.id}
                onSelect={() => {
                  markNoticeRead(n.id)
                  if (n.link) void navigate({ to: n.link })
                }}
                className={cn('flex-col items-start gap-0.5 py-2.5', !n.read && 'bg-sky-50')}
              >
                <span className="flex w-full items-start gap-2 text-sm">
                  {!n.read && (
                    <span className="mt-1.5 size-2 shrink-0 rounded-full bg-blue" aria-hidden />
                  )}
                  <span className="min-w-0 flex-1 leading-snug">{text(n)}</span>
                </span>
                <span className="ps-4 text-xs text-ink-soft">{formatDate(n.at, lang)}</span>
              </DropdownMenuItem>
            ))}
          </div>
        )}
        <DropdownMenuSeparator />
        <p className="px-3 py-1.5 text-[11px] text-ink-soft">{t('notices.demoNote')}</p>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
