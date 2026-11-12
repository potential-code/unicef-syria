import { createFileRoute } from '@tanstack/react-router'
import { AppShell } from '@/components/layout/AppShell'
import { requireRole } from '@/lib/guard'

export const Route = createFileRoute('/centre')({
  beforeLoad: requireRole('centre'),
  component: () => <AppShell role="centre" />,
})
