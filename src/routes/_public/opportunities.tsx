import { createFileRoute } from '@tanstack/react-router'
import { validateOppSearch } from '@/features/public/config'
import { OpportunitiesPage } from '@/features/public/pages/OpportunitiesPage'

function OpportunitiesRoute() {
  const { item } = Route.useSearch()
  return <OpportunitiesPage item={item} />
}

export const Route = createFileRoute('/_public/opportunities')({
  validateSearch: validateOppSearch,
  component: OpportunitiesRoute,
})
