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
    <section aria-labelledby="pathway-value" className="card relative overflow-hidden p-5 sm:p-6">
      <h2 id="pathway-value" className="relative text-xl">
        {t('followup.value.title')}
      </h2>
      <p className="relative mt-1 max-w-3xl text-sm text-ink-soft">{t('followup.value.body')}</p>
      <ul className="relative mt-4 grid grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),1fr))] gap-3">
        {items.map((i) => (
          <li key={i.key} className="flex gap-3 rounded-xl bg-sky-50 p-4 ring-1 ring-sky-200">
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
