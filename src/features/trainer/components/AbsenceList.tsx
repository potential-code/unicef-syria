import type { Session, Youth } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { CircleCheck, UserX } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LearnerName } from './LearnerName'

/** Learners marked absent in a past session: the trainer's follow-up list. */
export function AbsenceList({ learners, sessions }: { learners: Youth[]; sessions: Session[] }) {
  const { t } = useTranslation('trainer')
  const rows = learners.flatMap((y) =>
    sessions
      .filter((s) => y.attendance[s.id as keyof Youth['attendance']] === 'absent')
      .map((s) => ({ y, s })),
  )
  return (
    <section className="card p-5" aria-labelledby="absences-h">
      <h2 id="absences-h" className="flex items-center gap-2 text-lg">
        <UserX className="size-5 text-orange" aria-hidden />
        {t('sessions.attention')}
      </h2>
      <p className="mt-1 text-sm text-ink-soft">{t('sessions.attentionBody')}</p>
      {rows.length === 0 ? (
        <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-success">
          <CircleCheck className="size-4" aria-hidden />
          {t('sessions.noAbsences')}
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-border/70">
          {rows.map(({ y, s }) => (
            <li key={`${y.id}-${s.id}`} className="flex flex-wrap items-center gap-3 py-3">
              <LearnerName
                youth={y}
                sub={t('sessions.absentFrom', { id: s.id })}
                className="flex-1"
              />
              <Link
                to="/trainer/sessions/$sessionId"
                params={{ sessionId: s.id }}
                className="inline-flex min-h-11 items-center text-sm font-semibold text-blue hover:underline"
              >
                {t('sessions.followUp')}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
