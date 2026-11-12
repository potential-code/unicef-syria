import { createFileRoute } from '@tanstack/react-router'
import { TrainerSessionsPage } from '@/features/trainer/pages/TrainerSessionsPage'

export const Route = createFileRoute('/trainer/sessions/')({ component: TrainerSessionsPage })
