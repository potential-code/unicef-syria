import { BadgeCheck, CircleDashed, Info, type LucideIcon, MessageSquareText } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { formatNumber, useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'

export type Confirmation = 'confirmed' | 'reported' | 'activity' | 'live'

const STATUS: Record<
  Confirmation,
  { icon: LucideIcon; tone: 'success' | 'notice' | 'info' | 'brand' }
> = {
  confirmed: { icon: BadgeCheck, tone: 'success' },
  reported: { icon: MessageSquareText, tone: 'notice' },
  activity: { icon: CircleDashed, tone: 'info' },
  live: { icon: CircleDashed, tone: 'brand' },
}

/**
 * KPI tile (brief §19): value, the numerator and denominator in plain words, the confirmation
 * status as text, and a definition tooltip. The denominator is always visible, not hover-only.
 */
export function KpiTile({
  label,
  value,
  kind = 'count',
  numerator,
  denominator,
  denominatorLabel,
  definition,
  status,
  statusLabel,
  extra,
  icon: Icon,
  emphasis,
  className,
}: {
  label: string
  value: number | null
  kind?: 'count' | 'pct' | 'days'
  numerator?: number
  denominator?: number
  denominatorLabel?: string
  definition: string
  status: Confirmation
  statusLabel: string
  extra?: ReactNode
  icon?: LucideIcon
  emphasis?: boolean
  className?: string
}) {
  const { t } = useTranslation('admin')
  const { lang } = useLocalized()
  const st = STATUS[status]
  const suffix = kind === 'pct' ? '%' : ''
  const ratio =
    numerator !== undefined && denominator !== undefined
      ? t('kpi.ratio', {
          num: formatNumber(numerator, lang),
          den: formatNumber(denominator, lang),
          what: denominatorLabel ?? '',
        })
      : denominatorLabel
  return (
    <div
      className={cn(
        'relative flex flex-col gap-2 rounded-2xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5',
        emphasis && 'border-blue/30 bg-sky-50',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="flex items-center gap-2 text-sm font-medium text-ink-soft">
          {Icon && <Icon className="size-4 text-blue" aria-hidden />}
          {label}
        </p>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="-m-2 inline-flex size-9 shrink-0 items-center justify-center rounded-full text-ink-soft hover:bg-sky-100 hover:text-blue focus-visible:outline-2"
              aria-label={t('kpi.definitionFor', { label })}
            >
              <Info className="size-4" aria-hidden />
            </button>
          </TooltipTrigger>
          <TooltipContent className="max-w-72 space-y-1.5 p-3 text-start text-xs leading-relaxed">
            <p className="font-semibold">{label}</p>
            <p>{definition}</p>
            {ratio && <p className="opacity-80">{ratio}</p>}
            <p className="opacity-80">{statusLabel}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <p className="text-3xl font-bold tracking-tight text-ink tabular-nums">
        {value === null ? (
          <span className="text-lg font-semibold text-ink-soft">{t('kpi.noData')}</span>
        ) : (
          <>
            {formatNumber(value, lang)}
            {suffix}
            {kind === 'days' && (
              <span className="ms-1 text-base font-semibold text-ink-soft">{t('kpi.days')}</span>
            )}
          </>
        )}
      </p>
      {ratio && <p className="text-xs text-ink-soft">{ratio}</p>}
      {extra}
      <StatusBadge
        tone={st.tone}
        icon={<st.icon className="size-3" aria-hidden />}
        className="mt-auto w-fit max-w-full whitespace-normal"
      >
        {statusLabel}
      </StatusBadge>
    </div>
  )
}
