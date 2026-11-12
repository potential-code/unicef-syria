import { createFileRoute } from '@tanstack/react-router'
import { TrainerSessionDetailPage } from '@/features/trainer/pages/TrainerSessionDetailPage'

export const Route = createFileRoute('/trainer/sessions/$sessionId')({
  component: function SessionRoute() {
    const { sessionId } = Route.useParams()
    return <TrainerSessionDetailPage key={sessionId} sessionId={sessionId} />
  },
})
