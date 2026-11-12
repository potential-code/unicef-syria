import { Link } from '@tanstack/react-router'
import { ArrowRight, Check } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { easeOut } from '@/components/motion/variants'
import { SmartImage } from '@/components/shared/SmartImage'
import { COURSE_BY_ID } from '@/data/courses'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import type { ROUTE_CARDS } from '../../config'

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
}

/**
 * One career-route card: photo, route copy, three skills and starter courses. When `animate`
 * is set, the photo wipes in from the start side and the copy rises line by line.
 */
export function RouteCard({
  route,
  index,
  animate = false,
}: {
  route: (typeof ROUTE_CARDS)[number]
  index: number
  animate?: boolean
}) {
  const { t } = useTranslation('public')
  const { l, dir } = useLocalized()
  const Icon = route.icon
  const points = t(`home.routes.${route.id}.points`, { returnObjects: true }) as string[]
  const from = dir === 'rtl' ? 'inset(0% 0% 0% 100% round 0)' : 'inset(0% 100% 0% 0% round 0)'
  const Line = animate ? motion.div : 'div'
  const lineProps = animate ? { variants: item } : {}
  return (
    <article
      id={`route-${route.id}`}
      className="card group relative grid min-w-0 overflow-hidden md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
    >
      <motion.div
        className="relative min-h-56 overflow-hidden md:min-h-full"
        initial={animate ? { clipPath: from } : false}
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 0)' }}
        transition={{ duration: 0.8, ease: easeOut }}
      >
        <motion.div
          className="absolute inset-0"
          initial={animate ? { scale: 1.12 } : false}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: easeOut }}
        >
          <SmartImage
            src={route.image}
            alt={t(`home.routes.${route.id}.alt`)}
            className="absolute inset-0 size-full"
          />
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-t from-navy/60 via-transparent to-transparent" />
        <span className="absolute start-4 bottom-3 text-4xl font-extrabold text-white drop-shadow">
          0{index + 1}
        </span>
      </motion.div>
      <motion.div
        className="flex min-w-0 flex-col justify-center gap-3 p-6 lg:p-8"
        initial={animate ? 'hidden' : false}
        animate="show"
        transition={{ staggerChildren: 0.07, delayChildren: 0.2 }}
      >
        <Line {...lineProps}>
          <span
            className={cn(
              'inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold',
              route.tone,
            )}
          >
            <Icon className="size-3.5" aria-hidden />
            {t(`common:routes.${route.id}`)}
          </span>
        </Line>
        <Line {...lineProps}>
          <h3 className="text-xl sm:text-2xl">{t(`home.routes.${route.id}.title`)}</h3>
        </Line>
        <Line {...lineProps}>
          <p className="text-ink-soft">{t(`home.routes.${route.id}.body`)}</p>
        </Line>
        <Line {...lineProps}>
          <ul className="space-y-1.5">
            {points.map((p) => (
              <li key={p} className="flex gap-2 text-sm font-medium">
                <Check className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </Line>
        <Line {...lineProps} className="mt-2 border-t pt-4">
          <p className="mb-2 text-[11px] font-bold tracking-widest text-ink-soft uppercase">
            {t('home.routes.starter')}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {route.courses.map((id) => (
              <Link
                key={id}
                to="/explore/$courseId"
                params={{ courseId: id }}
                className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-navy transition-colors hover:bg-sky-200"
              >
                {l(COURSE_BY_ID[id].title)}
              </Link>
            ))}
          </div>
          <Link
            to="/explore"
            search={{ route: route.id }}
            className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-sm font-bold text-blue hover:underline"
          >
            {t('home.routes.cta')}
            <ArrowRight className="size-4 rtl-mirror" aria-hidden />
          </Link>
        </Line>
      </motion.div>
    </article>
  )
}
