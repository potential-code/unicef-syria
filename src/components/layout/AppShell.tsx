import type { Role } from '@shared/types'
import { Link, Outlet, useRouterState } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MotionPage } from '@/components/motion'
import { DemoTag } from '@/components/shared/DemoTag'
import { LangToggle } from '@/components/shared/LangToggle'
import { Logo } from '@/components/shared/Logo'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { usePrefs } from '@/store/actions/session'
import { DemoControls } from './DemoControls'
import { SideNav } from './SideNav'
import { UserMenu } from './UserMenu'

/**
 * Signed-in shell for every role: left navigation on desktop, compact sheet navigation on mobile,
 * top bar with the demo label, language toggle, presenter controls and user. Calm by design;
 * youth screens add their own colour inside the content.
 */
export function AppShell({ role }: { role: Role }) {
  const { t } = useTranslation()
  const { lang } = usePrefs()
  const [open, setOpen] = useState(false)
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  return (
    <div className="min-h-dvh bg-background">
      <aside className="fixed inset-y-0 start-0 z-30 hidden w-64 flex-col border-e bg-white lg:flex">
        <Link to="/" className="flex h-16 items-center gap-2 border-b px-5">
          <Logo className="h-6" />
        </Link>
        <p className="px-5 pt-4 pb-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">{t(`roles.${role}`)}</p>
        <div className="flex-1 overflow-y-auto px-3 pb-6">
          <SideNav role={role} />
        </div>
        <p className="border-t px-5 py-3 text-xs text-ink-soft">{t('appFullName')}</p>
      </aside>

      <div className="lg:ps-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-2 border-b bg-white/90 px-4 backdrop-blur sm:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label={t('menu')} onClick={() => setOpen(true)}>
            <Menu className="size-5" aria-hidden />
          </Button>
          <Link to="/" className="lg:hidden">
            <Logo className="h-5" />
          </Link>
          <DemoTag className="hidden md:inline-flex" />
          <div className="ms-auto flex items-center gap-1.5 sm:gap-2">
            <LangToggle />
            <DemoControls />
            <UserMenu />
          </div>
        </header>
        <main id="main" tabIndex={-1} className="container-page py-6 outline-none sm:py-8">
          <MotionPage key={pathname}>
            <Outlet />
          </MotionPage>
        </main>
        <footer className="container-page pb-8 md:hidden">
          <DemoTag />
        </footer>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side={lang === 'ar' ? 'right' : 'left'} className="w-72 p-0">
          <SheetTitle className="flex h-16 items-center border-b px-5">
            <Logo className="h-6" />
          </SheetTitle>
          <div className="overflow-y-auto p-3">
            <SideNav role={role} onNavigate={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
