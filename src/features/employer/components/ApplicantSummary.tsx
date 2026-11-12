import type { Youth } from '@shared/types'
import { Clock, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Avatar } from '@/components/shared/Avatar'
import { declaredSkills } from '../lib/match'

/** Applicant summary limited to employer-visible fields (no assessment, disability, support or notes). */
export function ApplicantSummary({ youth }: { youth: Youth }) {
  const { t } = useTranslation('employer')
  return (
    <section className="card p-5">
      <div className="flex items-center gap-3">
        <Avatar src={youth.image} name={youth.profile.name} size={56} />
        <div className="min-w-0">
          <h2 className="text-lg text-navy">{youth.profile.name}</h2>
          <p className="flex flex-wrap gap-x-3 text-sm text-ink-soft">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" aria-hidden />
              {t(`governorates.${youth.profile.governorate}`)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden />
              {youth.profile.availability}
            </span>
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm">
        <span className="font-semibold">{t('candidates.skills')}: </span>
        {declaredSkills(youth).join(', ') || t('candidates.none')}
      </p>
      <p className="mt-3 rounded-xl bg-sky-50 p-3 text-xs text-navy ring-1 ring-cyan/20">
        {t('detail.privacy')}
      </p>
    </section>
  )
}
