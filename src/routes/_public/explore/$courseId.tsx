import { createFileRoute } from '@tanstack/react-router'
import { CourseDetailPage } from '@/features/public/pages/CourseDetailPage'

function CourseRoute() {
  const { courseId } = Route.useParams()
  return <CourseDetailPage key={courseId} courseId={courseId} />
}

export const Route = createFileRoute('/_public/explore/$courseId')({ component: CourseRoute })
