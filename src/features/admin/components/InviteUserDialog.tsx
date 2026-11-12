import type { Role } from '@shared/types'
import { type ReactNode, useState } from 'react'
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
  DialogTrigger,
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

const ROLES: Role[] = ['trainer', 'employer', 'centre', 'partner', 'unicef', 'viewer']

/** Invite user mock: validates and shows a toast. No email leaves the prototype. */
export function InviteUserDialog({ trigger }: { trigger: ReactNode }) {
  const { t } = useTranslation('admin')
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [role, setRole] = useState<string>('')
  const [error, setError] = useState('')
  const send = () => {
    if (!name.trim() || !role) {
      setError(t('admin.inviteError'))
      return
    }
    setError('')
    setOpen(false)
    setName('')
    setRole('')
    toast.success(t('admin.inviteToast', { name: name.trim() }))
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('admin.inviteTitle')}</DialogTitle>
          <DialogDescription>{t('admin.inviteBody')}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="inv-name">{t('admin.inviteName')}</Label>
            <Input
              id="inv-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={!!error && !name.trim()}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="inv-role">{t('admin.inviteRole')}</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger id="inv-role" className="w-full" aria-invalid={!!error && !role}>
                <SelectValue placeholder={t('followup.form.choose')} />
              </SelectTrigger>
              <SelectContent>
                {ROLES.map((r) => (
                  <SelectItem key={r} value={r}>
                    {t(`common:roles.${r}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {error && (
            <p className="text-sm font-medium text-danger" role="alert">
              {error}
            </p>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" className="rounded-full" onClick={() => setOpen(false)}>
            {t('common:cancel')}
          </Button>
          <Button className="rounded-full" onClick={send}>
            {t('admin.inviteSend')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
