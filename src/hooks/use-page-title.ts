import { useEffect } from 'react'

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title
      ? `${title} · UNICEF Syria Youth Pathways`
      : 'UNICEF Syria Youth Pathways'
  }, [title])
}
