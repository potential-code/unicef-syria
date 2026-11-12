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
      <section className="on-dark relative overflow-hidden rounded-3xl bg-grad-unicef p-5 text-white sm:p-6">
        <span
          className="pointer-events-none absolute -end-10 -top-16 size-48 rounded-full bg-yellow/30 blur-2xl"
          aria-hidden
        />
        <p className="relative flex items-start gap-3 text-sm sm:text-base">
          <BookOpen className="mt-0.5 size-5 shrink-0" aria-hidden />
          {t('library.openNote')}
        </p>
      </section>
      <LibraryFilters value={f} onChange={setF} />
      <p className="text-sm font-semibold text-ink-soft" aria-live="polite">
        {t('library.count', { n: list.length })}
      </p>
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
              <h2 id={`cat-${cat}`} className="mb-4 flex items-center gap-3 text-2xl">
                <span className={`h-8 w-2 rounded-full ${meta.block}`} aria-hidden />
                {l(CATEGORY_LABELS[cat])}
                <span className="text-base font-semibold text-ink-soft">({items.length})</span>
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
