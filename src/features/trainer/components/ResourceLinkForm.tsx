import type { TemplateId } from '@shared/types'
import { Link2 } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { COURSE_BY_ID } from '@/data/courses'
import { COHORTS } from '@/data/orgs'
import { TEMPLATE_BY_ID } from '@/data/templates'
import { useLocalized } from '@/i18n'
import { RESOURCE_TEMPLATES } from '../config'
import { FieldError } from './FieldError'

export interface ResourceLink {
  id: string
  template: TemplateId
  target: string
  task: string
}

/** Associate a resource template and a task with a course or a cohort (brief §17 T04). */
export function ResourceLinkForm({
  targets,
  onAdd,
}: {
  targets: string[]
  onAdd: (r: ResourceLink) => void
}) {
  const { t } = useTranslation('trainer')
  const { l } = useLocalized()
  const [template, setTemplate] = useState<TemplateId>('customerInterview')
  const [target, setTarget] = useState(targets[0] ?? '')
  const [task, setTask] = useState('')
  const [tried, setTried] = useState(false)
  const label = (id: string) =>
    id.startsWith('K')
      ? l(COHORTS.find((c) => c.id === id)?.name)
      : `${id} ${l(COURSE_BY_ID[id as keyof typeof COURSE_BY_ID]?.title)}`

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setTried(true)
    if (!task.trim() || !target) return
    onAdd({ id: `${template}-${target}-${Date.now()}`, template, target, task: task.trim() })
    toast.success(
      t('resources.linked', { resource: l(TEMPLATE_BY_ID[template].title), target: label(target) }),
    )
    setTask('')
    setTried(false)
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="space-y-4 rounded-2xl border bg-card p-5 shadow-sm"
    >
      <h2 className="text-lg">{t('resources.formTitle')}</h2>
      <div className="space-y-1.5">
        <Label htmlFor="r-template">{t('resources.resource')}</Label>
        <Select value={template} onValueChange={(v) => setTemplate(v as TemplateId)}>
          <SelectTrigger id="r-template" className="min-h-11 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {RESOURCE_TEMPLATES.map((id) => (
              <SelectItem key={id} value={id}>
                {l(TEMPLATE_BY_ID[id].title)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="line-clamp-3 rounded-lg bg-sky-50 p-2 text-xs text-ink-soft">
          {l(TEMPLATE_BY_ID[template].body)}
        </p>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="r-target">{t('resources.target')}</Label>
        <Select value={target} onValueChange={setTarget}>
          <SelectTrigger id="r-target" className="min-h-11 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {targets.map((id) => (
              <SelectItem key={id} value={id}>
                {label(id)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="r-task">{t('resources.task')}</Label>
        <Input
          id="r-task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder={t('resources.taskPlaceholder')}
          aria-invalid={tried && !task.trim()}
        />
        {tried && !task.trim() && <FieldError>{t('resources.errTask')}</FieldError>}
      </div>
      <Button type="submit" className="w-full rounded-full sm:w-auto">
        <Link2 className="size-4" aria-hidden />
        {t('resources.associate')}
      </Button>
    </form>
  )
}
