import { createFileRoute } from '@tanstack/react-router'
import { MentorsPage } from '@/features/career/pages/MentorsPage'

export const Route = createFileRoute('/youth/mentors/')({ component: MentorsPage })
