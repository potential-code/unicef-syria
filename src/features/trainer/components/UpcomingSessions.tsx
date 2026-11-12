import type { Session } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { CalendarX } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/components/shared/EmptyState'
import { SessionRow } from './SessionRow'

export function UpcomingSessions({ sessions }: { sessions: Session[] }) {
  const { t } = useTranslation('trainer')
  return (
    <section className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-lg">{t('dashboard.upcoming')}</h2>
        <Link to="/trainer/sessions" className="text-sm font-semibold text-blue hover:underline">
          {t('common:viewAll')}
        </Link>
      </div>
      {sessions.length === 0 ? (
        <EmptyState
          className="mt-4 py-6"
          icon={CalendarX}
          title={t('sessions.empty')}
          body={t('sessions.emptyBody')}
        />
      ) : (
        <ul className="mt-3 space-y-2">
          {sessions.map((s) => (
            <li key={s.id}>
              <SessionRow session={s} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
