import type { Toolkit, Youth } from '@shared/types'
import { Briefcase, Clock, Images, Tag } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
import { Avatar } from '@/components/shared/Avatar'
import { COURSE_BY_ID } from '@/data/courses'
import { useLocalized } from '@/i18n'
import { completedCourses } from '../../lib/youth'

type Profile = NonNullable<Toolkit['freelanceProfile']>

/**
 * What a client sees: name, service, samples, availability, completed courses and optional
 * pricing. No contact details, assessment answers or support information.
 */
export function ClientPreview({ youth, profile }: { youth: Youth; profile: Profile }) {
  const { t } = useTranslation('career')
  const { l } = useLocalized()
  const courses = completedCourses(youth)
  const row = (Icon: typeof Tag, label: string, value: string) =>
    value.trim() ? (
      <div className="flex gap-3">
        <Icon className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">{label}</p>
          <p className="text-sm whitespace-pre-line">{value}</p>
        </div>
      </div>
    ) : null
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="overflow-hidden rounded-3xl border border-border/70 bg-white shadow-lg"
    >
      <div className="relative h-20 overflow-hidden bg-grad-unicef">
        <Motif variant="card" className="text-white/15" />
        <span className="absolute end-4 top-3 rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold text-white">
          {t('toolkit.freelance.clientView')}
        </span>
      </div>
      <div className="relative -mt-8 space-y-4 p-5">
        <Avatar
          src={youth.image}
          name={youth.profile.name}
          size={64}
          className="ring-4 ring-white"
        />
        <div>
          <h3 className="text-xl">{youth.profile.name}</h3>
          <p className="text-sm font-semibold text-blue">
            {profile.services || t('toolkit.freelance.noService')}
          </p>
        </div>
        {row(Images, t('toolkit.freelance.fields.samples'), profile.samples)}
        {row(Clock, t('toolkit.freelance.fields.availability'), profile.availability)}
        {row(Briefcase, t('toolkit.freelance.fields.assignments'), profile.assignments)}
        {row(Tag, t('toolkit.freelance.fields.pricing'), profile.pricing)}
        {courses.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {courses.map((id) => (
              <span
                key={id}
                className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-navy"
              >
                {l(COURSE_BY_ID[id].title)}
              </span>
            ))}
          </div>
        )}
        <p className="border-t pt-3 text-xs text-ink-soft">{t('toolkit.freelance.privacy')}</p>
      </div>
    </motion.article>
  )
}
