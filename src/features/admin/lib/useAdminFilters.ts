import { useNavigate, useRouterState } from '@tanstack/react-router'
import { useMemo } from 'react'
import { useMe } from '@/store/hooks'
import { type AdminFilterKey, type AdminFilters, lockedScope, parseFilters } from './filters'

/**
 * Report filters from the URL plus the persona's locked scope. Changing a filter rewrites the
 * search params, so every card on the page and every drilldown link uses the same context.
 */
export function useAdminFilters() {
  const persona = useMe()
  const search = useRouterState({ select: (s) => s.location.search }) as Record<string, unknown>
  const navigate = useNavigate()
  const locked = useMemo(() => lockedScope(persona), [persona])
  const filters: AdminFilters = useMemo(
    () => ({ ...parseFilters(search), ...locked }),
    [search, locked],
  )

  const replace = (next: AdminFilters) => {
    const clean: Record<string, string> = {}
    for (const [k, v] of Object.entries(next)) if (v !== undefined && !(k in locked)) clean[k] = v
    void navigate({ to: '.', search: clean as never, replace: true })
  }
  const setFilter = (key: AdminFilterKey, value: string | undefined) =>
    replace({ ...filters, [key]: value })
  const clear = () => replace({})
  /** Search params to pass on a drilldown link (locked scope is implied by the role). */
  const linkSearch = (extra: AdminFilters = {}) => {
    const out: Record<string, string> = {}
    for (const [k, v] of Object.entries({ ...filters, ...extra }))
      if (v !== undefined && !(k in locked)) out[k] = v
    return out as never
  }
  return { filters, locked, setFilter, clear, linkSearch, persona }
}
