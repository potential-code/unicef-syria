import { createFileRoute } from '@tanstack/react-router'
import { PartnerProgrammesPage } from '@/features/admin/pages/PartnerProgrammesPage'

export const Route = createFileRoute('/partner/programmes')({ component: PartnerProgrammesPage })
