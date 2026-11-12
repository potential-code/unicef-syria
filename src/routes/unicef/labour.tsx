import { createFileRoute } from '@tanstack/react-router'
import { UnicefLabourPage } from '@/features/admin/pages/UnicefLabourPage'

export const Route = createFileRoute('/unicef/labour')({ component: UnicefLabourPage })
