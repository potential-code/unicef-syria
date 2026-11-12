import { Info, SearchX } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Stagger, StaggerItem } from '@/components/motion'
import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/button'
import { COURSES } from '@/data/courses'
import { CENTRES } from '@/data/orgs'
import { usePageTitle } from '@/hooks/use-page-title'
import { CatalogueFilters } from '../components/CatalogueFilters'
import { CourseCard } from '../components/CourseCard'
import { PageBanner } from '../components/PageBanner'
import { centresOffering, type ExploreSearch } from '../config'

/** P02 catalogue preview: public course summaries with six filters, before registration. */
export function ExplorePage({
  search,
  onSearch,
}: {
  search: ExploreSearch
  onSearch: (s: ExploreSearch) => void
}) {
  const { t } = useTranslation('public')
  usePageTitle(t('explore.title'))
  const results = COURSES.filter((c) => {
    const at = centresOffering(c.id)
    if (search.route && c.routes !== 'all' && !c.routes.includes(search.route)) return false
    if (search.category && c.category !== search.category) return false
    if (search.level && c.level !== search.level) return false
    if (search.delivery === 'blended' && at.length === 0) return false
    if (
      search.governorate &&
      !at.some((id) => CENTRES.find((x) => x.id === id)?.governorate === search.governorate)
    )
      return false
    if (search.centre && !at.includes(search.centre)) return false
    return true
  })
  return (
    <>
      <PageBanner
        eyebrow={t('explore.eyebrow')}
        title={t('explore.title')}
        body={t('explore.body')}
      />
      <div className="container-page relative pt-6 pb-20">
        <CatalogueFilters value={search} onChange={onSearch} />
        <p className="mt-4 flex gap-2 rounded-xl bg-sky-100 px-4 py-2.5 text-sm text-navy">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          {t('explore.honest')}
        </p>
        <p className="mt-8 mb-4 text-sm font-semibold text-ink-soft" aria-live="polite">
          {t('explore.count', { count: results.length })}
        </p>
        {results.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title={t('common:noResults')}
            body={t('explore.empty')}
            action={
              <Button variant="outline" className="rounded-full" onClick={() => onSearch({})}>
                {t('common:clearFilters')}
              </Button>
            }
          />
        ) : (
          <Stagger
            key={JSON.stringify(search)}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {results.map((c) => (
              <StaggerItem key={c.id} className="h-full">
                <CourseCard course={c} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </>
  )
}
