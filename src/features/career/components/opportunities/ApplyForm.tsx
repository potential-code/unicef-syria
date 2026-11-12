import type { Application, Opportunity, Youth } from '@shared/types'
import { useNavigate } from '@tanstack/react-router'
import { Loader2, Save, Send, ShieldCheck } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { trackFor } from '@/domain/application-stages'
import { saveDraft, submitApplication } from '@/store/actions/applications'
import {
  documentsFrom,
  type ApplyForm as Form,
  initialForm,
  MOTIVATION_MAX,
  MOTIVATION_MIN,
  motivationOk,
  requirementsFor,
} from '../../lib/match'
import { EvidenceFields } from './EvidenceFields'
import { RequirementList } from './RequirementList'

const DELAY = 600

/** Application form with per-track evidence validation, save draft and submit (brief §15, §22). */
export function ApplyForm({
  youth,
  opp,
  app,
}: {
  youth: Youth
  opp: Opportunity
  app?: Application
}) {
  const { t } = useTranslation('career')
  const navigate = useNavigate()
  const [form, setForm] = useState<Form>(() => initialForm(youth, app))
  const [busy, setBusy] = useState<'draft' | 'submit' | null>(null)
  const [tried, setTried] = useState(false)
  const set = (p: Partial<Form>) => setForm((f) => ({ ...f, ...p }))
  const track = trackFor(opp.type)
  const reqs = requirementsFor(youth, opp, form)
  const missing = reqs.filter((r) => !r.met)
  const missingCourse = opp.evidenceCourses.find((c) => !youth.progress[c]?.completedAt)
  const needsMotivation = track !== 'freelance'
  const motivationLen = form.motivation.trim().length
  const motivationError = tried && needsMotivation && !motivationOk(form.motivation)

  const persist = () =>
    saveDraft(youth.id, opp.id, {
      motivation: needsMotivation ? form.motivation.trim() : undefined,
      documents: documentsFrom(opp, form, youth),
    })

  const onDraft = () => {
    setBusy('draft')
    window.setTimeout(() => {
      persist()
      setBusy(null)
      toast.success(t('opps.apply.draftSaved'))
    }, DELAY)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setTried(true)
    if (missing.length > 0) {
      toast.error(t('opps.apply.fixFirst', { count: missing.length }))
      return
    }
    setBusy('submit')
    window.setTimeout(() => {
      const id = persist()
      submitApplication(id)
      setBusy(null)
      toast.success(t('opps.apply.submitted'), { description: t('opps.apply.submittedBody') })
      void navigate({ to: '/youth/applications/$appId', params: { appId: id } })
    }, DELAY)
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <EvidenceFields youth={youth} opp={opp} form={form} set={set} disabled={busy !== null} />

      {needsMotivation && (
        <div className="space-y-1.5">
          <Label htmlFor="motivation">{t('opps.apply.req.motivation')}</Label>
          <Textarea
            id="motivation"
            rows={5}
            value={form.motivation}
            maxLength={MOTIVATION_MAX + 50}
            onChange={(e) => set({ motivation: e.target.value })}
            aria-invalid={motivationError}
            aria-describedby="motivation-hint"
            placeholder={t('opps.apply.motivationPlaceholder')}
            disabled={busy !== null}
          />
          <p
            id="motivation-hint"
            className={
              motivationError ? 'text-sm font-semibold text-danger' : 'text-sm text-ink-soft'
            }
          >
            {motivationError
              ? t('opps.apply.motivationError', { min: MOTIVATION_MIN, max: MOTIVATION_MAX })
              : t('opps.apply.motivationHint', { min: MOTIVATION_MIN, max: MOTIVATION_MAX })}{' '}
            <span className="tabular-nums">
              ({t('opps.apply.motivationCount', { count: motivationLen, max: MOTIVATION_MAX })})
            </span>
          </p>
        </div>
      )}

      <div className="rounded-2xl bg-sky-50 p-4">
        <h3 className="mb-3 text-base">{t('opps.apply.checkTitle')}</h3>
        <RequirementList reqs={reqs} missingCourse={missingCourse} showErrors={tried} />
        {tried && missing.length > 0 && (
          <p role="alert" className="mt-3 text-sm font-semibold text-danger">
            {t('opps.apply.fixFirst', { count: missing.length })}
          </p>
        )}
      </div>

      <p className="flex items-start gap-2 text-xs text-ink-soft">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
        {t('opps.apply.reviewNote')}
      </p>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          className="rounded-full"
          disabled={busy !== null}
          onClick={onDraft}
        >
          {busy === 'draft' ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            <Save className="size-4" aria-hidden />
          )}
          {t('opps.apply.saveDraft')}
        </Button>
        <Button type="submit" className="rounded-full sm:flex-1" disabled={busy !== null}>
          {busy === 'submit' ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            <Send className="size-4 rtl-mirror" aria-hidden />
          )}
          {busy === 'submit' ? t('opps.apply.submitting') : t('opps.apply.submit')}
        </Button>
      </div>
    </form>
  )
}
