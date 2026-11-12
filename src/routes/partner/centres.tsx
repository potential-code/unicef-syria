import { createFileRoute } from '@tanstack/react-router'
import { PartnerCentresPage } from '@/features/admin/pages/PartnerCentresPage'

export const Route = createFileRoute('/partner/centres')({ component: PartnerCentresPage })
