import { createFileRoute } from '@tanstack/react-router'
import { TrainerResourcesPage } from '@/features/trainer/pages/TrainerResourcesPage'

export const Route = createFileRoute('/trainer/resources')({ component: TrainerResourcesPage })
