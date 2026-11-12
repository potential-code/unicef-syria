import type { TFunction } from 'i18next'
import { type Errors, OPTIONS, type RegForm } from '../../register-config'

export interface StepProps {
  form: RegForm
  set: (patch: Partial<RegForm>) => void
  errors: Errors
}

export function optionsFor(t: TFunction<'public'>, group: keyof typeof OPTIONS) {
  return OPTIONS[group].map((k) => ({ v: k, label: t(`register.options.${k}`) }))
}
