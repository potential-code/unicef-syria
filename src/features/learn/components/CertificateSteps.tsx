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
    <ol className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
      {STATES.map((s, i) => {
        const done = i <= at
        return (
          <li
            key={s}
            aria-current={i === at ? 'step' : undefined}
            className={cn(
              'flex items-center gap-2 rounded-xl border px-3.5 py-3 text-sm font-semibold',
              done
                ? 'border-blue bg-blue text-white shadow-md'
                : 'border-border/70 bg-white text-ink-soft shadow-sm',
              i === at && 'ring-2 ring-yellow ring-offset-2',
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
