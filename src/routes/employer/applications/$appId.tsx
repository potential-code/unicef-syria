import { createFileRoute } from '@tanstack/react-router'
import { ApplicationDetailPage } from '@/features/employer/pages/ApplicationDetailPage'

export const Route = createFileRoute('/employer/applications/$appId')({
  component: ApplicationRoute,
})

function ApplicationRoute() {
  const { appId } = Route.useParams()
  return <ApplicationDetailPage appId={appId} />
}
