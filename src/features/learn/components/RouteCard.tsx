import type { CareerRoute, Dimension } from '@shared/types'
import { ChevronDown, Sparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { DIMENSION_LABELS } from '@/data/assessment'
import { COURSE_BY_ID } from '@/data/courses'
import { ROUTE_PATHS } from '@/domain/paths'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { ROUTE_META } from '../config'

interface Props {
  route: CareerRoute
  top: Dimension[]
  recommended: boolean
  current: boolean
  onChoose: () => void
}

/** Route card with Explore and Choose (brief §4). Never shows a match score. */
export function RouteCard({ route, top, recommended, current, onChoose }: Props) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  const [open, setOpen] = useState(recommended)
  const meta = ROUTE_META[route]
  const families = t(`results.families.${route}`, { returnObjects: true }) as unknown as string[]
  const roles = top.map((d) => t(`results.roles.${route}.${d}`))
  const panel = `route-${route}-details`

  return (
    <motion.article
      whileHover={{ y: -4 }}
      className={cn(
        'flex flex-col overflow-hidden rounded-3xl border bg-white shadow-sm transition-shadow hover:shadow-lg',
        recommended && 'ring-4',
        recommended && meta.ring,
      )}
    >
      <div className={cn('relative p-5', meta.block)}>
        <span
          className="pointer-events-none absolute -end-6 -top-6 size-24 rounded-full bg-white/20"
          aria-hidden
        />
        <div className="relative flex items-center justify-between gap-2">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-white/25">
            <meta.icon className="size-6" aria-hidden />
          </span>
          <span className="flex flex-wrap justify-end gap-1.5">
            {recommended && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-navy">
                <Sparkles className="size-3.5" aria-hidden />
                {t('results.recommended')}
              </span>
            )}
            {current && (
              <span className="rounded-full bg-ink px-2.5 py-1 text-xs font-bold text-white">
                {t('results.current')}
              </span>
            )}
          </span>
        </div>
        <h3 className="relative mt-4 text-2xl text-current">{t(`common:routes.${route}`)}</h3>
        <p className="relative mt-1 text-sm opacity-90">{t(`results.routeLine.${route}`)}</p>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">
          {t('results.familiesLabel')}
        </p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {[...new Set([...roles, ...families])].slice(0, 5).map((f) => (
            <li
              key={f}
              className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-navy"
            >
              {f}
            </li>
          ))}
        </ul>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panel}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-ink-soft">
                {t('results.why')}
              </p>
              <p className="mt-1 text-sm">
                {t(`results.whyRoute.${route}`)}{' '}
                {top.length === 2 &&
                  t('results.whyDims', {
                    a: l(top[0] && DIMENSION_LABELS[top[0]]),
                    b: l(top[1] && DIMENSION_LABELS[top[1]]),
                  })}
                {recommended && ` ${t('results.whyEarning')}`}
              </p>
              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-ink-soft">
                {t('results.courses')}
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                {ROUTE_PATHS[route]
                  .slice(3)
                  .map((id) => l(COURSE_BY_ID[id].title))
                  .join(' · ')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <Button
            variant="ghost"
            className="rounded-full"
            aria-expanded={open}
            aria-controls={panel}
            onClick={() => setOpen(!open)}
          >
            {t('results.explore')}
            <ChevronDown
              className={cn('size-4 transition-transform', open && 'rotate-180')}
              aria-hidden
            />
          </Button>
          <Button className="ms-auto rounded-full" onClick={onChoose}>
            {current ? t('results.keep') : t('results.choose')}
          </Button>
        </div>
      </div>
    </motion.article>
  )
}
