import { createFileRoute } from '@tanstack/react-router'
import { CandidatesPage } from '@/features/employer/pages/CandidatesPage'

export const Route = createFileRoute('/employer/candidates')({ component: CandidatesPage })
