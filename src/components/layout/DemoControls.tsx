import { useNavigate } from '@tanstack/react-router'
import { MonitorPlay, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Avatar } from '@/components/shared/Avatar'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { PERSONAS } from '@/data/personas'
import { ROLE_HOME } from '@/domain/access'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { setReducedMotion, signInAs, usePersona, usePrefs } from '@/store/actions/session'
import { resetDemo } from '@/store/db'

/** Presenter-only role switcher and "Reset demo" (brief §1). */
export function DemoControls({ onDark, className }: { onDark?: boolean; className?: string }) {
  const { t } = useTranslation()
  const { l } = useLocalized()
  const navigate = useNavigate()
  const persona = usePersona()
  const prefs = usePrefs()
  const [confirm, setConfirm] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              'gap-1.5',
              onDark && 'border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white',
              className,
            )}
          >
            <MonitorPlay className="size-4" aria-hidden />
            <span className="hidden sm:inline">{t('demo.presenter')}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="max-h-[80vh] w-72 overflow-y-auto">
          <DropdownMenuLabel>{t('demo.switchRole')}</DropdownMenuLabel>
          {PERSONAS.map((p) => (
            <DropdownMenuItem
              key={p.id}
              onSelect={() => {
                signInAs(p.id)
                void navigate({ to: ROLE_HOME[p.role] })
              }}
              className={cn('gap-2.5', persona?.id === p.id && 'bg-sky-100')}
            >
              <Avatar src={p.image} name={l(p.name)} size={28} />
              <span className="min-w-0">
                <span className="block truncate font-medium">{l(p.name)}</span>
                <span className="block truncate text-xs text-ink-soft">{l(p.title)}</span>
              </span>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={prefs.reducedMotion}
            onCheckedChange={(v) => setReducedMotion(Boolean(v))}
          >
            {t('demo.motion')}
          </DropdownMenuCheckboxItem>
          <DropdownMenuItem onSelect={() => setConfirm(true)} className="gap-2 text-danger">
            <RotateCcw className="size-4" aria-hidden />
            {t('demo.reset')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={confirm} onOpenChange={setConfirm}>
        <AlertDialogContent>
          <AlertDialogTitle>{t('demo.resetTitle')}</AlertDialogTitle>
          <AlertDialogDescription>{t('demo.resetBody')}</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                resetDemo()
                toast.success(t('demo.resetDone'))
              }}
            >
              {t('demo.reset')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
