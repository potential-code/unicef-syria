import type { Toolkit } from '@shared/types'
import { Pencil } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

/** Saved proposal summary with an edit action. */
export function ProposalCard({
  proposal,
  onEdit,
}: {
  proposal: Toolkit['proposals'][number]
  onEdit: () => void
}) {
  const { t } = useTranslation('career')
  return (
    <article className="lift space-y-2 rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-blue">{proposal.id}</p>
          <h3 className="text-base">{proposal.client || t('toolkit.proposal.untitled')}</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t('toolkit.proposal.editN', { id: proposal.id })}
          onClick={onEdit}
        >
          <Pencil className="size-4" aria-hidden />
        </Button>
      </div>
      <p className="line-clamp-2 text-sm text-ink-soft">{proposal.goal}</p>
      <p className="line-clamp-3 text-sm whitespace-pre-line">{proposal.deliverables}</p>
      {proposal.timing && (
        <p className="text-xs text-ink-soft">
          {t('toolkit.proposal.fields.timing')}: {proposal.timing}
        </p>
      )}
    </article>
  )
}
