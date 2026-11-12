import { createFileRoute } from '@tanstack/react-router'
import { TrainerResultsPage } from '@/features/trainer/pages/TrainerResultsPage'

export const Route = createFileRoute('/trainer/results')({ component: TrainerResultsPage })
