import { BadgeCheck, CircleDashed, Info, type LucideIcon, MessageSquareText } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { StatCard, type StatTone } from '@/components/shared/StatCard'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { formatNumber, useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'

export type Confirmation = 'confirmed' | 'reported' | 'activity' | 'live'

const STATUS_ICON: Record<Confirmation, LucideIcon> = {
  confirmed: BadgeCheck,
  reported: MessageSquareText,
  activity: CircleDashed,
  live: CircleDashed,
}

/** Light tones carry ink text; the rest carry white. */
const LIGHT: StatTone[] = ['cyan', 'yellow', 'sky']

/**
 * KPI tile (brief §19), a thin wrapper around the coloured `StatCard`: the value leads, the
 * numerator and denominator sit in plain words in the hint, and the confirmation status plus a
 * definition button close the card. The denominator is always visible, never hover-only.
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
  icon,
  tone = 'blue',
  to,
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
  /** One more plain-language line under the ratio, e.g. a share or unknown count. */
  extra?: string
  icon?: LucideIcon
  tone?: StatTone
  to?: string
  /** @deprecated kept for older call sites; tone now carries emphasis. */
  emphasis?: boolean
  className?: string
}) {
  const { t } = useTranslation('admin')
  const { lang } = useLocalized()
  const StatusIcon = STATUS_ICON[status]
  const light = LIGHT.includes(tone)
  const ratio =
    numerator !== undefined && denominator !== undefined
      ? t('kpi.ratio', {
          num: formatNumber(numerator, lang),
          den: formatNumber(denominator, lang),
          what: denominatorLabel ?? '',
        })
      : denominatorLabel
  return (
    <StatCard
      tone={tone}
      icon={icon}
      label={label}
      to={to}
      className={cn(
        'h-full xl:[&>p:first-of-type]:min-h-10 xl:[&>p:first-of-type]:items-start [&>div:last-child]:mt-auto [&>div:last-child]:pt-3',
        // Cyan carries ink text; lift the secondary lines for contrast.
        tone === 'cyan' && '[&>p]:text-ink/90',
        className,
      )}
      value={
        value === null ? (
          <span className="text-xl font-bold">{t('kpi.noData')}</span>
        ) : (
          <>
            {formatNumber(value, lang)}
            {kind === 'pct' && '%'}
            {kind === 'days' && (
              <span className="ms-1.5 text-base font-semibold opacity-80">{t('kpi.days')}</span>
            )}
          </>
        )
      }
      hint={
        ratio || extra ? (
          <>
            {ratio && <span className="block">{ratio}</span>}
            {extra && <span className="mt-0.5 block font-semibold">{extra}</span>}
          </>
        ) : undefined
      }
      footer={
        <span
          className={cn(
            'flex items-center justify-between gap-2 border-t pt-2.5',
            light ? 'border-ink/10' : 'border-white/20',
          )}
        >
          <span className="inline-flex min-w-0 items-center gap-1.5 text-xs font-semibold">
            <StatusIcon className="size-3.5 shrink-0" aria-hidden />
            <span className="min-w-0">{statusLabel}</span>
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className={cn(
                  '-m-1.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full focus-visible:outline-2',
                  light ? 'hover:bg-white/50' : 'hover:bg-white/15',
                )}
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
        </span>
      }
    />
  )
}
