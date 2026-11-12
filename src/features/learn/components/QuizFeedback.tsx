import type { QuizQuestion } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { CircleX } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLocalized } from '@/i18n'

/** Feedback on incorrect answers, each linking to the unit to revisit. */
export function QuizFeedback({ courseId, wrong }: { courseId: string; wrong: QuizQuestion[] }) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  if (!wrong.length) return null
  return (
    <ul className="mt-4 space-y-2">
      {wrong.map((q) => (
        <li key={q.prompt.en} className="rounded-2xl bg-white p-4 text-ink shadow-sm">
          <p className="flex items-start gap-2 font-semibold">
            <CircleX className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden />
            {l(q.prompt)}
          </p>
          <p className="mt-1 text-sm text-ink-soft">{l(q.feedback)}</p>
          <Link
            to="/youth/learn/$courseId/$unit"
            params={{ courseId, unit: String(q.unitIndex + 1) }}
            className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-blue hover:underline"
          >
            {t('quiz.revisit', { n: q.unitIndex + 1 })}
          </Link>
        </li>
      ))}
    </ul>
  )
}
