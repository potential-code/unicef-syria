import { createFileRoute } from '@tanstack/react-router'
import { ProgressPage } from '@/features/learn/pages/ProgressPage'

export const Route = createFileRoute('/youth/progress')({ component: ProgressPage })
