import { createFileRoute } from '@tanstack/react-router'
import { PlayerPage } from '@/features/learn/pages/PlayerPage'

export const Route = createFileRoute('/youth/learn/$courseId/$unit')({ component: PlayerRoute })

function PlayerRoute() {
  const { courseId, unit } = Route.useParams()
  return <PlayerPage key={`${courseId}-${unit}`} courseId={courseId} unit={unit} />
}
