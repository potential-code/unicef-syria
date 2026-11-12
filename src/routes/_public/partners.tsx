import { createFileRoute } from '@tanstack/react-router'
import { PartnersPage } from '@/features/public/pages/PartnersPage'

export const Route = createFileRoute('/_public/partners')({ component: PartnersPage })
