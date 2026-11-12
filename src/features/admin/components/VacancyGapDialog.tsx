import { Briefcase } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { StatusBadge } from '@/components/shared/StatusBadge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { COURSE_BY_ID } from '@/data/courses'
import { SKILL_GAPS } from '@/data/labour'
import { useOpportunities } from '@/store/actions/applications'
import { VACANCY_GAPS } from '../config'
import { useLabels } from '../lib/useLabels'

/** The vacancy records behind the skills-gap alert, with the course that builds the skill. */
export function VacancyGapDialog({
  governorates,
  trigger,
}: {
  governorates: string[]
  trigger: ReactNode
}) {
  const { t } = useTranslation('admin')
  const { l, value } = useLabels()
  const opps = useOpportunities()
  const rows = VACANCY_GAPS.filter((v) => governorates.includes(v.governorate))
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('alerts.vacancyDialogTitle')}</DialogTitle>
          <DialogDescription>{t('alerts.vacancyDialogBody')}</DialogDescription>
        </DialogHeader>
        <ul className="space-y-3">
          {rows.map((r) => {
            const o = opps.find((x) => x.id === r.opportunityId)
            const gap = SKILL_GAPS[r.gapIndex]
            return (
              <li key={r.opportunityId} className="card p-4">
                <p className="flex items-center gap-2 font-semibold text-ink">
                  <Briefcase className="size-4 text-blue" aria-hidden />
                  {r.opportunityId} {l(o?.title)}
                </p>
                <p className="mt-1 text-sm text-ink-soft">
                  {value('governorate', r.governorate)} · {l(gap?.sector)}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                  <StatusBadge tone={gap?.severity === 'high' ? 'danger' : 'notice'}>
                    {t(`severity.${gap?.severity ?? 'medium'}`)}
                  </StatusBadge>
                  <span>{t('alerts.gap', { skill: l(gap?.gap) })}</span>
                </div>
                <p className="mt-2 text-sm">
                  {t('alerts.course', { id: r.courseId, title: l(COURSE_BY_ID[r.courseId].title) })}
                </p>
              </li>
            )
          })}
        </ul>
      </DialogContent>
    </Dialog>
  )
}
