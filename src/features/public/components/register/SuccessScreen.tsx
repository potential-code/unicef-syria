import { ArrowRight, Compass, LibraryBig, PartyPopper } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
import { Magnetic } from '@/components/motion'
import { Avatar } from '@/components/shared/Avatar'
import { Button } from '@/components/ui/button'

const CONFETTI = [
  'bg-yellow',
  'bg-cyan',
  'bg-orange',
  'bg-white',
  'bg-yellow',
  'bg-cyan',
  'bg-orange',
  'bg-white',
  'bg-yellow',
  'bg-cyan',
].map((tone, i) => ({ tone, id: `c${i}`, left: 8 + i * 9, delay: i * 0.08 }))

/** After registration (brief §2 Y01): exact message, "Start career discovery" and "Do this later". */
export function SuccessScreen({
  name,
  onDiscover,
  onLater,
}: {
  name: string
  onDiscover: () => void
  onLater: () => void
}) {
  const { t } = useTranslation('public')
  return (
    <div className="on-dark relative overflow-hidden rounded-3xl bg-grad-unicef px-6 py-10 text-center text-white shadow-lg sm:px-10 sm:py-12">
      <Motif variant="card" className="text-white/[0.12]" />
      {CONFETTI.map((c) => (
        <motion.span
          key={c.id}
          aria-hidden
          className={`absolute top-0 size-3 rounded-sm ${c.tone}`}
          style={{ insetInlineStart: `${c.left}%` }}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{ y: [-20, 380], opacity: [0, 1, 0], rotate: 360 }}
          transition={{ duration: 2.4, delay: c.delay, ease: 'easeOut' }}
        />
      ))}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14 }}
        className="relative mx-auto mb-5 w-fit"
      >
        <Avatar
          src="images/generated/youth-nour.webp"
          name={name}
          size={88}
          className="border-4 border-yellow"
        />
      </motion.div>
      <PartyPopper className="relative mx-auto mb-2 size-5 text-yellow" aria-hidden />
      <h1 className="relative mx-auto max-w-lg text-2xl text-white sm:text-3xl">
        {t('register.success.title')}
      </h1>
      <p className="relative mx-auto mt-3 max-w-md text-white/85">{t('register.success.body')}</p>
      <div className="relative mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Magnetic>
          <Button
            onClick={onDiscover}
            className="rounded-full bg-yellow px-5 text-ink shadow-lg hover:bg-white"
          >
            <Compass className="size-4" aria-hidden />
            {t('register.success.discover')}
            <ArrowRight className="size-4 rtl-mirror" aria-hidden />
          </Button>
        </Magnetic>
        <Button
          variant="ghost"
          onClick={onLater}
          className="rounded-full border border-white/60 px-5 text-white hover:bg-white/15 hover:text-white"
        >
          {t('register.success.later')}
        </Button>
      </div>
      <p className="relative mt-6 inline-flex items-center gap-2 text-sm text-white/85">
        <LibraryBig className="size-4" aria-hidden />
        {t('register.success.library')}
      </p>
    </div>
  )
}
