import { createFileRoute } from '@tanstack/react-router'
import { CoachesPage } from '@/features/career/pages/CoachesPage'

export const Route = createFileRoute('/youth/coaches/')({ component: CoachesPage })
