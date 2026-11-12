import type { CareerRoute } from '@shared/types'
import { BookOpen, SearchX } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Stagger, StaggerItem } from '@/components/motion'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { CATEGORY_LABELS, COURSES } from '@/data/courses'
import { courseStatus } from '@/domain/completion'
import { useLocalized } from '@/i18n'
import { useMyYouth } from '@/store/hooks'
import { CourseCard } from '../components/CourseCard'
import { EMPTY_FILTERS, type Filters, LibraryFilters } from '../components/LibraryFilters'
import { CATEGORY_META, CATEGORY_ORDER, durationBucket, FULL_LESSON_COURSES } from '../config'

/** Y06 course catalogue: 16 courses in five groups with filters and a no-results state. */
export function LibraryPage() {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  const youth = useMyYouth()
  const [f, setF] = useState<Filters>(EMPTY_FILTERS)

  const list = useMemo(() => {
    const q = f.q.trim().toLowerCase()
    return COURSES.filter((c) => {
      if (f.route !== 'all' && c.routes !== 'all' && !c.routes.includes(f.route as CareerRoute))
        return false
      if (f.topic !== 'all' && c.category !== f.topic) return false
      if (f.level !== 'all' && c.level !== f.level) return false
      if (
        f.lang !== 'all' &&
        (FULL_LESSON_COURSES.includes(c.id) ? 'enFull' : 'bilingual') !== f.lang
      )
        return false
      if (f.duration !== 'all' && durationBucket(c.minutes) !== f.duration) return false
      if (f.status !== 'all' && courseStatus(youth.progress[c.id]) !== f.status) return false
      if (!q) return true
      const hay = [
        c.id,
        c.title.en,
        c.title.ar,
        ...c.units.flatMap((u) => [u.title.en, u.title.ar, u.synopsis.en, u.synopsis.ar]),
        ...c.outcomes.map((o) => l(o)),
      ]
      return hay.some((s) => s.toLowerCase().includes(q))
    })
  }, [f, youth.progress, l])

  return (
    <div className="space-y-8">
      <PageHeader title={t('library.title')} description={t('library.subtitle')} />
      <div className="space-y-3">
        <p className="flex items-start gap-2.5 rounded-2xl border border-cyan/30 bg-sky-100 px-4 py-3 text-sm font-medium text-navy">
          <BookOpen className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
          {t('library.openNote')}
        </p>
        <LibraryFilters value={f} onChange={setF} />
        <p className="px-1 text-sm font-semibold text-ink-soft" aria-live="polite">
          {t('library.count', { n: list.length })}
        </p>
      </div>
      {list.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title={t('library.noResults')}
          body={t('library.noResultsBody')}
          action={
            <Button className="rounded-full" onClick={() => setF(EMPTY_FILTERS)}>
              {t('common:clearFilters')}
            </Button>
          }
        />
      ) : (
        CATEGORY_ORDER.map((cat) => {
          const items = list.filter((c) => c.category === cat)
          if (!items.length) return null
          const meta = CATEGORY_META[cat]
          return (
            <section key={cat} aria-labelledby={`cat-${cat}`}>
              <h2 id={`cat-${cat}`} className="mb-4 flex items-center gap-2.5 text-xl">
                <span className={`h-6 w-1.5 rounded-full ${meta.block}`} aria-hidden />
                {l(CATEGORY_LABELS[cat])}
                <span className="text-sm font-semibold text-ink-soft">({items.length})</span>
              </h2>
              {cat === 'technical' && (
                <p className="-mt-2 mb-4 text-sm text-ink-soft">{t('library.tasterNote')}</p>
              )}
              <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((c) => (
                  <StaggerItem key={c.id} className="h-full">
                    <CourseCard course={c} youth={youth} />
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          )
        })
      )}
    </div>
  )
}
