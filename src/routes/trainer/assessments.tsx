import { createFileRoute } from '@tanstack/react-router'
import { TrainerAssessmentsPage } from '@/features/trainer/pages/TrainerAssessmentsPage'

export const Route = createFileRoute('/trainer/assessments')({ component: TrainerAssessmentsPage })
