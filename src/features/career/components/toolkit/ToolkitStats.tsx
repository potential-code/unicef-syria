import type { Youth } from '@shared/types'
import { useTranslation } from 'react-i18next'

/** Quick progress chips in the toolkit hero. Counts only, no scores. */
export function ToolkitStats({ youth }: { youth: Youth }) {
  const { t } = useTranslation('career')
  const tk = youth.toolkit
  const chips = [
    { label: t('toolkit.stats.bullets'), value: tk.cv?.experience.length ?? 0 },
    { label: t('toolkit.stats.practice'), value: tk.interviews.length },
    { label: t('toolkit.stats.questions'), value: tk.business?.questions.length ?? 0 },
    { label: t('toolkit.stats.proposals'), value: tk.proposals.length },
  ]
  return (
    <ul className="flex flex-wrap gap-2">
      {chips.map((c) => (
        <li
          key={c.label}
          className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm text-white"
        >
          <span className="text-lg font-bold tabular-nums">{c.value}</span>
          {c.label}
        </li>
      ))}
    </ul>
  )
}
