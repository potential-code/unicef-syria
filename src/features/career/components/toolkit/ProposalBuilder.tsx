import type { Youth } from '@shared/types'
import { FileSignature, Plus } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/button'
import { addProposal, updateProposal } from '@/store/actions/toolkit'
import { AttachProposal } from './AttachProposal'
import { ProposalCard } from './ProposalCard'
import { EMPTY_PROPOSAL, type ProposalDraft, ProposalForm } from './ProposalForm'
import { ToolPanel } from './ToolPanel'

/** Proposal builder: saved proposals (including AI drafts) stay editable; attach to applications. */
export function ProposalBuilder({ youth }: { youth: Youth }) {
  const { t } = useTranslation('career')
  // 'new' for a new proposal, a proposal id when editing, null when closed.
  const [editing, setEditing] = useState<string | null>(null)
  const proposals = youth.toolkit.proposals
  const current = proposals.find((p) => p.id === editing)

  const save = (p: ProposalDraft) => {
    if (current) updateProposal(youth.id, { ...p, id: current.id })
    else addProposal(youth.id, p)
    setEditing(null)
    toast.success(t('toolkit.proposal.saved'))
  }

  return (
    <ToolPanel
      icon={FileSignature}
      accent="cyan"
      title={t('toolkit.tabs.proposal')}
      intro={t('toolkit.proposal.intro')}
      actions={
        editing === null && (
          <Button className="rounded-full" onClick={() => setEditing('new')}>
            <Plus className="size-4" aria-hidden />
            {t('toolkit.proposal.new')}
          </Button>
        )
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-4">
          {editing !== null && (
            <ProposalForm
              key={editing}
              initial={current ? { ...EMPTY_PROPOSAL, ...current } : EMPTY_PROPOSAL}
              onSave={save}
              onCancel={() => setEditing(null)}
            />
          )}
          {proposals.length === 0 && editing === null ? (
            <EmptyState
              icon={FileSignature}
              title={t('toolkit.proposal.emptyTitle')}
              body={t('toolkit.proposal.emptyBody')}
            />
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {proposals.map((p) => (
                <ProposalCard key={p.id} proposal={p} onEdit={() => setEditing(p.id)} />
              ))}
            </div>
          )}
        </div>
        <AttachProposal youth={youth} />
      </div>
    </ToolPanel>
  )
}
