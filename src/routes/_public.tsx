import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { PublicHeader } from '@/components/layout/PublicHeader'
import { LenisProvider } from '@/components/motion'

/** Public site: smooth scrolling (Lenis) and heavy motion live here only. */
function PublicLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const overHero = pathname === '/'
  return (
    <LenisProvider>
      <PublicHeader overHero={overHero} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <PublicFooter />
    </LenisProvider>
  )
}

export const Route = createFileRoute('/_public')({ component: PublicLayout })
