import { createFileRoute } from '@tanstack/react-router'
import { validateExploreSearch } from '@/features/public/config'
import { ExplorePage } from '@/features/public/pages/ExplorePage'

function ExploreRoute() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  return (
    <ExplorePage
      search={search}
      onSearch={(s) => void navigate({ search: s, replace: true, resetScroll: false })}
    />
  )
}

export const Route = createFileRoute('/_public/explore/')({
  validateSearch: validateExploreSearch,
  component: ExploreRoute,
})
