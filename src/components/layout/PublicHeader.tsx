import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LangToggle } from '@/components/shared/LangToggle'
import { Logo } from '@/components/shared/Logo'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { usePrefs } from '@/store/actions/session'
import { DemoControls } from './DemoControls'

const LINKS = [
  { to: '/', key: 'home' },
  { to: '/explore', key: 'explore' },
  { to: '/opportunities', key: 'opportunities' },
  { to: '/partners', key: 'partners' },
] as const

/**
 * Public site header (h-16). `overHero` is fixed and starts transparent with the white logo over
 * the dark hero, turning solid white once the page scrolls. Other pages use a sticky header that
 * takes its own space in the flow, so it never covers the page content.
 */
export function PublicHeader({ overHero = false }: { overHero?: boolean }) {
  const { t } = useTranslation('public')
  const { lang } = usePrefs()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const dark = overHero && !scrolled
  return (
    <header
      className={cn(
        'inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-300',
        overHero ? 'fixed' : 'sticky',
        dark
          ? 'on-dark bg-transparent text-white'
          : 'border-b border-border/60 bg-white/95 text-ink shadow-sm backdrop-blur-md',
      )}
    >
      <div className="container-page flex h-16 items-center gap-2 sm:gap-3">
        <Link to="/" className="shrink-0" aria-label={t('common:appFullName')}>
          <Logo variant={dark ? 'white' : 'blue'} className="h-5 sm:h-6" />
        </Link>
        <nav aria-label={t('common:menu')} className="ms-8 hidden items-center gap-0.5 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              className={cn(
                'rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors',
                dark
                  ? 'hover:bg-white/15 data-[status=active]:bg-white/20'
                  : 'text-ink-soft hover:bg-sky-50 hover:text-ink data-[status=active]:bg-sky-100 data-[status=active]:text-blue',
              )}
            >
              {t(`nav.${l.key}`)}
            </Link>
          ))}
        </nav>
        <div className="ms-auto flex min-w-0 items-center gap-1 sm:gap-1.5">
          <LangToggle onDark={dark} className="hidden sm:inline-flex" />
          <DemoControls onDark={dark} className="hidden sm:inline-flex" />
          <Button
            asChild
            size="sm"
            variant="ghost"
            className={cn(
              'hidden sm:inline-flex',
              dark && 'text-white hover:bg-white/15 hover:text-white',
            )}
          >
            <Link to="/sign-in">{t('common:signIn')}</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className={cn('rounded-full px-3.5', dark ? 'bg-yellow text-ink hover:bg-white' : '')}
          >
            <Link to="/register">{t('nav.start')}</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className={cn('lg:hidden', dark && 'text-white hover:bg-white/15')}
            aria-label={t('common:menu')}
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" aria-hidden />
          </Button>
        </div>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side={lang === 'ar' ? 'left' : 'right'} className="w-72">
          <SheetTitle className="px-1 pt-1">
            <Logo className="h-6" />
          </SheetTitle>
          <nav className="mt-4 flex flex-col gap-1 text-ink">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: true }}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-sky-100 data-[status=active]:bg-sky-100 data-[status=active]:text-blue"
              >
                {t(`nav.${l.key}`)}
              </Link>
            ))}
            <Link
              to="/sign-in"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-sky-100 data-[status=active]:bg-sky-100 data-[status=active]:text-blue"
            >
              {t('common:signIn')}
            </Link>
            <div className="flex flex-wrap gap-2 px-3 pt-2">
              <LangToggle />
              <DemoControls />
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}
