import type { AttendanceMark, Session, Youth } from '@shared/types'
import { CheckCheck, UserCheck, UserMinus, Users, UserX } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { markAttendance } from '@/store/actions/sessions'
import { LearnerName } from './LearnerName'

const MARKS: { mark: AttendanceMark; icon: typeof UserCheck; on: string }[] = [
  { mark: 'present', icon: UserCheck, on: 'border-success bg-success-soft text-success' },
  { mark: 'absent', icon: UserX, on: 'border-danger bg-danger-soft text-danger' },
  { mark: 'excused', icon: UserMinus, on: 'border-ink-soft bg-muted text-ink' },
]

/** T03 register: Present counts and earns points once; Excused tracked separately; Absent creates a reminder. */
export function AttendanceRegister({ session, learners }: { session: Session; learners: Youth[] }) {
  const { t } = useTranslation('trainer')
  const [busy, setBusy] = useState(false)
  const markOf = (y: Youth) => y.attendance[session.id as keyof Youth['attendance']]
  const count = (m: AttendanceMark) => learners.filter((y) => markOf(y) === m).length
  const unmarked = learners.filter((y) => !markOf(y)).length

  const mark = (y: Youth, m: AttendanceMark) => {
    markAttendance(y.id, session.id, m)
    toast.success(t(`register.toast.${m}`, { name: y.profile.name }))
  }
  const allPresent = () => {
    setBusy(true)
    window.setTimeout(() => {
      for (const y of learners)
        if (markOf(y) !== 'present') markAttendance(y.id, session.id, 'present')
      setBusy(false)
      toast.success(t('register.allDone', { count: learners.length }))
    }, 450)
  }

  return (
    <section className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg">{t('register.title')}</h2>
          <p className="mt-1 text-sm text-ink-soft">{t('register.body')}</p>
        </div>
        <Button
          onClick={allPresent}
          disabled={busy || learners.length === 0}
          className="rounded-full"
        >
          <CheckCheck className="size-4" aria-hidden />
          {busy ? t('ui.saving') : t('register.allPresent')}
        </Button>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4" aria-live="polite">
        {[
          {
            k: 'present',
            v: count('present'),
            hint: t('register.presentHint'),
            cls: 'bg-success-soft text-success',
          },
          {
            k: 'absent',
            v: count('absent'),
            hint: t('register.absentHint'),
            cls: 'bg-danger-soft text-danger',
          },
          {
            k: 'excused',
            v: count('excused'),
            hint: t('register.excusedHint'),
            cls: 'bg-muted text-ink',
          },
          {
            k: 'unmarked',
            v: unmarked,
            hint: t('register.unmarkedHint'),
            cls: 'bg-sky-50 text-navy',
          },
        ].map((c) => (
          <div key={c.k} className={cn('rounded-xl p-3', c.cls)}>
            <dt className="text-xs font-semibold">{t(`common:attendance.${c.k}`)}</dt>
            <dd className="text-2xl font-bold tabular-nums">{c.v}</dd>
            <dd className="text-[11px] opacity-80">{c.hint}</dd>
          </div>
        ))}
      </dl>
      {learners.length === 0 ? (
        <EmptyState
          className="mt-4"
          icon={Users}
          title={t('register.empty')}
          body={t('register.emptyBody')}
        />
      ) : (
        <ul className="mt-4 divide-y">
          {learners.map((y) => {
            const current = markOf(y)
            return (
              <li key={y.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <LearnerName
                  youth={y}
                  sub={
                    current ? t(`common:attendance.${current}`) : t('common:attendance.unmarked')
                  }
                />
                <fieldset className="flex gap-1.5">
                  <legend className="sr-only">
                    {t('register.markFor', { name: y.profile.name })}
                  </legend>
                  {MARKS.map(({ mark: m, icon: Icon, on }) => (
                    <button
                      key={m}
                      type="button"
                      aria-pressed={current === m}
                      onClick={() => mark(y, m)}
                      className={cn(
                        'inline-flex min-h-11 items-center gap-1.5 rounded-lg border-2 px-3 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-ring outline-none',
                        current === m ? on : 'border-border bg-white text-ink-soft hover:bg-sky-50',
                      )}
                    >
                      <Icon className="size-4" aria-hidden />
                      <span className="hidden sm:inline">{t(`common:attendance.${m}`)}</span>
                      <span className="sr-only sm:hidden">{t(`common:attendance.${m}`)}</span>
                    </button>
                  ))}
                </fieldset>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
