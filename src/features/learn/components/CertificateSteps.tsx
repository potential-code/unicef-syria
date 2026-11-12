import type { CertificateState } from '@shared/types'
import { CircleCheck, CircleDashed } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

const STATES: CertificateState[] = ['pendingReview', 'recommended', 'approved', 'issued']

/** Pending review, Recommended, Approved, Issued (brief §17 T05). */
export function CertificateSteps({ state }: { state: CertificateState | undefined }) {
  const { t } = useTranslation()
  const at = state ? STATES.indexOf(state) : -1
  return (
    <ol className="grid gap-2 sm:grid-cols-4">
      {STATES.map((s, i) => {
        const done = i <= at
        return (
          <li
            key={s}
            aria-current={i === at ? 'step' : undefined}
            className={cn(
              'flex items-center gap-2 rounded-2xl p-3 font-semibold',
              done ? 'bg-blue text-white' : 'bg-sky-50 text-ink-soft',
              i === at && 'ring-4 ring-yellow',
            )}
          >
            {done ? (
              <CircleCheck className="size-5 shrink-0" aria-hidden />
            ) : (
              <CircleDashed className="size-5 shrink-0" aria-hidden />
            )}
            {t(`certificate.${s}`)}
          </li>
        )
      })}
    </ol>
  )
}
