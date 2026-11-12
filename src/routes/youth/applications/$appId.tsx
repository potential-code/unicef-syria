import { createFileRoute } from '@tanstack/react-router'
import { ApplicationDetailPage } from '@/features/career/pages/ApplicationDetailPage'

export const Route = createFileRoute('/youth/applications/$appId')({ component: RouteComponent })

function RouteComponent() {
  const { appId } = Route.useParams()
  return <ApplicationDetailPage appId={appId} />
}
