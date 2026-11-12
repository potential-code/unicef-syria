import type { Dimension } from '@shared/types'
import { Pencil, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { QUESTIONS } from '@/data/assessment'
import { useLocalized } from '@/i18n'

/** Final review screen: every answer with an edit link before submitting (brief §3). */
export function DiscoveryReview({
  answers,
  onEdit,
  onSubmit,
  busy,
}: {
  answers: (Dimension | null)[]
  onEdit: (i: number) => void
  onSubmit: () => void
  busy: boolean
}) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  const complete = answers.length === QUESTIONS.length && answers.every(Boolean)
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="text-2xl sm:text-3xl">{t('discovery.reviewTitle')}</h2>
      <p className="mt-2 text-ink-soft">{t('discovery.reviewBody')}</p>
      <ol className="mt-6 space-y-3">
        {QUESTIONS.map((q, i) => {
          const a = answers[i]
          const opt = q.options.find((o) => o.dimension === a)
          return (
            <li key={q.id} className="card flex items-start gap-3 p-4">
              <span className="w-6 shrink-0 pt-0.5 text-sm font-extrabold text-blue tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-ink-soft">{l(q.prompt)}</p>
                <p className="mt-1 font-semibold">
                  {opt ? (
                    l(opt.text)
                  ) : (
                    <span className="text-danger">{t('discovery.unanswered')}</span>
                  )}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-blue"
                onClick={() => onEdit(i)}
                aria-label={t('discovery.editN', { n: i + 1 })}
              >
                <Pencil className="size-4" aria-hidden />
                <span className="hidden sm:inline">{t('common:edit')}</span>
              </Button>
            </li>
          )
        })}
      </ol>
      <div className="sticky bottom-4 mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-border/70 bg-white/95 p-3 shadow-lg backdrop-blur">
        <p className="text-sm text-ink-soft">
          {complete ? t('discovery.readyNote') : t('discovery.missingNote')}
        </p>
        <Button
          size="lg"
          className="ms-auto rounded-full"
          onClick={onSubmit}
          disabled={!complete || busy}
        >
          <Send className="size-4 rtl-mirror" aria-hidden />
          {t('discovery.submit')}
        </Button>
      </div>
    </div>
  )
}
