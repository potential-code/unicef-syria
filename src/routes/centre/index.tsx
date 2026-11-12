import { createFileRoute } from '@tanstack/react-router'
import { CentreOverviewPage } from '@/features/admin/pages/CentreOverviewPage'

export const Route = createFileRoute('/centre/')({ component: CentreOverviewPage })
