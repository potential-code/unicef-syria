import { BadgeInfo } from 'lucide-react'
import { useTranslation } from 'react-i18next'

/** Every mentor card says "Sample mentor profile" (brief §13 Y10). */
export function SampleProfileTag() {
  const { t } = useTranslation('career')
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-yellow/30 px-2.5 py-0.5 text-xs font-bold text-ink">
      <BadgeInfo className="size-3.5" aria-hidden />
      {t('mentors.sampleProfile')}
    </span>
  )
}
