import { createFileRoute } from '@tanstack/react-router'
import { PartnerParticipantsPage } from '@/features/admin/pages/PartnerParticipantsPage'

export const Route = createFileRoute('/partner/participants')({
  component: PartnerParticipantsPage,
})
