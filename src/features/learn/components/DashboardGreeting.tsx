import type { Youth } from '@shared/types'
import { useTranslation } from 'react-i18next'
import { Avatar } from '@/components/shared/Avatar'
import { PageHeader } from '@/components/shared/PageHeader'
import { ROUTE_META } from '../config'

/** Personal greeting with the youth photo and selected route (page header of the dashboard). */
export function DashboardGreeting({ youth }: { youth: Youth }) {
  const { t } = useTranslation('learn')
  const first = youth.profile.name.split(' ')[0] ?? youth.profile.name
  const meta = youth.route ? ROUTE_META[youth.route] : null
  return (
    <div className="flex items-center gap-4 [&>header]:mb-0">
      <span className="shrink-0 rounded-full bg-grad-sunrise p-1 shadow-md">
        <Avatar
          src={youth.image}
          name={youth.profile.name}
          size={72}
          className="border-4 border-white"
        />
      </span>
      <PageHeader
        eyebrow={<p className="text-sm font-semibold text-blue">{t('dash.hello')}</p>}
        title={t('dash.greeting', { name: first })}
        description={
          meta && youth.route ? (
            <span className="flex flex-wrap items-center gap-2 text-sm">
              {t('dash.yourRoute')}
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-bold ${meta.block}`}
              >
                <meta.icon className="size-4" aria-hidden />
                {t(`common:routes.${youth.route}`)}
              </span>
            </span>
          ) : (
            t('dash.subtitle')
          )
        }
      />
    </div>
  )
}
