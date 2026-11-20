import type { Localized } from '@shared/types'
import { Play } from 'lucide-react'
import { motion } from 'motion/react'
import { useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { PlaceholderLabel } from './PlaceholderLabel'

/**
 * "Sample lesson preview": a styled poster, never a video element. Play opens the transcript,
 * which is always readable underneath (brief §6 Y07).
 */
export function VideoPreview({
  title,
  transcript,
  onPlayed,
}: {
  title: string
  transcript: Localized
  /** Called when the learner opens the preview, which unlocks Mark complete. */
  onPlayed?: () => void
}) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  const [reading, setReading] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()

  const open = () => {
    setReading(true)
    onPlayed?.()
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    ref.current?.focus({ preventScroll: true })
  }

  return (
    <section aria-labelledby={`${id}-h`} className="card overflow-hidden rounded-3xl">
      <div className="on-dark relative flex aspect-video items-center justify-center overflow-hidden bg-grad-unicef text-white">
        <Motif variant="banner" className="text-white/[0.12]" />
        <span className="absolute start-4 top-4 rounded-full bg-navy/40 px-3 py-1 text-xs font-bold tracking-wide uppercase">
          {t('player.preview')}
        </span>
        <motion.button
          type="button"
          onClick={open}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex size-20 items-center justify-center rounded-full bg-white text-blue shadow-pop"
          aria-controls={`${id}-tr`}
          aria-label={t('player.openTranscript', { title })}
        >
          <Play className="ms-1 size-9 fill-current" aria-hidden />
        </motion.button>
        <p className="absolute inset-x-4 bottom-4 truncate text-lg font-bold">{title}</p>
      </div>
      <div
        ref={ref}
        id={`${id}-tr`}
        tabIndex={-1}
        className={cn('p-5 outline-none transition-colors', reading && 'bg-sky-50')}
      >
        <h3 id={`${id}-h`} className="flex flex-wrap items-center gap-2 text-base">
          {t('player.transcript')}
          <PlaceholderLabel value={transcript} />
        </h3>
        {reading && (
          <p className="mt-1 text-xs font-semibold text-blue" aria-live="polite">
            {t('player.readingNote')}
          </p>
        )}
        <p className="mt-2 text-sm leading-relaxed">{l(transcript)}</p>
      </div>
    </section>
  )
}
