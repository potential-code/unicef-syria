import type { Session } from '@shared/types'
import { Mic, MicOff, PhoneOff, Video, VideoOff } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { TRAINERS } from '@/data/orgs'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'

const TILE_TONES = [
  'bg-grad-unicef',
  'bg-navy',
  'bg-blue',
  'bg-[linear-gradient(140deg,var(--unicef-orange),#a93a06)]',
  'bg-[linear-gradient(140deg,var(--unicef-cyan-600),var(--unicef-navy))]',
  'bg-[#0b3f8c]',
]
const PEERS = ['Yazan', 'Lamar', 'Sami', 'Rasha']

/** Demo room for an online session: fake video tiles only, no live meeting is created. */
export function DemoRoomDialog({
  session,
  youthName,
  onClose,
}: {
  session: Session | null
  youthName: string
  onClose: () => void
}) {
  const { t } = useTranslation('career')
  const { l } = useLocalized()
  const [mic, setMic] = useState(false)
  const [cam, setCam] = useState(true)
  const trainer = TRAINERS.find((x) => x.id === session?.trainerId)
  const tiles = [trainer ? l(trainer.name) : t('cohort.panelHosts'), youthName, ...PEERS]

  return (
    <Dialog open={!!session} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{session ? l(session.title) : ''}</DialogTitle>
          <DialogDescription>{t('cohort.room.note')}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-ink p-2 sm:grid-cols-3">
          {tiles.map((name, i) => {
            const me = i === 1
            const off = me && !cam
            return (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  'relative flex aspect-video items-center justify-center overflow-hidden rounded-xl',
                  off ? 'bg-navy' : TILE_TONES[i % TILE_TONES.length],
                )}
              >
                <span className="flex size-12 items-center justify-center rounded-full text-lg font-bold text-white ring-2 ring-white/40">
                  {name
                    .split(' ')
                    .map((p) => p[0])
                    .join('')
                    .slice(0, 2)}
                </span>
                {i === 0 && (
                  <span className="absolute top-2 start-2 rounded-full bg-white/90 px-2 py-0.5 text-[0.65rem] font-bold text-navy">
                    {t('cohort.room.speaking')}
                  </span>
                )}
                <span className="absolute bottom-1.5 start-2 rounded bg-black/40 px-1.5 text-xs text-white">
                  {me ? t('cohort.room.you', { name }) : name}
                </span>
              </motion.div>
            )
          })}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            variant="secondary"
            className="rounded-full"
            aria-pressed={mic}
            onClick={() => setMic((v) => !v)}
          >
            {mic ? (
              <Mic className="size-4" aria-hidden />
            ) : (
              <MicOff className="size-4" aria-hidden />
            )}
            {mic ? t('cohort.room.mute') : t('cohort.room.unmute')}
          </Button>
          <Button
            variant="secondary"
            className="rounded-full"
            aria-pressed={cam}
            onClick={() => setCam((v) => !v)}
          >
            {cam ? (
              <Video className="size-4" aria-hidden />
            ) : (
              <VideoOff className="size-4" aria-hidden />
            )}
            {cam ? t('cohort.room.cameraOff') : t('cohort.room.cameraOn')}
          </Button>
          <Button variant="destructive" className="rounded-full" onClick={onClose}>
            <PhoneOff className="size-4" aria-hidden />
            {t('cohort.room.leave')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
