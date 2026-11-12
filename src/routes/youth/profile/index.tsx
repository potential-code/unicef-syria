import { createFileRoute } from '@tanstack/react-router'
import { ProfilePage } from '@/features/career/pages/ProfilePage'

export const Route = createFileRoute('/youth/profile/')({ component: ProfilePage })
