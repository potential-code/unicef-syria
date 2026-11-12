import { createFileRoute } from '@tanstack/react-router'
import { CentreSessionsPage } from '@/features/admin/pages/CentreSessionsPage'

export const Route = createFileRoute('/centre/sessions')({ component: CentreSessionsPage })
