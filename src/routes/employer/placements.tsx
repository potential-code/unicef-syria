import { createFileRoute } from '@tanstack/react-router'
import { PlacementsPage } from '@/features/employer/pages/PlacementsPage'

export const Route = createFileRoute('/employer/placements')({ component: PlacementsPage })
