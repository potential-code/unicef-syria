import type { CertificateState } from '@shared/types'
import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

export const CERT_STEPS: CertificateState[] = ['pendingReview', 'recommended', 'approved', 'issued']

/** Pending review → Recommended → Approved → Issued, with who acts at each step. */
export function CertificateFlow({
  state,
  compact,
}: {
  state?: CertificateState
  compact?: boolean
}) {
  const { t } = useTranslation('admin')
  const at = state ? CERT_STEPS.indexOf(state) : -1
  return (
    <ol
      className={cn('flex w-full items-start', compact ? 'gap-1' : 'gap-2')}
      aria-label={t('results.flowLabel')}
    >
      {CERT_STEPS.map((s, i) => {
        const done = i <= at
        return (
          <li
            key={s}
            className="flex flex-1 flex-col items-center gap-1 text-center"
            aria-current={i === at ? 'step' : undefined}
          >
            <div className="flex w-full items-center">
              <span
                className={cn(
                  'h-0.5 flex-1',
                  i === 0 ? 'opacity-0' : done ? 'bg-blue' : 'bg-border',
                )}
                aria-hidden
              />
              <span
                className={cn(
                  'flex size-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold',
                  done ? 'border-blue bg-blue text-white' : 'border-border bg-white text-ink-soft',
                  i === at && 'ring-4 ring-sky-200',
                )}
              >
                {done ? <Check className="size-3.5" aria-hidden /> : i + 1}
              </span>
              <span
                className={cn(
                  'h-0.5 flex-1',
                  i === CERT_STEPS.length - 1 ? 'opacity-0' : i < at ? 'bg-blue' : 'bg-border',
                )}
                aria-hidden
              />
            </div>
            <span className={cn('text-xs font-medium', done ? 'text-ink' : 'text-ink-soft')}>
              {t(`common:certificate.${s}`)}
            </span>
            {!compact && (
              <span className="text-[11px] text-ink-soft">{t(`results.actor.${s}`)}</span>
            )}
          </li>
        )
      })}
    </ol>
  )
}
