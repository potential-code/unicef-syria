import { createFileRoute } from '@tanstack/react-router'
import { CentreParticipantsPage } from '@/features/admin/pages/CentreParticipantsPage'

export const Route = createFileRoute('/centre/participants')({ component: CentreParticipantsPage })
