import { Link } from '@tanstack/react-router'
import { Bot } from 'lucide-react'
import { useTranslation } from 'react-i18next'

/** Reminds the learner that AI coach drafts land here, stay editable and need review. */
export function CoachDraftNote() {
  const { t } = useTranslation('career')
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-cyan/30 bg-sky-50 p-4 text-sm">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue shadow-sm">
        <Bot className="size-5" aria-hidden />
      </span>
      <p className="min-w-0 flex-1 text-ink">{t('toolkit.coachNote')}</p>
      <Link
        to="/youth/coaches"
        className="inline-flex min-h-11 items-center rounded-full px-3 font-semibold text-blue hover:underline"
      >
        {t('toolkit.openCoaches')}
      </Link>
    </div>
  )
}
