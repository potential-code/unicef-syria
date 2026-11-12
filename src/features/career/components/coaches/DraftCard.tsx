import type { ToolkitTarget } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { Check, PencilLine, ShieldAlert } from 'lucide-react'
import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

/** Editable AI draft. The learner reviews it, then "Use this draft" saves it to the toolkit. */
export function DraftCard({
  target,
  initial,
  onUse,
}: {
  target: ToolkitTarget
  initial: string
  onUse: (text: string) => void
}) {
  const { t } = useTranslation('career')
  const id = useId()
  const [text, setText] = useState(initial)
  const [reviewed, setReviewed] = useState(false)
  const [saved, setSaved] = useState(false)
  const empty = !text.trim()

  return (
    <div className="mt-3 rounded-2xl border-2 border-dashed border-cyan/60 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Label htmlFor={id} className="flex items-center gap-1.5 text-sm font-bold text-navy">
          <PencilLine className="size-4" aria-hidden />
          {t('coaches.draft.title', { target: t(`coaches.targets.${target}`) })}
        </Label>
        <span className="text-xs text-ink-soft">{t('coaches.draft.editable')}</span>
      </div>
      <Textarea
        id={id}
        value={text}
        onChange={(e) => {
          setText(e.target.value)
          setSaved(false)
        }}
        rows={Math.min(8, Math.max(3, text.split('\n').length + 1))}
        className="mt-2 bg-sky-50/60"
        aria-invalid={empty}
      />
      {empty && <p className="mt-1 text-sm text-danger">{t('coaches.draft.empty')}</p>}
      <label className="mt-3 flex min-h-11 cursor-pointer items-start gap-2 rounded-xl bg-notice-soft p-3 text-sm text-ink">
        <input
          type="checkbox"
          className="mt-0.5 size-5 accent-blue"
          checked={reviewed}
          onChange={(e) => setReviewed(e.target.checked)}
        />
        <span>
          <ShieldAlert className="me-1 inline size-4 text-notice" aria-hidden />
          {t('coaches.draft.review')}
        </span>
      </label>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Button
          className="rounded-full"
          disabled={!reviewed || empty || saved}
          onClick={() => {
            onUse(text)
            setSaved(true)
          }}
        >
          <Check className="size-4" aria-hidden />
          {saved ? t('coaches.draft.saved') : t('coaches.draft.use')}
        </Button>
        {saved && (
          <Button asChild variant="ghost" className="rounded-full">
            <Link to="/youth/toolkit">{t('coaches.draft.openToolkit')}</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
