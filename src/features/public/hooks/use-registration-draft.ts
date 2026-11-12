import { useCallback, useState } from 'react'
import { EMPTY_FORM, type RegForm, type StepId } from '../register-config'

const KEY = 'unicef-syria-register-draft'

interface Draft {
  form: RegForm
  step: StepId
  savedAt: string
}

function read(): Draft | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Draft) : null
  } catch {
    return null
  }
}

/**
 * Registration draft kept on this device only (nothing is sent anywhere). Restored on return,
 * cleared once the profile is created.
 */
export function useRegistrationDraft() {
  const [initial] = useState(read)
  const [savedAt, setSavedAt] = useState<string | null>(initial?.savedAt ?? null)
  const save = useCallback((form: RegForm, step: StepId) => {
    const at = new Date().toISOString()
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify({ form: { ...form, password: '' }, step, savedAt: at }),
      )
    } catch {
      // Storage unavailable: the draft simply is not kept.
    }
    setSavedAt(at)
  }, [])
  const clear = useCallback(() => {
    try {
      localStorage.removeItem(KEY)
    } catch {
      // ignore
    }
    setSavedAt(null)
  }, [])
  return {
    initialForm: { ...EMPTY_FORM, ...initial?.form },
    initialStep: initial?.step ?? 'account',
    restored: !!initial,
    savedAt,
    save,
    clear,
  }
}
