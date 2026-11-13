import type { Persona } from '@shared/types'
import { useNavigate } from '@tanstack/react-router'
import { MonitorPlay, Play, RotateCcw } from 'lucide-react'
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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { PERSONAS } from '@/data/personas'
import { ROLE_HOME } from '@/domain/access'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { setDemoGuide, setGuideStep } from '@/store/actions/guide'
import { setReducedMotion, signInAs, signOut, usePersona, usePrefs } from '@/store/actions/session'
import { resetDemo } from '@/store/db'

/** Presenter-only role switcher and "Reset demo" (brief §1). */
export function DemoControls({ onDark, className }: { onDark?: boolean; className?: string }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const persona = usePersona()
  const prefs = usePrefs()
  const [confirm, setConfirm] = useState(false)
  const golden = PERSONAS.filter((p) => p.golden).sort((a, b) => (a.golden ?? 0) - (b.golden ?? 0))
  const extras = PERSONAS.filter((p) => !p.golden)
  const open = (p: Persona) => {
    signInAs(p.id)
    void navigate({ to: ROLE_HOME[p.role] })
  }

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
          <DropdownMenuItem
            onSelect={() => {
              resetDemo()
              signOut()
              setGuideStep(0)
              void navigate({ to: '/' })
            }}
            className="gap-2 font-semibold text-blue"
          >
            <Play className="size-4" aria-hidden />
            {t('demo.startGolden')}
          </DropdownMenuItem>
          <DropdownMenuCheckboxItem
            checked={!!prefs.demoGuide}
            onCheckedChange={(v) => setDemoGuide(Boolean(v))}
          >
            {t('demo.showGuide')}
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>{t('demo.goldenProfiles')}</DropdownMenuLabel>
          {golden.map((p) => (
            <PersonaItem key={p.id} p={p} active={persona?.id === p.id} onSelect={() => open(p)} />
          ))}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="text-sm">
              {t('demo.moreProfiles')}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-64">
              {extras.map((p) => (
                <PersonaItem
                  key={p.id}
                  p={p}
                  active={persona?.id === p.id}
                  onSelect={() => open(p)}
                />
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
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

function PersonaItem({
  p,
  active,
  onSelect,
}: {
  p: Persona
  active: boolean
  onSelect: () => void
}) {
  const { l } = useLocalized()
  return (
    <DropdownMenuItem onSelect={onSelect} className={cn('gap-2.5', active && 'bg-sky-100')}>
      <Avatar src={p.image} name={l(p.name)} size={28} />
      <span className="min-w-0">
        <span className="block truncate font-medium">
          {p.golden ? <span className="me-1 text-xs font-bold text-blue">{p.golden}.</span> : null}
          {l(p.name)}
        </span>
        <span className="block truncate text-xs text-ink-soft">{l(p.title)}</span>
      </span>
    </DropdownMenuItem>
  )
}
