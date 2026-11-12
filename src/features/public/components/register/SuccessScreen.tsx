import { ArrowRight, Compass, LibraryBig, PartyPopper } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
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
    <div className="on-dark relative overflow-hidden rounded-[2rem] bg-grad-unicef px-6 py-12 text-center text-white shadow-pop sm:px-12 sm:py-16">
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
        className="relative mx-auto mb-6 w-fit"
      >
        <Avatar
          src="images/generated/youth-nour.webp"
          name={name}
          size={96}
          className="border-4 border-yellow"
        />
        <span className="absolute -end-2 -bottom-2 flex size-10 items-center justify-center rounded-full bg-yellow text-ink">
          <PartyPopper className="size-5" aria-hidden />
        </span>
      </motion.div>
      <h1 className="mx-auto max-w-2xl text-3xl text-white sm:text-4xl">
        {t('register.success.title')}
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-white/85">{t('register.success.body')}</p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Magnetic>
          <Button
            size="lg"
            onClick={onDiscover}
            className="rounded-full bg-yellow text-ink shadow-pop hover:bg-white"
          >
            <Compass className="size-5" aria-hidden />
            {t('register.success.discover')}
            <ArrowRight className="size-5 rtl-mirror" aria-hidden />
          </Button>
        </Magnetic>
        <Button
          size="lg"
          variant="ghost"
          onClick={onLater}
          className="rounded-full border-2 border-white/60 text-white hover:bg-white/15 hover:text-white"
        >
          {t('register.success.later')}
        </Button>
      </div>
      <p className="mt-6 inline-flex items-center gap-2 text-sm text-white/80">
        <LibraryBig className="size-4" aria-hidden />
        {t('register.success.library')}
      </p>
    </div>
  )
}
