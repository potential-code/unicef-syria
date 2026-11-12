import { createFileRoute } from '@tanstack/react-router'
import { UnicefFollowUpPage } from '@/features/admin/pages/UnicefFollowUpPage'

export const Route = createFileRoute('/unicef/followup')({ component: UnicefFollowUpPage })
