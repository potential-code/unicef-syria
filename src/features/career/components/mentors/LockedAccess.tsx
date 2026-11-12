import type { Youth } from '@shared/types'
import { CheckCircle2, Lock, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { balance, hasAwarded, MENTOR_COST } from '@/domain/points'
import { cn } from '@/lib/utils'
import { UNLOCK_ACTIVITIES } from '../../config/mentors'

/** Insufficient points: balance, how far away the session is and activities that earn points. */
export function LockedAccess({ youth }: { youth: Youth }) {
  const { t } = useTranslation('career')
  const bal = balance(youth)
  return (
    <div className="rounded-2xl border-2 border-notice/30 bg-notice-soft p-5">
      <p className="flex items-center gap-2 font-bold text-ink">
        <Lock className="size-5 text-notice" aria-hidden />
        {t('mentors.locked.title')}
      </p>
      <p className="mt-1 text-sm">
        {t('mentors.locked.body', {
          balance: bal,
          cost: MENTOR_COST,
          missing: Math.max(0, MENTOR_COST - bal),
        })}
      </p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {UNLOCK_ACTIVITIES.map((a) => {
          const done = a.once && hasAwarded(youth, a.key)
          return (
            <li
              key={a.key}
              className={cn(
                'flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm',
                done && 'opacity-70',
              )}
            >
              {done ? (
                <CheckCircle2 className="size-4 text-success" aria-hidden />
              ) : (
                <Sparkles className="size-4 text-blue" aria-hidden />
              )}
              <span className="flex-1">{t(`mentors.locked.activities.${a.key}`)}</span>
              <span className="font-bold text-blue">
                {done ? t('mentors.locked.done') : `+${a.points}`}
              </span>
            </li>
          )
        })}
      </ul>
      <p className="mt-3 text-xs text-ink-soft">{t('mentors.locked.essential')}</p>
    </div>
  )
}
