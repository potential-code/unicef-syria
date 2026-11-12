import { createFileRoute } from '@tanstack/react-router'
import { TrainerDashboardPage } from '@/features/trainer/pages/TrainerDashboardPage'

export const Route = createFileRoute('/trainer/')({ component: TrainerDashboardPage })
