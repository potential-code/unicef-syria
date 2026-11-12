import type { Session } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { Building2, ChevronRight, Video } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { formatDate, formatTime, useLocalized } from '@/i18n'

/** One session line: date block, title, time and format; opens the attendance register. */
export function SessionRow({ session, meta }: { session: Session; meta?: ReactNode }) {
  const { t } = useTranslation('trainer')
  const { l, lang } = useLocalized()
  return (
    <Link
      to="/trainer/sessions/$sessionId"
      params={{ sessionId: session.id }}
      className="group flex min-h-16 items-center gap-4 rounded-xl border bg-white p-3 transition-colors hover:border-cyan/50 hover:bg-sky-50 focus-visible:ring-2 focus-visible:ring-ring outline-none"
    >
      <span className="flex w-14 shrink-0 flex-col items-center rounded-lg bg-sky-100 py-1.5 text-navy">
        <span className="text-[11px] font-semibold uppercase">
          {formatDate(session.start, lang, { month: 'short' })}
        </span>
        <span className="text-xl font-bold leading-none tabular-nums">
          {formatDate(session.start, lang, { day: 'numeric' })}
        </span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-semibold text-ink group-hover:text-blue">
          {session.id} · {l(session.title)}
        </span>
        <span className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-ink-soft">
          <span>
            {formatTime(session.start, lang)}–{formatTime(session.end, lang)} {t('ui.syriaTime')}
          </span>
          <StatusBadge
            tone={session.format === 'online' ? 'info' : 'brand'}
            icon={
              session.format === 'online' ? (
                <Video className="size-3" aria-hidden />
              ) : (
                <Building2 className="size-3" aria-hidden />
              )
            }
          >
            {t(`common:format.${session.format}`)}
          </StatusBadge>
          {meta}
        </span>
      </span>
      <ChevronRight className="size-5 shrink-0 text-ink-soft rtl-mirror" aria-hidden />
    </Link>
  )
}
