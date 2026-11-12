import { createFileRoute } from '@tanstack/react-router'
import { PartnerReportsPage } from '@/features/admin/pages/PartnerReportsPage'

export const Route = createFileRoute('/partner/reports')({ component: PartnerReportsPage })
