import { useState } from 'react'
import { usePersona } from '@/store/actions/session'

export interface GatePrompt {
  /** Where to return after registration, e.g. '/explore/C05'. */
  next: string
  /** The item the visitor tried to act on. */
  item: string
}

/**
 * Enrol, save and apply on public pages: a signed-in youth acts straight away; anyone else gets
 * the registration prompt, which returns them to the same item afterwards (brief §2 P02).
 */
export function useGate() {
  const persona = usePersona()
  const youthId = persona?.role === 'youth' ? persona.youthId : undefined
  const [prompt, setPrompt] = useState<GatePrompt | null>(null)
  return { youthId, prompt, ask: (p: GatePrompt) => setPrompt(p), close: () => setPrompt(null) }
}
