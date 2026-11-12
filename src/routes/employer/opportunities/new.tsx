import { createFileRoute } from '@tanstack/react-router'
import { NewOpportunityPage } from '@/features/employer/pages/NewOpportunityPage'

export const Route = createFileRoute('/employer/opportunities/new')({
  component: NewOpportunityPage,
})
