import { createFileRoute } from '@tanstack/react-router'
import { OpportunitiesPage } from '@/features/career/pages/OpportunitiesPage'

export const Route = createFileRoute('/youth/opportunities/')({ component: OpportunitiesPage })
