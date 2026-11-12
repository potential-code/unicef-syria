import { Link } from '@tanstack/react-router'
import { Bot } from 'lucide-react'
import { useTranslation } from 'react-i18next'

/** Reminds the learner that AI coach drafts land here, stay editable and need review. */
export function CoachDraftNote() {
  const { t } = useTranslation('career')
  return (
    <div className="card flex flex-wrap items-center gap-3 border-s-4 border-s-cyan p-4 text-sm">
      <Bot className="size-5 shrink-0 text-blue" aria-hidden />
      <p className="min-w-0 flex-1 basis-60 text-ink">{t('toolkit.coachNote')}</p>
      <Link
        to="/youth/coaches"
        className="inline-flex h-9 shrink-0 items-center rounded-full px-3 font-semibold text-blue hover:underline"
      >
        {t('toolkit.openCoaches')}
      </Link>
    </div>
  )
}
