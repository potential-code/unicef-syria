import { Link } from '@tanstack/react-router'
import { ArrowRight, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SmartImage } from '@/components/shared/SmartImage'
import { COURSE_BY_ID } from '@/data/courses'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import type { ROUTE_CARDS } from '../../config'

/** One big career-route card: photo, route copy, three example skills and starter courses. */
export function RouteCard({
  route,
  index,
  wide,
}: {
  route: (typeof ROUTE_CARDS)[number]
  index: number
  wide: boolean
}) {
  const { t } = useTranslation('public')
  const { l } = useLocalized()
  const Icon = route.icon
  const points = t(`home.routes.${route.id}.points`, { returnObjects: true }) as string[]
  return (
    <article
      data-route-card
      className={cn(
        'group relative grid overflow-hidden rounded-[2rem] bg-white shadow-lg md:grid-cols-[1fr_1.1fr]',
        wide && 'lg:w-[min(64rem,78vw)] lg:shrink-0',
      )}
    >
      <div className="relative min-h-64 overflow-hidden md:min-h-full">
        <SmartImage
          src={route.image}
          alt={t(`home.routes.${route.id}.alt`)}
          className="absolute inset-0 size-full transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute start-5 top-5 text-7xl font-extrabold text-white/90 drop-shadow-lg">
          0{index + 1}
        </span>
      </div>
      <div className="flex flex-col gap-4 p-6 sm:p-8 lg:p-10">
        <span
          className={cn(
            'inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-bold',
            route.tone,
          )}
        >
          <Icon className="size-4" aria-hidden />
          {t(`common:routes.${route.id}`)}
        </span>
        <h3 className="text-3xl sm:text-4xl">{t(`home.routes.${route.id}.title`)}</h3>
        <p className="text-ink-soft">{t(`home.routes.${route.id}.body`)}</p>
        <ul className="space-y-2">
          {points.map((p) => (
            <li key={p} className="flex gap-2 text-sm font-medium">
              <Check className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-auto border-t pt-4">
          <p className="mb-2 text-xs font-bold tracking-wide text-ink-soft uppercase">
            {t('home.routes.starter')}
          </p>
          <div className="flex flex-wrap gap-2">
            {route.courses.map((id) => (
              <Link
                key={id}
                to="/explore/$courseId"
                params={{ courseId: id }}
                className="rounded-full bg-sky-100 px-3 py-1.5 text-sm font-semibold text-navy hover:bg-sky-200"
              >
                {l(COURSE_BY_ID[id].title)}
              </Link>
            ))}
          </div>
          <Link
            to="/explore"
            search={{ route: route.id }}
            className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-bold text-blue hover:underline"
          >
            {t('home.routes.cta')}
            <ArrowRight className="size-4 rtl-mirror" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  )
}
