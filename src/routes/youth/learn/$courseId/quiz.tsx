import { createFileRoute } from '@tanstack/react-router'
import { QuizPage } from '@/features/learn/pages/QuizPage'

export const Route = createFileRoute('/youth/learn/$courseId/quiz')({ component: QuizRoute })

function QuizRoute() {
  const { courseId } = Route.useParams()
  return <QuizPage key={courseId} courseId={courseId} />
}
