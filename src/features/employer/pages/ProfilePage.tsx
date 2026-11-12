import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/shared/PageHeader'
import { useLocalized } from '@/i18n'
import { type OrgProfileEdit, useOrgProfileEdit } from '@/store/actions/employer-extra'
import { useMe } from '@/store/hooks'
import { ApprovalPanel } from '../components/ApprovalPanel'
import { ProfileForm } from '../components/ProfileForm'
import { useOrgScope } from '../hooks/use-org-scope'

/** E01 organisation profile with approval state. */
export function ProfilePage() {
  const { t } = useTranslation('employer')
  const { l } = useLocalized()
  const me = useMe()
  const scope = useOrgScope()
  const saved = useOrgProfileEdit(scope.org.id)
  const types = Array.from(new Set(scope.opportunities.map((o) => o.type)))
  const first = me.name.en.split(' ')[0]?.toLowerCase() ?? 'contact'
  const initial: OrgProfileEdit = saved ?? {
    name: l(scope.org.name),
    sector: l(scope.org.sector),
    governorate: scope.org.governorate,
    description: l(scope.org.description),
    contactName: l(me.name),
    contactEmail: `${first}.demo@example.org`,
    opportunityTypes: types,
  }
  return (
    <div>
      <PageHeader title={t('profile.title')} description={t('profile.body')} />
      <div className="grid gap-6 xl:grid-cols-[1fr_20rem] [&>*]:min-w-0">
        <ProfileForm key={saved ? 'saved' : 'seed'} scope={scope} initial={initial} />
        <ApprovalPanel scope={scope} profile={initial} />
      </div>
    </div>
  )
}
