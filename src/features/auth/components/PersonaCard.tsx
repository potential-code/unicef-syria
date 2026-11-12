import type { Persona } from '@shared/types'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { SmartImage } from '@/components/shared/SmartImage'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'

const ROLE_TONE: Record<Persona['role'], string> = {
  youth: 'bg-yellow text-ink',
  trainer: 'bg-cyan text-ink',
  employer: 'bg-orange text-white',
  centre: 'bg-blue text-white',
  partner: 'bg-navy text-white',
  unicef: 'bg-blue text-white',
  viewer: 'bg-ink text-white',
}

/** One click signs in as this demo profile and opens its home screen. */
export function PersonaCard({ persona, onSelect, featured }: { persona: Persona; onSelect: () => void; featured?: boolean }) {
  const { t } = useTranslation()
  const { l } = useLocalized()
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'group relative flex w-full overflow-hidden rounded-2xl border bg-white text-start shadow-sm transition-shadow hover:shadow-lg focus-visible:shadow-lg',
        featured ? 'flex-col' : 'items-center gap-3 p-3',
      )}
    >
      {featured ? (
        <>
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <SmartImage src={persona.image} alt="" className="size-full transition-transform duration-500 group-hover:scale-105" />
            <span className={cn('absolute start-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold', ROLE_TONE[persona.role])}>{t(`roles.${persona.role}`)}</span>
          </div>
          <div className="flex items-end justify-between gap-2 p-4">
            <div className="min-w-0">
              <p className="text-lg font-bold">{l(persona.name)}</p>
              <p className="text-sm text-ink-soft">{l(persona.title)}</p>
              <p className="mt-1 text-xs text-ink-soft">{l(persona.scope)}</p>
            </div>
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-blue transition-colors group-hover:bg-blue group-hover:text-white">
              <ArrowRight className="size-5 rtl-mirror" aria-hidden />
            </span>
          </div>
        </>
      ) : (
        <>
          <SmartImage src={persona.image} alt="" className="size-14 shrink-0 rounded-xl" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-bold">{l(persona.name)}</p>
            <p className="truncate text-sm text-ink-soft">{l(persona.title)}</p>
            <p className="truncate text-xs text-ink-soft">{l(persona.scope)}</p>
          </div>
          <ArrowRight className="me-1 size-5 shrink-0 text-blue opacity-60 transition-opacity group-hover:opacity-100 rtl-mirror" aria-hidden />
        </>
      )}
    </motion.button>
  )
}
