import { FileText, FolderOpen, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Stagger, StaggerItem } from '@/components/motion'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import { COURSE_BY_ID } from '@/data/courses'
import { COHORT_COURSES, COHORTS } from '@/data/orgs'
import { TEMPLATE_BY_ID } from '@/data/templates'
import { useLocalized } from '@/i18n'
import { type ResourceLink, ResourceLinkForm } from '../components/ResourceLinkForm'
import { useTrainerScope } from '../hooks/useTrainerScope'

/** T04 Learning resources: course materials for the trainer's cohorts and new resource links. */
export function TrainerResourcesPage() {
  const { t } = useTranslation('trainer')
  const { l } = useLocalized()
  const { cohortIds } = useTrainerScope()
  const [links, setLinks] = useState<ResourceLink[]>([])
  const courses = cohortIds.flatMap((k) => COHORT_COURSES[k])
  const targets = [...cohortIds, ...courses]
  const label = (id: string) =>
    id.startsWith('K')
      ? l(COHORTS.find((c) => c.id === id)?.name)
      : `${id} ${l(COURSE_BY_ID[id as keyof typeof COURSE_BY_ID]?.title)}`

  return (
    <div className="space-y-6">
      <PageHeader title={t('resources.title')} description={t('resources.subtitle')} />
      <div className="grid gap-6 lg:grid-cols-[1fr_24rem] [&>*]:min-w-0">
        <div className="space-y-6">
          <section className="space-y-3">
            <h2 className="text-lg">{t('resources.courseMaterials')}</h2>
            <Stagger className="grid gap-4 sm:grid-cols-2">
              {courses.map((c) => {
                const course = COURSE_BY_ID[c]
                return (
                  <StaggerItem key={c} className="rounded-2xl border bg-card p-5 shadow-sm">
                    <p className="text-xs font-semibold text-blue">{c}</p>
                    <p className="font-bold">{l(course.title)}</p>
                    <ul className="mt-3 space-y-1.5">
                      {course.resources.map((r) => (
                        <li key={r} className="flex items-center gap-2 text-sm">
                          <FileText className="size-4 text-blue" aria-hidden />
                          {l(TEMPLATE_BY_ID[r].title)}
                        </li>
                      ))}
                      {course.resources.length === 0 && (
                        <li className="text-sm text-ink-soft">{t('resources.noMaterials')}</li>
                      )}
                    </ul>
                    <p className="mt-3 border-t pt-3 text-xs text-ink-soft">
                      <span className="font-semibold text-ink">
                        {t('resources.practicalTask')}:
                      </span>{' '}
                      {l(course.practicalTask)}
                    </p>
                  </StaggerItem>
                )
              })}
            </Stagger>
          </section>
          <section className="space-y-3">
            <h2 className="text-lg">{t('resources.linkedTitle')}</h2>
            {links.length === 0 ? (
              <EmptyState
                icon={FolderOpen}
                title={t('resources.empty')}
                body={t('resources.emptyBody')}
              />
            ) : (
              <ul className="space-y-2">
                {links.map((r) => (
                  <li
                    key={r.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-white p-3"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold">{l(TEMPLATE_BY_ID[r.template].title)}</p>
                      <p className="text-sm text-ink-soft">{r.task}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge tone="brand">{label(r.target)}</StatusBadge>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={t('resources.remove')}
                        onClick={() => setLinks(links.filter((x) => x.id !== r.id))}
                      >
                        <Trash2 className="size-4" aria-hidden />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ResourceLinkForm targets={targets} onAdd={(r) => setLinks([r, ...links])} />
        </div>
      </div>
    </div>
  )
}
