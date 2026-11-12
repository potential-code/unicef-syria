import { BadgeCheck, CheckCircle2, Circle, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { formatDate, useLocalized } from '@/i18n'
import { now } from '@/lib/clock'
import { approveOrganisation } from '@/store/actions/applications'
import { type OrgProfileEdit, saveOrgProfile } from '@/store/actions/employer-extra'
import type { OrgScope } from '../hooks/use-org-scope'

/** Centre or UNICEF approval state for new organisations; publication is simulated (brief §16 E01). */
export function ApprovalPanel({ scope, profile }: { scope: OrgScope; profile: OrgProfileEdit }) {
  const { t } = useTranslation('employer')
  const { lang } = useLocalized()
  const [busy, setBusy] = useState(false)
  const submitted = scope.approved || !!profile.submittedAt
  const steps = [
    { key: 'submitted', done: submitted },
    { key: 'review', done: scope.approved },
    { key: 'published', done: scope.approved },
  ]
  const run = (fn: () => void, msg: string) => {
    setBusy(true)
    window.setTimeout(() => {
      fn()
      setBusy(false)
      toast.success(msg)
    }, 600)
  }
  return (
    <aside className="card p-5 sm:p-6 xl:self-start">
      <h2 className="flex items-center gap-2 text-lg text-navy">
        <BadgeCheck className="size-5 text-blue" aria-hidden />
        {t('approval.title')}
      </h2>
      <p className="mt-1 text-sm text-ink-soft">
        {scope.approved ? t('approval.approvedBody') : t('approval.pendingBody')}
      </p>
      <ol className="mt-4 flex flex-col gap-3">
        {steps.map((s) => (
          <li key={s.key} className="flex items-center gap-3">
            {s.done ? (
              <CheckCircle2 className="size-5 shrink-0 text-blue" aria-hidden />
            ) : (
              <Circle className="size-5 shrink-0 text-ink-soft/50" aria-hidden />
            )}
            <span className="text-sm">
              <span className="font-semibold text-ink">{t(`approval.steps.${s.key}`)}</span>
              <span className="sr-only"> {s.done ? t('approval.done') : t('approval.notYet')}</span>
            </span>
          </li>
        ))}
      </ol>
      {profile.submittedAt && !scope.approved && (
        <p className="mt-3 text-xs text-ink-soft">
          {t('approval.submittedOn', { date: formatDate(profile.submittedAt, lang) })}
        </p>
      )}
      {!scope.approved && (
        <div className="mt-4 flex flex-col gap-2">
          {!profile.submittedAt ? (
            <Button
              disabled={busy}
              className="rounded-full"
              onClick={() =>
                run(
                  () => saveOrgProfile(scope.org.id, { ...profile, submittedAt: now() }),
                  t('approval.submittedToast'),
                )
              }
            >
              {busy && <Loader2 className="size-4 animate-spin" aria-hidden />}
              {t('approval.submit')}
            </Button>
          ) : (
            <Button
              variant="outline"
              disabled={busy}
              className="rounded-full"
              onClick={() =>
                run(() => approveOrganisation(scope.org.id), t('approval.approvedToast'))
              }
            >
              {busy && <Loader2 className="size-4 animate-spin" aria-hidden />}
              {t('approval.simulate')}
            </Button>
          )}
        </div>
      )}
      <p className="mt-4 rounded-xl bg-sky-50 p-3 text-xs text-ink ring-1 ring-cyan/20">
        {t('approval.note')}
      </p>
    </aside>
  )
}
