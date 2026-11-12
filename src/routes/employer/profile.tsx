import { createFileRoute } from '@tanstack/react-router'
import { ProfilePage } from '@/features/employer/pages/ProfilePage'

export const Route = createFileRoute('/employer/profile')({ component: ProfilePage })
