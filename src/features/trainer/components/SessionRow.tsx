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
      className="group flex items-center gap-4 rounded-xl border border-border/70 bg-white p-3 shadow-sm transition-[box-shadow,border-color,transform] outline-none hover:-translate-y-px hover:border-cyan/50 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="flex min-w-14 shrink-0 flex-col items-center rounded-lg bg-sky-50 px-2 py-1.5 text-navy ring-1 ring-cyan/25">
        <span className="text-[11px] font-semibold whitespace-nowrap text-blue uppercase">
          {formatDate(session.start, lang, { month: 'short' })}
        </span>
        <span className="text-xl font-bold leading-none tabular-nums">
          {formatDate(session.start, lang, { day: 'numeric' })}
        </span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-ink group-hover:text-blue">
          {session.id} · {l(session.title)}
        </span>
        <span className="mt-1 flex flex-wrap items-center gap-2 text-xs text-ink-soft">
          <span className="tabular-nums">
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
