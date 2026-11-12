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
import { PanelHeader } from './PanelHeader'

/** Practical submissions awaiting a rubric review. */
export function GradingPanel({ stats }: { stats: LearnerStats[] }) {
  const { t } = useTranslation('trainer')
  const { l } = useLocalized()
  const rows = stats.flatMap((s) => s.pendingPracticals.map((c) => ({ s, c })))
  return (
    <section className="card flex flex-col p-5 sm:p-6">
      <PanelHeader
        icon={ClipboardCheck}
        title={t('dashboard.gradingTitle')}
        body={t('dashboard.gradingBody')}
        count={rows.length}
      />
      {rows.length === 0 ? (
        <EmptyState
          className="mt-4 py-6"
          icon={Inbox}
          title={t('assessments.empty')}
          body={t('assessments.emptyBody')}
        />
      ) : (
        <ul className="mt-3 divide-y divide-border/70">
          {rows.map(({ s, c }) => (
            <li
              key={`${s.youth.id}-${c}`}
              className="-mx-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 rounded-xl px-2 py-2 transition-colors hover:bg-sky-50/70"
            >
              <LearnerName
                youth={s.youth}
                sub={`${c} · ${l(COURSE_BY_ID[c].title)}`}
                className="min-w-0 flex-1"
              />
              <StatusBadge tone="info">{t('practical.submitted')}</StatusBadge>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-auto pt-4">
        <Button asChild variant="outline" size="sm" className="rounded-full">
          <Link to="/trainer/assessments">
            {t('dashboard.openQueue')}
            <ArrowRight className="size-4 rtl-mirror" aria-hidden />
          </Link>
        </Button>
      </div>
    </section>
  )
}
