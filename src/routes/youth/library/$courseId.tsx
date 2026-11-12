import { createFileRoute } from '@tanstack/react-router'
import { CourseDetailPage } from '@/features/learn/pages/CourseDetailPage'

export const Route = createFileRoute('/youth/library/$courseId')({ component: CourseDetailRoute })

function CourseDetailRoute() {
  const { courseId } = Route.useParams()
  return <CourseDetailPage key={courseId} courseId={courseId} />
}
