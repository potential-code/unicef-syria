import { createFileRoute } from '@tanstack/react-router'
import { LearnerRecordPage } from '@/features/admin/pages/LearnerRecordPage'

function LearnerRecordRoute() {
  const { youthId } = Route.useParams()
  return <LearnerRecordPage youthId={youthId} />
}

export const Route = createFileRoute('/centre/participants_/$youthId')({
  component: LearnerRecordRoute,
})
