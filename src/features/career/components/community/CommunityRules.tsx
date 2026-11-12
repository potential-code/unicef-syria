import { EyeOff, ShieldCheck, Trophy } from 'lucide-react'
import { useTranslation } from 'react-i18next'

/** Moderation, privacy and no-leaderboard commitments (brief §14 Y13). */
export function CommunityRules() {
  const { t } = useTranslation('career')
  const items = [
    { icon: ShieldCheck, text: t('community.rules.moderated') },
    { icon: EyeOff, text: t('community.rules.privacy') },
    { icon: Trophy, text: t('community.rules.noRanking') },
  ]
  return (
    <aside className="rounded-2xl bg-navy p-5 text-white on-dark">
      <h2 className="text-lg text-white">{t('community.rules.title')}</h2>
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
