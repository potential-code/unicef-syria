import type { Opportunity } from '@shared/types'
import { Bookmark, Building2, CalendarClock, Laptop, MapPin, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import { ORGANISATIONS } from '@/data/orgs'
import { formatDate, useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'

const TYPE_TONE: Record<Opportunity['type'], string> = {
  job: 'bg-blue text-white',
  internship: 'bg-cyan text-ink',
  partTime: 'bg-navy text-white',
  freelance: 'bg-orange text-white',
  enterprise: 'bg-yellow text-ink',
}

/** Public opportunity summary. Apply and save go through the registration gate. */
export function OpportunityCard({
  opp,
  highlighted,
  saved,
  onAct,
}: {
  opp: Opportunity
  highlighted?: boolean
  saved?: boolean
  onAct: (kind: 'apply' | 'save') => void
}) {
  const { t } = useTranslation('public')
  const { l, lang } = useLocalized()
  const org = ORGANISATIONS.find((o) => o.id === opp.orgId)
  const closed = opp.status === 'closed'
  return (
    <article
      id={`opp-${opp.id}`}
      className={cn(
        'card card-hover flex h-full min-w-0 flex-col gap-3.5 p-5',
        highlighted && 'ring-4 ring-yellow',
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cn(
            'shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold',
            TYPE_TONE[opp.type],
          )}
        >
          {t(`common:oppTypes.${opp.type}`)}
        </span>
        <StatusBadge tone={closed ? 'neutral' : 'success'}>
          {closed ? t('opps.closed') : t('opps.open')}
        </StatusBadge>
        <span className="ms-auto text-xs font-bold text-ink-soft">{opp.id}</span>
      </div>
      <div>
        <h3 className="text-lg">{l(opp.title)}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-blue">
          <Building2 className="size-4" aria-hidden />
          {l(org?.name)}
        </p>
      </div>
      <p className="text-sm text-ink-soft">{l(opp.description)}</p>
      <ul className="grid gap-1 text-sm text-ink">
        <li className="flex items-start gap-2">
          <MapPin className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
          {l(opp.location)}
        </li>
        <li className="flex items-start gap-2">
          <Laptop className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
          {t(`common:format.${opp.workFormat}`)}
        </li>
        <li className="flex items-start gap-2">
          <CalendarClock className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden />
          {t('opps.deadline', { date: formatDate(opp.deadline, lang) })}
        </li>
      </ul>
      <div className="flex flex-wrap gap-1.5">
        {opp.skills.map((s) => (
          <span
            key={s.en}
            className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-semibold text-navy"
          >
            {l(s)}
          </span>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap gap-2 border-t border-border/60 pt-4">
        <Button
          size="sm"
          onClick={() => onAct('apply')}
          disabled={closed}
          className="flex-1 rounded-full"
        >
          <Send className="size-4 rtl-mirror" aria-hidden />
          {t('opps.apply')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAct('save')}
          disabled={closed || saved}
          className="flex-1 rounded-full"
        >
          <Bookmark className="size-4" aria-hidden />
          {saved ? t('opps.saved') : t('opps.save')}
        </Button>
      </div>
    </article>
  )
}
