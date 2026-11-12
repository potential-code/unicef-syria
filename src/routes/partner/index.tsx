import { createFileRoute } from '@tanstack/react-router'
import { PartnerOverviewPage } from '@/features/admin/pages/PartnerOverviewPage'

export const Route = createFileRoute('/partner/')({ component: PartnerOverviewPage })
