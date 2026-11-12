import { createFileRoute } from '@tanstack/react-router'
import { UnicefAdminPage } from '@/features/admin/pages/UnicefAdminPage'

export const Route = createFileRoute('/unicef/admin')({ component: UnicefAdminPage })
