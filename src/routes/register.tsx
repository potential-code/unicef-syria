import { createFileRoute } from '@tanstack/react-router'
import { safeNext } from '@/features/public/config'
import { RegisterPage } from '@/features/public/pages/RegisterPage'

function RegisterRoute() {
  const { next } = Route.useSearch()
  return <RegisterPage next={next} />
}

export const Route = createFileRoute('/register')({
  validateSearch: (s: Record<string, unknown>): { next?: string } => ({ next: safeNext(s.next) }),
  component: RegisterRoute,
})
