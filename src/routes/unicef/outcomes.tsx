import { createFileRoute } from '@tanstack/react-router'
import { UnicefOutcomesPage } from '@/features/admin/pages/UnicefOutcomesPage'

export const Route = createFileRoute('/unicef/outcomes')({ component: UnicefOutcomesPage })
