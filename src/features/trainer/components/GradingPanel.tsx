import { Link } from '@tanstack/react-router'
import { ArrowRight, ClipboardCheck, Inbox } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/components/shared/EmptyState'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import { COURSE_BY_ID } from '@/data/courses'
import { useLocalized } from '@/i18n'
import type { LearnerStats } from '../hooks/useTrainerScope'
import { LearnerName } from './LearnerName'

/** Practical submissions awaiting a rubric review. */
export function GradingPanel({ stats }: { stats: LearnerStats[] }) {
  const { t } = useTranslation('trainer')
  const { l } = useLocalized()
  const rows = stats.flatMap((s) => s.pendingPracticals.map((c) => ({ s, c })))
  return (
    <section className="rounded-2xl border bg-card p-5 shadow-sm">
      <h2 className="flex items-center gap-2 text-lg">
        <ClipboardCheck className="size-5 text-blue" aria-hidden />
        {t('dashboard.gradingTitle')}
      </h2>
      <p className="mt-1 text-sm text-ink-soft">{t('dashboard.gradingBody')}</p>
      {rows.length === 0 ? (
        <EmptyState
          className="mt-4 py-6"
          icon={Inbox}
          title={t('assessments.empty')}
          body={t('assessments.emptyBody')}
        />
      ) : (
        <ul className="mt-4 divide-y">
          {rows.map(({ s, c }) => (
            <li
              key={`${s.youth.id}-${c}`}
              className="flex flex-wrap items-center justify-between gap-3 py-3"
            >
              <LearnerName youth={s.youth} sub={`${c} · ${l(COURSE_BY_ID[c].title)}`} />
              <StatusBadge tone="info">{t('practical.submitted')}</StatusBadge>
            </li>
          ))}
        </ul>
      )}
      <Button asChild variant="secondary" size="sm" className="mt-4 rounded-full">
        <Link to="/trainer/assessments">
          {t('dashboard.openQueue')}
          <ArrowRight className="size-4 rtl-mirror" aria-hidden />
        </Link>
      </Button>
    </section>
  )
}
