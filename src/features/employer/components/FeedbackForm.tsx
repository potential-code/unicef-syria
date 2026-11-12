import type { OrgId } from '@shared/types'
import { Loader2, Send } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { saveEmployerFeedback } from '@/store/actions/applications'
import { Field } from './Field'

/** Workforce feedback (brief §16 E03): feeds the aggregate reporting view. */
export function FeedbackForm({ orgId }: { orgId: OrgId }) {
  const { t } = useTranslation('employer')
  const [v, setV] = useState({ strengths: '', missing: '', needs: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!v.strengths.trim() && !v.missing.trim() && !v.needs.trim())
      return setError(t('feedback.error'))
    setError('')
    setBusy(true)
    window.setTimeout(() => {
      saveEmployerFeedback(orgId, v.strengths.trim(), v.missing.trim(), v.needs.trim())
      setV({ strengths: '', missing: '', needs: '' })
      setBusy(false)
      toast.success(t('feedback.saved'))
    }, 500)
  }
  const area = (k: keyof typeof v) => (
    <Field id={`fb-${k}`} label={t(`feedback.${k}`)} error={k === 'strengths' ? error : undefined}>
      <Textarea
        id={`fb-${k}`}
        value={v[k]}
        onChange={(e) => setV({ ...v, [k]: e.target.value })}
        placeholder={t(`feedback.${k}Ph`)}
      />
    </Field>
  )
  return (
    <form onSubmit={submit} noValidate className="card flex flex-col gap-4 p-5 sm:p-6">
      <p className="text-sm text-ink-soft">{t('feedback.body')}</p>
      {area('strengths')}
      {area('missing')}
      {area('needs')}
      <Button type="submit" disabled={busy} className="self-end rounded-full">
        {busy ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <Send className="size-4 rtl-mirror" aria-hidden />
        )}
        {t('feedback.submit')}
      </Button>
    </form>
  )
}
