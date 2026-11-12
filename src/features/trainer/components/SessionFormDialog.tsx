import type { CohortId, Session } from '@shared/types'
import { Building2, Video } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { COHORTS, TRAINERS } from '@/data/orgs'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { createSession } from '@/store/actions/sessions'
import {
  nextCreatedSessionId,
  type SessionDetails,
  saveSessionDetails,
  updateCreatedSession,
} from '@/store/actions/work-extra'
import { useMe } from '@/store/hooks'
import { FieldError } from './FieldError'

const syria = (iso: string) => new Date(Date.parse(iso) + 3 * 3600_000).toISOString()
const iso = (date: string, time: string) => `${date}T${time}:00+03:00`

/** T03 create or edit a sample session. Seeded catalogue sessions keep their schedule; extras are editable. */
export function SessionFormDialog({
  open,
  onOpenChange,
  session,
  details,
  cohortIds,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  session?: Session
  details?: SessionDetails
  cohortIds: CohortId[]
}) {
  const { t } = useTranslation('trainer')
  const { l } = useLocalized()
  const me = useMe()
  const trainer = TRAINERS.find((x) => x.id === me.trainerId)
  const locked = !!session && !session.id.startsWith('SX')
  const [f, setF] = useState(() => ({
    title: session ? l(session.title) : '',
    cohort: (session?.cohortId ?? cohortIds[0]) as CohortId,
    format: session?.format ?? ('online' as Session['format']),
    date: session ? syria(session.start).slice(0, 10) : '2026-11-27',
    start: session ? syria(session.start).slice(11, 16) : '10:00',
    end: session ? syria(session.end).slice(11, 16) : '11:30',
    room: details?.room ?? '',
    link: details?.link ?? '',
    resources: details?.resources ?? '',
    assignment: details?.assignment ?? '',
  }))
  const [tried, setTried] = useState(false)
  const errors = {
    title: !f.title.trim() ? t('form.errTitle') : '',
    date: !f.date ? t('form.errDate') : '',
    time: f.end <= f.start ? t('form.errTime') : '',
  }
  const valid = !errors.title && !errors.date && !errors.time
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) =>
    setF({ ...f, [k]: e.target.value })

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setTried(true)
    if (!valid) return
    const cohort = COHORTS.find((c) => c.id === f.cohort)
    const det: SessionDetails = {
      room: f.room,
      link: f.link,
      resources: f.resources,
      assignment: f.assignment,
    }
    const core = {
      title: { en: f.title, ar: f.title },
      cohortId: f.cohort,
      trainerId: me.trainerId ?? null,
      format: f.format,
      centreId: f.format === 'centre' ? cohort?.centreId : undefined,
      start: iso(f.date, f.start),
      end: iso(f.date, f.end),
      capacity: cohort?.size ?? 20,
      purpose: { en: f.assignment, ar: f.assignment },
    }
    if (!session) {
      const id = nextCreatedSessionId()
      createSession(core)
      saveSessionDetails(id, det)
      toast.success(t('form.created', { title: f.title }))
    } else {
      if (!locked) updateCreatedSession(session.id, core)
      saveSessionDetails(session.id, det)
      toast.success(t('form.updated'))
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {session ? t('form.editTitle') : t('form.newTitle')}
          </DialogTitle>
          <DialogDescription>{locked ? t('form.lockedNote') : t('form.body')}</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="s-title">{t('form.title')}</Label>
            <Input
              id="s-title"
              value={f.title}
              onChange={set('title')}
              disabled={locked}
              aria-invalid={tried && !!errors.title}
            />
            {tried && <FieldError>{errors.title}</FieldError>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="s-cohort">{t('form.cohort')}</Label>
            <Select
              value={f.cohort}
              onValueChange={(v) => setF({ ...f, cohort: v as CohortId })}
              disabled={locked}
            >
              <SelectTrigger id="s-cohort" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COHORTS.filter((c) => cohortIds.includes(c.id)).map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {l(c.name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="s-trainer">{t('form.trainer')}</Label>
            <Input id="s-trainer" value={l(trainer?.name)} readOnly className="bg-muted" />
          </div>
          <fieldset className="space-y-1.5 sm:col-span-2" disabled={locked}>
            <legend className="mb-1.5 text-sm font-medium">{t('form.format')}</legend>
            <div className="grid grid-cols-2 gap-2">
              {(['online', 'centre'] as const).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  aria-pressed={f.format === fmt}
                  onClick={() => setF({ ...f, format: fmt })}
                  className={cn(
                    'flex h-10 items-center justify-center gap-2 rounded-xl border-2 text-sm font-semibold transition-colors disabled:opacity-50',
                    f.format === fmt
                      ? 'border-blue bg-sky-50 text-blue'
                      : 'border-border bg-white text-ink-soft hover:bg-sky-50',
                  )}
                >
                  {fmt === 'online' ? (
                    <Video className="size-4" aria-hidden />
                  ) : (
                    <Building2 className="size-4" aria-hidden />
                  )}
                  {t(`form.fmt.${fmt}`)}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="grid grid-cols-2 gap-2 sm:col-span-2 sm:grid-cols-3">
            <div className="col-span-2 space-y-1.5 sm:col-span-1">
              <Label htmlFor="s-date">{t('form.date')}</Label>
              <Input
                id="s-date"
                type="date"
                value={f.date}
                onChange={set('date')}
                disabled={locked}
                aria-invalid={tried && !!errors.date}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="s-start">{t('form.start')}</Label>
              <Input
                id="s-start"
                type="time"
                value={f.start}
                onChange={set('start')}
                disabled={locked}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="s-end">{t('form.end')}</Label>
              <Input
                id="s-end"
                type="time"
                value={f.end}
                onChange={set('end')}
                disabled={locked}
                aria-invalid={tried && !!errors.time}
              />
            </div>
            <p className="col-span-full text-xs text-ink-soft">{t('form.timezone')}</p>
            {tried && (
              <FieldError className="col-span-full">{errors.date || errors.time}</FieldError>
            )}
          </div>
          {f.format === 'online' ? (
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="s-link">{t('form.link')}</Label>
              <Input
                id="s-link"
                value={f.link}
                onChange={set('link')}
                placeholder={t('form.linkPlaceholder')}
              />
            </div>
          ) : (
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="s-room">{t('form.room')}</Label>
              <Input
                id="s-room"
                value={f.room}
                onChange={set('room')}
                placeholder={t('form.roomPlaceholder')}
              />
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="s-res">{t('form.resources')}</Label>
            <Input
              id="s-res"
              value={f.resources}
              onChange={set('resources')}
              placeholder={t('form.resourcesPlaceholder')}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="s-task">{t('form.assignment')}</Label>
            <Input
              id="s-task"
              value={f.assignment}
              onChange={set('assignment')}
              placeholder={t('form.assignmentPlaceholder')}
            />
          </div>
          <DialogFooter className="gap-2 sm:col-span-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              {t('common:cancel')}
            </Button>
            <Button type="submit" className="rounded-full">
              {session ? t('form.saveChanges') : t('form.create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
