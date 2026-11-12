import { Link } from '@tanstack/react-router'
import { Inbox } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { useLocalized } from '@/i18n'
import { ApplicationsTable } from '../components/ApplicationsTable'
import { ChoiceSelect } from '../components/ChoiceSelect'
import { Field } from '../components/Field'
import { FINAL_STAGES } from '../config'
import { useOrgScope } from '../hooks/use-org-scope'

type Status = 'all' | 'active' | 'closed'

/** E02 applications for own opportunities. Drafts are never visible to employers. */
export function ApplicationsPage() {
  const { t } = useTranslation('employer')
  const { l } = useLocalized()
  const { opportunities, applications } = useOrgScope()
  const [opp, setOpp] = useState('all')
  const [status, setStatus] = useState<Status>('all')
  const shown = applications
    .filter((a) => opp === 'all' || a.opportunityId === opp)
    .filter((a) => status === 'all' || (status === 'active') !== FINAL_STAGES.includes(a.stage))
  return (
    <div>
      <PageHeader title={t('apps.title')} description={t('apps.body')} />
      {applications.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title={t('empty.noApplicants.title')}
          body={t('empty.noApplicants.body')}
          action={
            <Button asChild className="rounded-full">
              <Link to="/employer/opportunities/new">{t('opps.create')}</Link>
            </Button>
          }
        />
      ) : (
        <>
          <div className="card mb-5 grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
            <Field id="a-opp" label={t('apps.opportunity')} compact>
              <ChoiceSelect
                id="a-opp"
                size="sm"
                value={opp}
                onChange={setOpp}
                options={[
                  { value: 'all', label: t('apps.allOpps') },
                  ...opportunities.map((o) => ({ value: o.id, label: `${o.id} ${l(o.title)}` })),
                ]}
              />
            </Field>
            <Field id="a-status" label={t('apps.stage')} compact>
              <ChoiceSelect
                id="a-status"
                size="sm"
                value={status}
                onChange={setStatus}
                options={(['all', 'active', 'closed'] as const).map((v) => ({
                  value: v,
                  label: t(`apps.status.${v}`),
                }))}
              />
            </Field>
          </div>
          {shown.length === 0 ? (
            <EmptyState icon={Inbox} title={t('common:noResults')} body={t('apps.noneInFilter')} />
          ) : (
            <ApplicationsTable apps={shown} opportunities={opportunities} />
          )}
        </>
      )}
    </div>
  )
}
