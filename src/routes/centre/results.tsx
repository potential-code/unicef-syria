import { createFileRoute } from '@tanstack/react-router'
import { CentreResultsPage } from '@/features/admin/pages/CentreResultsPage'

export const Route = createFileRoute('/centre/results')({ component: CentreResultsPage })
