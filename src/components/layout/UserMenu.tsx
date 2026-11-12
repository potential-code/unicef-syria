import { useNavigate } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Avatar } from '@/components/shared/Avatar'
import { Button } from '@/components/ui/button'
import { useLocalized } from '@/i18n'
import { signOut, usePersona } from '@/store/actions/session'

export function UserMenu() {
  const { t } = useTranslation()
  const { l } = useLocalized()
  const persona = usePersona()
  const navigate = useNavigate()
  if (!persona) return null
  return (
    <div className="flex items-center gap-2">
      <Avatar src={persona.image} name={l(persona.name)} size={34} />
      <div className="hidden min-w-0 leading-tight lg:block">
        <p className="truncate text-sm font-semibold">{l(persona.name)}</p>
        <p className="truncate text-xs text-ink-soft">{t(`roles.${persona.role}`)}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        aria-label={t('signOut')}
        onClick={() => {
          signOut()
          void navigate({ to: '/sign-in' })
        }}
      >
        <LogOut className="size-4 rtl-mirror" aria-hidden />
      </Button>
    </div>
  )
}
