import { createFileRoute } from '@tanstack/react-router'
import { OpportunityDetailPage } from '@/features/career/pages/OpportunityDetailPage'

export const Route = createFileRoute('/youth/opportunities/$oppId')({ component: RouteComponent })

function RouteComponent() {
  const { oppId } = Route.useParams()
  return <OpportunityDetailPage oppId={oppId} />
}
