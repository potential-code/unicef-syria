import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/shared/PageHeader'
import { OpportunityForm } from '../components/OpportunityForm'
import { useOrgScope } from '../hooks/use-org-scope'

export function NewOpportunityPage() {
  const { t } = useTranslation('employer')
  const scope = useOrgScope()
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title={t('form.pageTitle')}
        description={t('form.pageBody')}
        crumbs={[
          { label: t('opps.title'), to: '/employer/opportunities' },
          { label: t('form.pageTitle') },
        ]}
      />
      <OpportunityForm scope={scope} />
    </div>
  )
}
