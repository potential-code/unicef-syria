import { createFileRoute } from '@tanstack/react-router'
import { UnicefProgrammesPage } from '@/features/admin/pages/UnicefProgrammesPage'

export const Route = createFileRoute('/unicef/programmes')({ component: UnicefProgrammesPage })
