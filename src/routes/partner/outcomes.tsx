import { createFileRoute } from '@tanstack/react-router'
import { PartnerOutcomesPage } from '@/features/admin/pages/PartnerOutcomesPage'

export const Route = createFileRoute('/partner/outcomes')({ component: PartnerOutcomesPage })
