import { Link } from '@tanstack/react-router'
import { LogIn } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PERSONAS } from '@/data/personas'

/**
 * Simulated sign-in (no production authentication). A demo email signs in as the matching
 * profile; anything else shows a helpful message pointing to the demo cards.
 */
export function SignInForm({ onPersona }: { onPersona: (id: (typeof PERSONAS)[number]['id']) => void }) {
  const { t } = useTranslation()
  const [email, setEmail] = useState('nour.demo@example.org')
  const [password, setPassword] = useState('demo')
  const [error, setError] = useState('')
  const emails: Record<string, (typeof PERSONAS)[number]['id']> = {
    'nour.demo@example.org': 'Y001',
    'omar.demo@example.org': 'Y002',
    'lina.demo@example.org': 'Y003',
  }
  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) return setError(t('signInPage.required'))
    const id = emails[email.trim().toLowerCase()]
    if (!id) return setError(t('signInPage.unknown'))
    onPersona(id)
  }
  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="email">{t('signInPage.email')}</Label>
        <Input id="email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!error} aria-describedby={error ? 'signin-error' : undefined} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password">{t('signInPage.password')}</Label>
        <Input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {error && <p id="signin-error" role="alert" className="text-sm font-medium text-danger">{error}</p>}
      <Button type="submit" size="lg" className="w-full rounded-full">
        <LogIn className="size-4 rtl-mirror" aria-hidden />
        {t('signIn')}
      </Button>
      <p className="text-center text-sm text-ink-soft">
        {t('signInPage.noAccount')}{' '}
        <Link to="/register" className="font-semibold text-blue hover:underline">{t('signInPage.register')}</Link>
      </p>
    </form>
  )
}
