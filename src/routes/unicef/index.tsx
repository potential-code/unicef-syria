import { createFileRoute } from '@tanstack/react-router'
import { UnicefOverviewPage } from '@/features/admin/pages/UnicefOverviewPage'

export const Route = createFileRoute('/unicef/')({ component: UnicefOverviewPage })
