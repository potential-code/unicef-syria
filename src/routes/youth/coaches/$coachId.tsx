import { createFileRoute } from '@tanstack/react-router'
import { CoachChatPage } from '@/features/career/pages/CoachChatPage'

export const Route = createFileRoute('/youth/coaches/$coachId')({
  validateSearch: (s: Record<string, unknown>): { start?: string } =>
    typeof s.start === 'string' ? { start: s.start } : {},
  component: RouteComponent,
})

function RouteComponent() {
  const { coachId } = Route.useParams()
  const { start } = Route.useSearch()
  return <CoachChatPage coachId={coachId} start={start} />
}
