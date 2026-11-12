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
import { cn } from '@/lib/utils'

interface Audience {
  key: 'employers' | 'trainers' | 'mentors' | 'reports'
  icon: LucideIcon
  tone: string
}
const AUDIENCES: Audience[] = [
  { key: 'employers', icon: Briefcase, tone: 'bg-yellow/25 text-ink' },
  { key: 'trainers', icon: GraduationCap, tone: 'bg-sky-100 text-blue' },
  { key: 'mentors', icon: HandHeart, tone: 'bg-orange/15 text-orange' },
  { key: 'reports', icon: PieChart, tone: 'bg-blue-50 text-navy' },
]

/** "Who sees what": plain explanation of each audience; reacts to the employer-visibility switch. */
export function VisibilityPanel({ employerVisible }: { employerVisible: boolean }) {
  const { t } = useTranslation('career')
  return (
    <section
      aria-labelledby="who-sees"
      className="rounded-3xl bg-navy p-5 text-white shadow-md on-dark sm:p-6"
    >
      <h2 id="who-sees" className="text-xl text-white">
        {t('profile.who.title')}
      </h2>
      <p className="mt-1 text-sm text-white/80">{t('profile.who.body')}</p>
      <ul className="mt-4 space-y-3">
        {AUDIENCES.map(({ key, icon: Icon, tone }) => {
          const hidden = key === 'employers' && !employerVisible
          return (
            <li key={key} className="rounded-2xl bg-white p-4 text-ink">
              <div className="flex items-center gap-2">
                <span className={cn('flex size-9 items-center justify-center rounded-xl', tone)}>
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="text-base">{t(`profile.who.${key}.title`)}</h3>
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
