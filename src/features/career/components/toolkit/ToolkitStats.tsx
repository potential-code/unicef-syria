import type { Youth } from '@shared/types'
import { FileSignature, HelpCircle, ListChecks, MessageSquareText } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { STAT_TONES, StatCard } from '@/components/shared/StatCard'

/** Toolkit progress as stat cards. Counts only, no scores. */
export function ToolkitStats({ youth }: { youth: Youth }) {
  const { t } = useTranslation('career')
  const tk = youth.toolkit
  const stats = [
    { label: t('toolkit.stats.bullets'), value: tk.cv?.experience.length ?? 0, icon: ListChecks },
    { label: t('toolkit.stats.practice'), value: tk.interviews.length, icon: MessageSquareText },
    {
      label: t('toolkit.stats.questions'),
      value: tk.business?.questions.length ?? 0,
      icon: HelpCircle,
    },
    { label: t('toolkit.stats.proposals'), value: tk.proposals.length, icon: FileSignature },
  ]
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      {stats.map((s, i) => (
        <StatCard
          key={s.label}
          tone={STAT_TONES[i % STAT_TONES.length]}
          icon={s.icon}
          label={s.label}
          value={s.value}
        />
      ))}
    </div>
  )
}
