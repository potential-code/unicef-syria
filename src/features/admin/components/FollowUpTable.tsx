import type { FollowUp } from '@shared/types'
import { BellRing, ClipboardList } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { EmptyState } from '@/components/shared/EmptyState'
import { StatusBadge, type Tone } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CENTRES } from '@/data/orgs'
import { now } from '@/lib/clock'
import { useAllYouth } from '@/store/actions/youth'
import { useLabels } from '../lib/useLabels'
import { FollowUpForm } from './FollowUpForm'
import { LearnerName } from './LearnerName'

const TONE: Record<FollowUp['status'], Tone> = {
  due: 'info',
  overdue: 'danger',
  learnerReported: 'notice',
  confirmed: 'success',
}

/** Graduates due for follow-up, with responsible centre and partner, source and next action. */
export function FollowUpTable({ items }: { items: FollowUp[] }) {
  const { t } = useTranslation('admin')
  const { d, centre, partner, lang } = useLabels()
  const youth = useAllYouth()
  const [open, setOpen] = useState<FollowUp | null>(null)
  const [reminders, setReminders] = useState<Record<string, string>>({})
  if (!items.length)
    return (
      <EmptyState
        icon={ClipboardList}
        title={t('empty.noFollowUps')}
        body={t('empty.noFollowUpsBody')}
      />
    )
  return (
    <>
      <div className="card overflow-hidden">
        <Table className="min-w-[60rem] lg:min-w-0 [&_td]:px-3 [&_th]:px-3 [&_th]:whitespace-normal">
          <TableHeader>
            <TableRow>
              <TableHead>{t('table.graduate')}</TableHead>
              <TableHead>{t('table.window')}</TableHead>
              <TableHead>{t('table.due')}</TableHead>
              <TableHead>{t('table.responsible')}</TableHead>
              <TableHead>{t('table.lastContact')}</TableHead>
              <TableHead>{t('table.source')}</TableHead>
              <TableHead>{t('table.next')}</TableHead>
              <TableHead className="text-end">{t('table.action')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((f) => {
              const y = youth[f.youthId]
              const c = CENTRES.find((x) => x.id === f.centreId)
              return (
                <TableRow key={f.id}>
                  <TableCell>{y ? <LearnerName y={y} /> : f.youthId}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {t('windows.month', { count: f.window })}
                  </TableCell>
                  <TableCell className="whitespace-nowrap tabular-nums">{d(f.due)}</TableCell>
                  <TableCell className="text-sm">
                    {f.centreId} {centre(f.centreId)}
                    <span className="block text-xs text-ink-soft">{partner(c?.partnerId)}</span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap tabular-nums">
                    {d(f.lastContact)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge tone={TONE[f.status]}>
                      {t(`followup.status.${f.status}`)}
                    </StatusBadge>
                  </TableCell>
                  <TableCell className="min-w-40 text-sm">
                    {t(`followup.next.${f.status}`)}
                    {reminders[f.id] && (
                      <span className="block text-xs text-ink-soft">
                        {t('followup.reminderAt', { date: reminders[f.id] })}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="rounded-full text-blue"
                        aria-label={t('followup.remind', { name: y?.profile.name ?? f.youthId })}
                        onClick={() => {
                          setReminders((r) => ({ ...r, [f.id]: d(now()) }))
                          toast.success(t('followup.reminderToast'))
                        }}
                      >
                        <BellRing className="size-4" aria-hidden />
                      </Button>
                      <Button
                        size="sm"
                        className="rounded-full whitespace-nowrap"
                        onClick={() => setOpen(f)}
                      >
                        {t('followup.open')}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      <Sheet open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <SheetContent
          side={lang === 'ar' ? 'left' : 'right'}
          className="w-full overflow-y-auto sm:max-w-lg"
        >
          <SheetHeader>
            <SheetTitle>
              {t('followup.form.title', {
                name: open ? (youth[open.youthId]?.profile.name ?? open.youthId) : '',
              })}
            </SheetTitle>
            <SheetDescription>
              {open ? t('followup.form.body', { months: open.window, date: d(open.due) }) : ''}
            </SheetDescription>
          </SheetHeader>
          <div className="px-4 pb-6">
            {open && <FollowUpForm f={open} onDone={() => setOpen(null)} />}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
