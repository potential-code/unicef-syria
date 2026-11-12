import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { usePrefs } from '@/store/actions/session'

function Root() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const { lang } = usePrefs()
  return (
    <MotionConfig reducedMotion={reduce ? 'always' : 'never'}>
      <a href="#main" className="sr-only z-50 rounded-lg bg-white px-4 py-2 focus:not-sr-only focus:fixed focus:start-4 focus:top-4">
        {t('skip')}
      </a>
      <Outlet />
      <Toaster position="top-center" closeButton dir={lang === 'ar' ? 'rtl' : 'ltr'} />
    </MotionConfig>
  )
}

function NotFound() {
  const { t } = useTranslation()
  return (
    <main id="main" tabIndex={-1} className="container-page flex min-h-dvh flex-col items-start justify-center gap-4 py-16">
      <h1 className="text-3xl">{t('notFound.title')}</h1>
      <p>{t('notFound.body')}</p>
      <Button asChild>
        <Link to="/">{t('notFound.home')}</Link>
      </Button>
    </main>
  )
}

export const Route = createRootRoute({ component: Root, notFoundComponent: NotFound })
