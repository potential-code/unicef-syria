import { createFileRoute } from '@tanstack/react-router'
import { CentreTrainersPage } from '@/features/admin/pages/CentreTrainersPage'

export const Route = createFileRoute('/centre/trainers')({ component: CentreTrainersPage })
