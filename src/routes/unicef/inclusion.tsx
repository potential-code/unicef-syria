import { createFileRoute } from '@tanstack/react-router'
import { UnicefInclusionPage } from '@/features/admin/pages/UnicefInclusionPage'

export const Route = createFileRoute('/unicef/inclusion')({ component: UnicefInclusionPage })
