import { useNavigate, useRouterState } from '@tanstack/react-router'

/** A page-level tab kept in the URL (`?view=`), so alerts can open the filtered records. */
export function useViewParam<T extends string>(options: readonly T[], fallback: T) {
  const search = useRouterState({ select: (s) => s.location.search }) as Record<string, unknown>
  const navigate = useNavigate()
  const raw = search.view
  const view = (
    typeof raw === 'string' && (options as readonly string[]).includes(raw) ? raw : fallback
  ) as T
  const setView = (v: string) =>
    void navigate({
      to: '.',
      search: ((prev: Record<string, unknown>) => ({ ...prev, view: v })) as never,
      replace: true,
    })
  return [view, setView] as const
}
