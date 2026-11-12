import { createFileRoute } from '@tanstack/react-router'
import { ViewerPage } from '@/features/admin/pages/ViewerPage'

export const Route = createFileRoute('/viewer/')({ component: ViewerPage })
