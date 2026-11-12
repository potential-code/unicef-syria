import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
import { DemoTag } from '@/components/shared/DemoTag'
import { Logo } from '@/components/shared/Logo'

export function PublicFooter() {
  const { t } = useTranslation('public')
  return (
    <footer className="on-dark relative overflow-hidden bg-navy text-white">
      <Motif variant="sidebar" className="text-white/[0.07]" />
      <div className="container-page relative grid gap-8 py-12 md:grid-cols-[2fr_1fr_1fr]">
        <div className="space-y-3">
          <Logo variant="white" className="h-6" />
          <p className="max-w-sm text-sm text-white/80">{t('footer.tagline')}</p>
          <DemoTag onDark />
        </div>
        <div>
          <p className="mb-3 text-xs font-bold tracking-widest text-cyan uppercase">
            {t('footer.youth')}
          </p>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link to="/register" className="hover:text-white hover:underline">
                {t('nav.start')}
              </Link>
            </li>
            <li>
              <Link to="/explore" className="hover:text-white hover:underline">
                {t('nav.explore')}
              </Link>
            </li>
            <li>
              <Link to="/opportunities" className="hover:text-white hover:underline">
                {t('nav.opportunities')}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-xs font-bold tracking-widest text-cyan uppercase">
            {t('footer.organisations')}
          </p>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link to="/partners" className="hover:text-white hover:underline">
                {t('nav.partners')}
              </Link>
            </li>
            <li>
              <Link to="/sign-in" className="hover:text-white hover:underline">
                {t('common:signIn')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/15">
        <p className="container-page py-4 text-xs text-white/80">{t('footer.disclaimer')}</p>
      </div>
    </footer>
  )
}
