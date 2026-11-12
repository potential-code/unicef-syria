import type { YouthId } from '@shared/types'
import { Inbox, SearchX } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PROGRAMMES } from '@/data/orgs'
import { formatDate, useLocalized } from '@/i18n'
import { ApplicationDialog } from '../components/ApplicationDialog'
import { LearnerName } from '../components/LearnerName'
import { TrainingStatusBadge } from '../components/TrainingStatusBadge'
import { useTrainerScope } from '../hooks/useTrainerScope'

const TABS = ['all', 'pending', 'needsInfo', 'accepted', 'waitlisted', 'notSelected'] as const
type Tab = (typeof TABS)[number]

/** T01 Applications to the trainer's programmes, with screening decisions and cohort assignment. */
export function TrainerApplicationsPage() {
  const { t } = useTranslation('trainer')
  const { l, lang } = useLocalized()
  const { applicants } = useTrainerScope()
  const [tab, setTab] = useState<Tab>('all')
  const [openId, setOpenId] = useState<YouthId | null>(null)
  const sorted = [...applicants].sort((a, b) =>
    (b.trainingApplication?.at ?? '').localeCompare(a.trainingApplication?.at ?? ''),
  )
  const rows = sorted.filter((y) => tab === 'all' || y.trainingApplication?.status === tab)
  const count = (s: Tab) =>
    s === 'all'
      ? applicants.length
      : applicants.filter((y) => y.trainingApplication?.status === s).length
  const open = applicants.find((y) => y.id === openId) ?? null

  return (
    <div className="space-y-6">
      <PageHeader title={t('applications.title')} description={t('applications.subtitle')} />
      <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
        <TabsList className="no-scrollbar h-auto w-full justify-start overflow-x-auto rounded-xl bg-sky-50 p-1">
          {TABS.map((s) => (
            <TabsTrigger
              key={s}
              value={s}
              className="min-h-10 flex-none px-3 data-[state=active]:text-blue"
            >
              {s === 'all' ? t('ui.all') : t(`appStatus.${s}`)}
              <span className="ms-1 rounded-full bg-white px-1.5 text-xs tabular-nums text-ink-soft">
                {count(s)}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {applicants.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title={t('applications.empty')}
          body={t('applications.emptyBody')}
        />
      ) : rows.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title={t('applications.noneInTab')}
          body={t('applications.noneInTabBody')}
          action={
            <Button variant="secondary" size="sm" onClick={() => setTab('all')}>
              {t('ui.showAll')}
            </Button>
          }
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <Table>
            <TableHeader className="bg-sky-50">
              <TableRow>
                <TableHead>{t('ui.learner')}</TableHead>
                <TableHead className="hidden md:table-cell">
                  {t('applications.programme')}
                </TableHead>
                <TableHead className="hidden sm:table-cell">{t('applications.applied')}</TableHead>
                <TableHead>{t('ui.status')}</TableHead>
                <TableHead className="text-end">
                  <span className="sr-only">{t('ui.actions')}</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((y) => {
                const app = y.trainingApplication
                if (!app) return null
                return (
                  <TableRow key={y.id}>
                    <TableCell>
                      <LearnerName
                        youth={y}
                        sub={`${y.profile.governorate} · ${y.profile.interests.join(', ') || y.profile.employmentStatus}`}
                      />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {l(PROGRAMMES.find((p) => p.id === app.programmeId)?.name)}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell tabular-nums">
                      {formatDate(app.at, lang)}
                    </TableCell>
                    <TableCell>
                      <TrainingStatusBadge status={app.status} />
                    </TableCell>
                    <TableCell className="text-end">
                      <Button
                        size="sm"
                        variant={app.status === 'pending' ? 'default' : 'outline'}
                        className="rounded-full"
                        onClick={() => setOpenId(y.id)}
                      >
                        {t('applications.review')}
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
      <ApplicationDialog youth={open} open={!!open} onOpenChange={(o) => !o && setOpenId(null)} />
    </div>
  )
}
