import { ListChecks } from 'lucide-react'
import { useId } from 'react'
import { useTranslation } from 'react-i18next'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const ITEMS = ['action', 'takeaway', 'realistic'] as const

/** Ungraded checklist the learner ticks to review their own scenario answer. */
export function SelfCheckList() {
  const { t } = useTranslation('learn')
  const id = useId()
  return (
    <section className="card rounded-3xl p-5 sm:p-6" aria-labelledby={`${id}-h`}>
      <h3 id={`${id}-h`} className="flex items-center gap-2 text-base">
        <ListChecks className="size-5 text-blue" aria-hidden />
        {t('scenario.checkTitle')}
      </h3>
      <p className="mt-1 text-sm text-ink-soft">{t('scenario.checkBody')}</p>
      <ul className="mt-3 space-y-1">
        {ITEMS.map((k) => (
          <li key={k} className="flex min-h-11 items-center gap-3">
            <Checkbox id={`${id}-${k}`} />
            <Label htmlFor={`${id}-${k}`} className="text-sm font-normal">
              {t(`scenario.check.${k}`)}
            </Label>
          </li>
        ))}
      </ul>
    </section>
  )
}
