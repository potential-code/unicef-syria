import { EyeOff, ShieldCheck, Trophy } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'

/** Moderation, privacy and no-leaderboard commitments (brief §14 Y13). */
export function CommunityRules() {
  const { t } = useTranslation('career')
  const items = [
    { icon: ShieldCheck, text: t('community.rules.moderated') },
    { icon: EyeOff, text: t('community.rules.privacy') },
    { icon: Trophy, text: t('community.rules.noRanking') },
  ]
  return (
    <aside className="relative overflow-hidden rounded-2xl bg-[linear-gradient(150deg,var(--unicef-navy),#002a73)] p-5 text-white shadow-md on-dark [&>*:not(:first-child)]:relative">
      <Motif variant="corner" className="text-cyan/25" />
      <h2 className="text-base text-white">{t('community.rules.title')}</h2>
      <ul className="mt-3 space-y-3 text-sm text-white/90">
        {items.map((it) => (
          <li key={it.text} className="flex gap-2.5">
            <it.icon className="mt-0.5 size-4 shrink-0 text-yellow" aria-hidden />
            {it.text}
          </li>
        ))}
      </ul>
    </aside>
  )
}
