import { createFileRoute } from '@tanstack/react-router'
import { CohortPage } from '@/features/career/pages/CohortPage'

export const Route = createFileRoute('/youth/cohort/')({ component: CohortPage })
