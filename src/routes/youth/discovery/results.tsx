import { createFileRoute } from '@tanstack/react-router'
import { ResultsPage } from '@/features/learn/pages/ResultsPage'

export const Route = createFileRoute('/youth/discovery/results')({ component: ResultsPage })
