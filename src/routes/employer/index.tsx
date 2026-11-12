import { createFileRoute } from '@tanstack/react-router'
import { EmployerDashboardPage } from '@/features/employer/pages/EmployerDashboardPage'

export const Route = createFileRoute('/employer/')({ component: EmployerDashboardPage })
