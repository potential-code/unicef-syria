import { createFileRoute } from '@tanstack/react-router'
import { UnicefPartnersPage } from '@/features/admin/pages/UnicefPartnersPage'

export const Route = createFileRoute('/unicef/partners')({ component: UnicefPartnersPage })
