import { createFileRoute } from '@tanstack/react-router'
import { CentreCoursesPage } from '@/features/admin/pages/CentreCoursesPage'

export const Route = createFileRoute('/centre/courses')({ component: CentreCoursesPage })
