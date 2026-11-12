import { useEffect } from 'react'
import i18n from '@/i18n'
import { usePrefs } from '@/store/actions/session'

/** Applies saved preferences to <html>: lang, dir and reduced motion. */
export function PrefsSync() {
  const prefs = usePrefs()
  useEffect(() => {
    const html = document.documentElement
    html.lang = prefs.lang
    html.dir = prefs.lang === 'ar' ? 'rtl' : 'ltr'
    html.dataset.motion = prefs.reducedMotion ? 'reduce' : 'full'
    if (i18n.language !== prefs.lang) void i18n.changeLanguage(prefs.lang)
  }, [prefs])
  return null
}
