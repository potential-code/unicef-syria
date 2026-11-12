import type { Localized } from '@shared/types'

/** Build a Localized value. Leave `ar` empty for long sample text: the UI shows the English
 * text with an "Arabic content placeholder" label (brief §1 allows this for course body text). */
export function L(en: string, ar = ''): Localized {
  return { en, ar }
}
