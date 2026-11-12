import { createFileRoute } from '@tanstack/react-router'
import { TrainerApplicationsPage } from '@/features/trainer/pages/TrainerApplicationsPage'

export const Route = createFileRoute('/trainer/applications')({
  component: TrainerApplicationsPage,
})
