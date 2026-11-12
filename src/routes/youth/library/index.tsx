import { createFileRoute } from '@tanstack/react-router'
import { LibraryPage } from '@/features/learn/pages/LibraryPage'

export const Route = createFileRoute('/youth/library/')({ component: LibraryPage })
