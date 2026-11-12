import type { Dimension, YouthId } from '@shared/types'
import { useCallback, useState } from 'react'

export interface DiscoveryDraft {
  answers: (Dimension | null)[]
  index: number
}

const key = (id: YouthId) => `unicef-syria-discovery-draft-${id}`

function read(id: YouthId): DiscoveryDraft | null {
  try {
    const raw = localStorage.getItem(key(id))
    return raw ? (JSON.parse(raw) as DiscoveryDraft) : null
  } catch {
    return null
  }
}

/** Save and resume for the discovery exercise (draft answers live on this device only). */
export function useDiscoveryDraft(id: YouthId) {
  const [saved, setSaved] = useState<DiscoveryDraft | null>(() => read(id))
  const save = useCallback(
    (d: DiscoveryDraft) => {
      try {
        localStorage.setItem(key(id), JSON.stringify(d))
      } catch {
        // Storage blocked: the draft stays in memory for this visit.
      }
      setSaved(d)
    },
    [id],
  )
  const clear = useCallback(() => {
    try {
      localStorage.removeItem(key(id))
    } catch {
      // ignore
    }
    setSaved(null)
  }, [id])
  return { saved, save, clear }
}
