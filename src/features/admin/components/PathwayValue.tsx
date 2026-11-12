import { BookOpen, Bot, Briefcase, HandHeart } from 'lucide-react'
import { useTranslation } from 'react-i18next'

/** Why the pathway stays useful for learners without a role yet (brief §23 step 6). */
export function PathwayValue() {
  const { t } = useTranslation('admin')
  const items = [
    { key: 'learning', icon: BookOpen },
    { key: 'coaching', icon: Bot },
    { key: 'mentoring', icon: HandHeart },
    { key: 'opportunities', icon: Briefcase },
  ]
  return (
    <section aria-labelledby="pathway-value" className="rounded-3xl bg-grad-sky p-5 sm:p-6">
      <h2 id="pathway-value" className="text-lg">
        {t('followup.value.title')}
      </h2>
      <p className="mt-1 max-w-3xl text-sm text-ink-soft">{t('followup.value.body')}</p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((i) => (
          <li key={i.key} className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm">
            <i.icon className="size-5 shrink-0 text-blue" aria-hidden />
            <span className="text-sm">
              <strong className="block">{t(`followup.value.${i.key}.title`)}</strong>
              <span className="text-ink-soft">{t(`followup.value.${i.key}.body`)}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
