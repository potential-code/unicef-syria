import { createFileRoute } from '@tanstack/react-router'
import { MentorDetailPage } from '@/features/career/pages/MentorDetailPage'

export const Route = createFileRoute('/youth/mentors/$mentorId')({ component: RouteComponent })

function RouteComponent() {
  const { mentorId } = Route.useParams()
  return <MentorDetailPage mentorId={mentorId} />
}
