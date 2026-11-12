import type { CohortId, TrainerId } from '@shared/types'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Avatar } from '@/components/shared/Avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TRAINERS } from '@/data/orgs'
import { useLabels } from '../lib/useLabels'

/** Trainer shown for a cohort, with a change control kept in local page state (demo only). */
export function TrainerAssignment({
  cohortId,
  value,
  onChange,
}: {
  cohortId: CohortId
  value: TrainerId
  onChange: (id: TrainerId) => void
}) {
  const { t } = useTranslation('admin')
  const { trainer } = useLabels()
  const id = `trainer-${cohortId}`
  return (
    <div className="flex flex-wrap items-end gap-3">
      <Avatar name={trainer(value)} size={44} />
      <div className="min-w-48 flex-1">
        <label htmlFor={id} className="text-xs font-medium text-ink-soft">
          {t('trainers.assigned', { cohort: cohortId })}
        </label>
        <Select
          value={value}
          onValueChange={(v) => {
            onChange(v as TrainerId)
            toast.success(t('trainers.changed', { name: trainer(v), cohort: cohortId }))
          }}
        >
          <SelectTrigger id={id} className="w-full bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TRAINERS.map((tr) => (
              <SelectItem key={tr.id} value={tr.id}>
                {trainer(tr.id)} ({tr.id})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
