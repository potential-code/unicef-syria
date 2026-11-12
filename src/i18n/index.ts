import type { Lang, Localized } from '@shared/types'
import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import arAdmin from './ar/admin.json'
import arCareer from './ar/career.json'
import arCommon from './ar/common.json'
import arEmployer from './ar/employer.json'
import arLearn from './ar/learn.json'
import arPublic from './ar/public.json'
import arTrainer from './ar/trainer.json'
import enAdmin from './en/admin.json'
import enCareer from './en/career.json'
import enCommon from './en/common.json'
import enEmployer from './en/employer.json'
import enLearn from './en/learn.json'
import enPublic from './en/public.json'
import enTrainer from './en/trainer.json'

/**
 * Namespaces, one per feature area: common (shell), public (site, sign-in, registration),
 * learn (youth discovery and learning), career (youth support and earning), trainer, employer,
 * admin (centre, partner, UNICEF, viewer). Seed content uses Localized { en, ar } objects.
 */
export const NAMESPACES = ['common', 'public', 'learn', 'career', 'trainer', 'employer', 'admin'] as const

void i18n.use(initReactI18next).init({
  resources: {
    en: { common: enCommon, public: enPublic, learn: enLearn, career: enCareer, trainer: enTrainer, employer: enEmployer, admin: enAdmin },
    ar: { common: arCommon, public: arPublic, learn: arLearn, career: arCareer, trainer: arTrainer, employer: arEmployer, admin: arAdmin },
  },
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: [...NAMESPACES],
  interpolation: { escapeValue: false },
  returnNull: false,
})

export default i18n

/**
 * Pick the active language from a Localized value. Empty Arabic text falls back to English;
 * `isPlaceholder` lets the UI label it "Arabic content placeholder" (brief §1).
 */
export function useLocalized() {
  const { i18n: inst } = useTranslation()
  const lang: Lang = inst.language === 'ar' ? 'ar' : 'en'
  const l = (v: Localized | undefined) => (v ? (lang === 'ar' && v.ar ? v.ar : v.en) : '')
  const isPlaceholder = (v: Localized | undefined) => lang === 'ar' && !!v && !v.ar && !!v.en
  return { l, lang, isPlaceholder, dir: lang === 'ar' ? ('rtl' as const) : ('ltr' as const) }
}

export function formatDate(iso: string, lang: Lang, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }) {
  return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-SY' : 'en-GB', { timeZone: 'Asia/Damascus', ...opts }).format(new Date(iso))
}
export function formatTime(iso: string, lang: Lang) {
  return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-SY' : 'en-GB', { timeZone: 'Asia/Damascus', hour: '2-digit', minute: '2-digit' }).format(new Date(iso))
}
export function formatNumber(n: number, lang: Lang) {
  return new Intl.NumberFormat(lang === 'ar' ? 'ar-SY' : 'en-GB').format(n)
}
