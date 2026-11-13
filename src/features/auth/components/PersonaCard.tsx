import type { Persona } from '@shared/types'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Avatar } from '@/components/shared/Avatar'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'

const ROLE_DOT: Record<Persona['role'], string> = {
  youth: 'bg-yellow',
  trainer: 'bg-cyan',
  employer: 'bg-orange',
  centre: 'bg-blue',
  partner: 'bg-navy',
  unicef: 'bg-blue',
  viewer: 'bg-ink-soft',
}

/** Compact demo-profile card: one click signs in as this profile. */
export function PersonaCard({ persona, onSelect }: { persona: Persona; onSelect: () => void }) {
  const { t } = useTranslation()
  const { l } = useLocalized()
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group card card-hover flex w-full items-center gap-3 p-2.5 text-start shadow-sm hover:border-cyan/50"
    >
      <Avatar
        src={persona.image}
        name={l(persona.name)}
        size={40}
        className="ring-2 ring-white shadow-sm"
      />
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5">
          {persona.golden ? (
            <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-blue text-[10px] font-bold text-white">
              {persona.golden}
            </span>
          ) : (
            <span
              className={cn('size-1.5 shrink-0 rounded-full', ROLE_DOT[persona.role])}
              aria-hidden
            />
          )}
          <span className="truncate text-sm font-bold text-ink">{l(persona.name)}</span>
        </span>
        <span className="block truncate text-xs text-ink-soft">{l(persona.title)}</span>
      </span>
      <span className="sr-only">{t(`roles.${persona.role}`)}</span>
      <ArrowRight
        className="size-4 shrink-0 text-blue opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 rtl-mirror"
        aria-hidden
      />
    </button>
  )
}
