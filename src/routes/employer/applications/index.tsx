import { createFileRoute } from '@tanstack/react-router'
import { ApplicationsPage } from '@/features/employer/pages/ApplicationsPage'

export const Route = createFileRoute('/employer/applications/')({ component: ApplicationsPage })
