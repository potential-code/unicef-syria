import { Check, LoaderCircle, Route } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

const STEPS = ['gen1', 'gen2', 'gen3', 'gen4'] as const

/** Short animated "building your path" sequence, then calls onDone once (brief §5 Y05). */
export function PathGenerating({ onDone }: { onDone: () => void }) {
  const { t } = useTranslation('learn')
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)
  const delay = reduce ? 150 : 650

  useEffect(() => {
    if (step >= STEPS.length) {
      onDone()
      return
    }
    const id = window.setTimeout(() => setStep((s) => s + 1), delay)
    return () => window.clearTimeout(id)
  }, [step, delay, onDone])

  return (
    <section
      className="on-dark relative mx-auto max-w-xl overflow-hidden rounded-3xl bg-grad-unicef p-8 text-white shadow-lg"
      aria-live="polite"
    >
      <motion.span
        className="mx-auto flex size-20 items-center justify-center rounded-full bg-white/15"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
        aria-hidden
      >
        <Route className="size-10" />
      </motion.span>
      <h2 className="mt-5 text-center text-2xl text-white">{t('path.generating')}</h2>
      <ol className="mt-6 space-y-3">
        {STEPS.map((s, i) => {
          const done = i < step
          const active = i === step
          return (
            <motion.li
              key={s}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: i <= step ? 1 : 0.4, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                'flex items-center gap-3 rounded-2xl px-3 py-2',
                active && 'bg-white/15',
              )}
            >
              <span
                className={cn(
                  'flex size-7 items-center justify-center rounded-full',
                  done ? 'bg-yellow text-ink' : 'bg-white/20',
                )}
              >
                {done ? (
                  <Check className="size-4" aria-hidden />
                ) : active ? (
                  <LoaderCircle className="size-4 animate-spin" aria-hidden />
                ) : null}
              </span>
              <span className="font-semibold">{t(`path.${s}`)}</span>
            </motion.li>
          )
        })}
      </ol>
    </section>
  )
}
