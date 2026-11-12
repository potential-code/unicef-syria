import { createFileRoute } from '@tanstack/react-router'
import { ApplicationsPage } from '@/features/career/pages/ApplicationsPage'

export const Route = createFileRoute('/youth/applications/')({ component: ApplicationsPage })
