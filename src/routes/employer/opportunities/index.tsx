import { createFileRoute } from '@tanstack/react-router'
import { OpportunitiesPage } from '@/features/employer/pages/OpportunitiesPage'

export const Route = createFileRoute('/employer/opportunities/')({ component: OpportunitiesPage })
