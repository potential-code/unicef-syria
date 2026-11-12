import type { Session } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { CalendarDays, CalendarX } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/components/shared/EmptyState'
import { PanelHeader } from './PanelHeader'
import { SessionRow } from './SessionRow'

export function UpcomingSessions({ sessions }: { sessions: Session[] }) {
  const { t } = useTranslation('trainer')
  return (
    <section className="card p-5 sm:p-6">
      <PanelHeader
        icon={CalendarDays}
        title={t('dashboard.upcoming')}
        action={
          <Link to="/trainer/sessions" className="text-sm font-semibold text-blue hover:underline">
            {t('common:viewAll')}
          </Link>
        }
      />
      {sessions.length === 0 ? (
        <EmptyState
          className="mt-4 py-6"
          icon={CalendarX}
          title={t('sessions.empty')}
          body={t('sessions.emptyBody')}
        />
      ) : (
        <ul className="mt-4 space-y-2">
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
