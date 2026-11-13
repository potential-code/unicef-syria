import { createFileRoute } from '@tanstack/react-router'
import { ProgrammesPage } from '@/features/programmes/pages/ProgrammesPage'

export const Route = createFileRoute('/youth/programmes')({ component: ProgrammesPage })
