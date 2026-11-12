import {
  Briefcase,
  Check,
  EyeOff,
  GraduationCap,
  HandHeart,
  type LucideIcon,
  PieChart,
  X,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Motif } from '@/components/brand'
import { cn } from '@/lib/utils'

interface Audience {
  key: 'employers' | 'trainers' | 'mentors' | 'reports'
  icon: LucideIcon
  tone: string
}
const AUDIENCES: Audience[] = [
  { key: 'employers', icon: Briefcase, tone: 'text-orange' },
  { key: 'trainers', icon: GraduationCap, tone: 'text-blue' },
  { key: 'mentors', icon: HandHeart, tone: 'text-orange' },
  { key: 'reports', icon: PieChart, tone: 'text-navy' },
]

/** "Who sees what": plain explanation of each audience; reacts to the employer-visibility switch. */
export function VisibilityPanel({ employerVisible }: { employerVisible: boolean }) {
  const { t } = useTranslation('career')
  return (
    <section
      aria-labelledby="who-sees"
      className="relative overflow-hidden rounded-3xl bg-[linear-gradient(160deg,var(--unicef-navy),#002a73)] p-5 text-white shadow-lg on-dark sm:p-6 [&>*:not(:first-child)]:relative"
    >
      <Motif variant="card" className="text-cyan/20" />
      <h2 id="who-sees" className="text-xl text-white">
        {t('profile.who.title')}
      </h2>
      <p className="mt-1 text-sm text-white/80">{t('profile.who.body')}</p>
      <ul className="mt-4 space-y-3">
        {AUDIENCES.map(({ key, icon: Icon, tone }) => {
          const hidden = key === 'employers' && !employerVisible
          return (
            <li key={key} className="rounded-2xl bg-white p-4 text-ink shadow-sm">
              <div className="flex items-center gap-2">
                <Icon className={cn('size-4 shrink-0', tone)} aria-hidden />
                <h3 className="min-w-0 text-base">{t(`profile.who.${key}.title`)}</h3>
              </div>
              {hidden ? (
                <p className="mt-2 flex items-start gap-2 text-sm text-ink-soft">
                  <EyeOff className="mt-0.5 size-4 shrink-0" aria-hidden />
                  {t('profile.who.employers.off')}
                </p>
              ) : (
                <p className="mt-2 flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                  {t(`profile.who.${key}.sees`)}
                </p>
              )}
              <p className="mt-1 flex items-start gap-2 text-sm text-ink-soft">
                <X className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden />
                {t(`profile.who.${key}.never`)}
              </p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
