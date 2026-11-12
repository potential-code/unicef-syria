import type { CourseId, Youth, YouthId } from '@shared/types'
import { ClipboardCheck, Inbox } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import { COURSE_BY_ID } from '@/data/courses'
import { COHORT_COURSES } from '@/data/orgs'
import { useLocalized } from '@/i18n'
import { parseReview } from '@/store/actions/work-extra'
import { useDb } from '@/store/db'
import { LearnerName } from '../components/LearnerName'
import { ReviewDialog } from '../components/ReviewDialog'
import { SegmentTabs } from '../components/SegmentTabs'
import { useTrainerScope } from '../hooks/useTrainerScope'

type Tab = 'submitted' | 'returned' | 'approved'
const TABS: Tab[] = ['submitted', 'returned', 'approved']

/** T04 practical submissions queue for the trainer's learners, reviewed with the sample rubric. */
export function TrainerAssessmentsPage() {
  const { t } = useTranslation('trainer')
  const { l } = useLocalized()
  const { learners } = useTrainerScope()
  const notes = useDb((db) => db.sessionNotes)
  const [tab, setTab] = useState<Tab>('submitted')
  const [open, setOpen] = useState<{ youthId: YouthId; courseId: CourseId } | null>(null)

  const all = learners.flatMap((y) =>
    Object.values(y.progress).flatMap((p) => {
      if (!p || p.practical === 'none') return []
      const review = parseReview(notes[`review:${y.id}:${p.courseId}`])
      const cohortCourse = y.cohortIds.some((k) => COHORT_COURSES[k].includes(p.courseId))
      if (p.practical === 'approved' && !review && !cohortCourse) return []
      return [{ y, courseId: p.courseId, state: p.practical as Tab, review }]
    }),
  )
  const rows = all.filter((r) => r.state === tab)
  const openYouth: Youth | undefined = open
    ? learners.find((y) => y.id === open.youthId)
    : undefined

  return (
    <div className="space-y-6">
      <PageHeader title={t('assessments.title')} description={t('assessments.subtitle')} />
      <SegmentTabs
        value={tab}
        onChange={setTab}
        items={TABS.map((s) => ({
          value: s,
          label: t(`practical.${s}`),
          count: all.filter((r) => r.state === s).length,
        }))}
      />
      {rows.length === 0 ? (
        <EmptyState
          icon={tab === 'submitted' ? Inbox : ClipboardCheck}
          title={tab === 'submitted' ? t('assessments.empty') : t('assessments.emptyTab')}
          body={t('assessments.emptyBody')}
        />
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 [&>*]:min-w-0">
          {rows.map(({ y, courseId, review }) => (
            <li key={`${y.id}-${courseId}`} className="card flex flex-col gap-4 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <LearnerName youth={y} sub={y.cohortIds.join(', ')} className="min-w-0 flex-1" />
                <StatusBadge
                  className="shrink-0"
                  tone={tab === 'approved' ? 'success' : tab === 'returned' ? 'notice' : 'info'}
                >
                  {t(`practical.${tab}`)}
                </StatusBadge>
              </div>
              <div className="border-t border-border/70 pt-3">
                <p className="text-xs font-bold tracking-wide text-blue uppercase">{courseId}</p>
                <p className="mt-0.5 font-bold text-navy">{l(COURSE_BY_ID[courseId].title)}</p>
                <p className="mt-1 line-clamp-2 text-sm text-ink-soft">
                  {l(COURSE_BY_ID[courseId].practicalTask)}
                </p>
              </div>
              {review && (
                <div className="rounded-xl bg-sky-50 p-3 text-sm ring-1 ring-cyan/20">
                  <p className="font-semibold text-navy tabular-nums">
                    {t('review.total', { total: review.scores.reduce((a, b) => a + b, 0), max: 6 })}
                  </p>
                  {review.feedback && <p className="mt-1 text-ink-soft">{review.feedback}</p>}
                </div>
              )}
              {tab === 'submitted' && (
                <Button
                  className="mt-auto self-start rounded-full"
                  size="sm"
                  onClick={() => setOpen({ youthId: y.id, courseId })}
                >
                  {t('assessments.open')}
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}
      <p className="text-xs text-ink-soft">{t('assessments.rubricNote')}</p>
      {open && openYouth && (
        <ReviewDialog youth={openYouth} courseId={open.courseId} onClose={() => setOpen(null)} />
      )}
    </div>
  )
}
