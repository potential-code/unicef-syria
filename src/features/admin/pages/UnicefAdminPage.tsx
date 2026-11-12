import { Building2, CheckCircle2, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Avatar } from '@/components/shared/Avatar'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ORGANISATIONS } from '@/data/orgs'
import { PERSONAS } from '@/data/personas'
import { approveOrganisation } from '@/store/actions/applications'
import { useDb } from '@/store/db'
import { InviteUserDialog } from '../components/InviteUserDialog'
import { useLabels } from '../lib/useLabels'

/** User and role management mock screen, with pending organisation approval. */
export function UnicefAdminPage() {
  const { t } = useTranslation('admin')
  const { l } = useLabels()
  const approved = useDb((db) => db.orgApproved)
  const [busy, setBusy] = useState(false)
  const pending = ORGANISATIONS.filter((o) => !o.approved)
  return (
    <div className="space-y-6">
      <PageHeader
        title={t('admin.title')}
        description={t('admin.body')}
        actions={
          <InviteUserDialog
            trigger={
              <Button className="rounded-full">
                <UserPlus className="size-4" aria-hidden />
                {t('admin.invite')}
              </Button>
            }
          />
        }
      />
      <section aria-labelledby="orgs" className="card p-5">
        <h2 id="orgs" className="mb-1 flex items-center gap-2 text-lg">
          <Building2 className="size-5 text-blue" aria-hidden />
          {t('admin.orgsTitle')}
        </h2>
        <p className="mb-4 text-sm text-ink-soft">{t('admin.orgsBody')}</p>
        <ul className="divide-y divide-border/70 overflow-hidden rounded-xl ring-1 ring-border/70">
          {pending.map((o) => {
            const ok = !!approved[o.id]
            return (
              <li key={o.id} className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <p className="font-semibold">
                    {o.id} {l(o.name)}
                  </p>
                  <p className="text-sm text-ink-soft">
                    {l(o.sector)} · {l(o.description)}
                  </p>
                </div>
                {ok ? (
                  <StatusBadge
                    tone="success"
                    icon={<CheckCircle2 className="size-3" aria-hidden />}
                  >
                    {t('admin.approved')}
                  </StatusBadge>
                ) : (
                  <Button
                    size="sm"
                    className="shrink-0 rounded-full"
                    disabled={busy}
                    onClick={() => {
                      setBusy(true)
                      window.setTimeout(() => {
                        approveOrganisation(o.id)
                        setBusy(false)
                        toast.success(t('admin.approvedToast', { name: l(o.name) }))
                      }, 450)
                    }}
                  >
                    {busy ? t('processing') : t('admin.approve')}
                  </Button>
                )}
              </li>
            )
          })}
        </ul>
      </section>
      <section aria-labelledby="users" className="space-y-3">
        <h2 id="users" className="text-xl">
          {t('admin.usersTitle')}
        </h2>
        <div className="card overflow-hidden">
          <Table className="min-w-[44rem] lg:min-w-0 [&_th]:whitespace-normal">
            <TableHeader>
              <TableRow>
                <TableHead>{t('admin.col.user')}</TableHead>
                <TableHead>{t('admin.col.role')}</TableHead>
                <TableHead>{t('admin.col.scope')}</TableHead>
                <TableHead>{t('admin.col.status')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PERSONAS.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <span className="flex items-center gap-2.5">
                      <Avatar src={p.image} name={l(p.name)} size={32} />
                      <span>
                        <span className="block font-medium">{l(p.name)}</span>
                        <span className="text-xs text-ink-soft">{p.id}</span>
                      </span>
                    </span>
                  </TableCell>
                  <TableCell>{t(`common:roles.${p.role}`)}</TableCell>
                  <TableCell className="text-sm">{l(p.scope)}</TableCell>
                  <TableCell>
                    {p.role === 'viewer' ? (
                      <StatusBadge tone="notice">{t('viewer.optional')}</StatusBadge>
                    ) : (
                      <StatusBadge tone="success">{t('admin.active')}</StatusBadge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="text-xs text-ink-soft">{t('admin.note')}</p>
      </section>
    </div>
  )
}
