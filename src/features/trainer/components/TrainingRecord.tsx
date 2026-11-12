import { BellRing, CalendarCheck, FileText, GraduationCap, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/components/shared/EmptyState'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { formatDate, useLocalized } from '@/i18n'
import type { RecordItem } from '../hooks/useLearnerRecord'

const ICONS = {
  application: FileText,
  course: GraduationCap,
  attendance: CalendarCheck,
  reminder: BellRing,
  points: Sparkles,
}

/** Chronological training record (oldest first). */
export function TrainingRecord({ items }: { items: RecordItem[] }) {
  const { t } = useTranslation('trainer')
  const { l, lang } = useLocalized()
  if (items.length === 0)
    return (
      <EmptyState icon={FileText} title={t('learner.noRecord')} body={t('learner.noRecordBody')} />
    )
  return (
    <ol className="relative space-y-4 border-s-2 border-sky-200 ps-6">
      {items.map((it) => {
        const Icon = ICONS[it.kind]
        return (
          <li key={it.id} className="relative">
            <span
              className="absolute -start-[31px] top-1 size-3 rounded-full border-2 border-white bg-blue shadow-sm"
              aria-hidden
            />
            <p className="flex items-center gap-1.5 text-xs font-medium text-ink-soft tabular-nums">
              <Icon className="size-3.5 text-blue" aria-hidden />
              {formatDate(it.at, lang)}
            </p>
            <p className="font-semibold text-ink">{l(it.text)}</p>
            {it.detail && it.kind === 'attendance' && (
              <StatusBadge
                className="mt-1"
                tone={
                  it.detail === 'present'
                    ? 'success'
                    : it.detail === 'absent'
                      ? 'danger'
                      : 'neutral'
                }
              >
                {t(`common:attendance.${it.detail}`)}
              </StatusBadge>
            )}
            {it.detail && it.kind === 'application' && (
              <StatusBadge className="mt-1" tone="brand">
                {t(`appStatus.${it.detail}`)}
              </StatusBadge>
            )}
            {it.detail && it.kind === 'points' && (
              <p className="text-xs text-ink-soft">
                {t('common:points', { count: Number(it.detail) })}
              </p>
            )}
          </li>
        )
      })}
    </ol>
  )
}
