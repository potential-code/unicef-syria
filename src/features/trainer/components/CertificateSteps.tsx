import type { CertificateState } from '@shared/types'
import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

const STEPS: CertificateState[] = ['pendingReview', 'recommended', 'approved', 'issued']

/** Pending review → Recommended → (centre) Approved → Issued (brief §17 T05). */
export function CertificateSteps({ state }: { state?: CertificateState }) {
  const { t } = useTranslation('trainer')
  const at = state ? STEPS.indexOf(state) : -1
  return (
    <ol className="flex flex-wrap items-center gap-1" aria-label={t('results.certificate')}>
      {STEPS.map((s, i) => {
        const done = i <= at
        return (
          <li key={s} className="flex items-center gap-1">
            <span
              aria-current={i === at ? 'step' : undefined}
              className={cn(
                'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap',
                i === at
                  ? 'border-blue bg-blue text-white'
                  : done
                    ? 'border-blue/30 bg-sky-100 text-navy'
                    : 'border-border bg-white text-ink-soft',
              )}
            >
              {done && i !== at && <Check className="size-3" aria-hidden />}
              {t(`common:certificate.${s}`)}
            </span>
            {i < STEPS.length - 1 && (
              <span className={cn('h-px w-2', done ? 'bg-blue' : 'bg-border')} aria-hidden />
            )}
          </li>
        )
      })}
    </ol>
  )
}
