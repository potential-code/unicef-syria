import { createFileRoute } from '@tanstack/react-router'
import { CentreReportsPage } from '@/features/admin/pages/CentreReportsPage'

export const Route = createFileRoute('/centre/reports')({ component: CentreReportsPage })
