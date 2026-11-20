import type { Youth } from '@shared/types'
import { FileSignature, Plus } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/button'
import { useLocalized } from '@/i18n'
import { addProposal, updateProposal } from '@/store/actions/toolkit'
import { SAMPLE_PROPOSAL } from '../../config/samples'
import { AttachProposal } from './AttachProposal'
import { ProposalCard } from './ProposalCard'
import { EMPTY_PROPOSAL, type ProposalDraft, ProposalForm } from './ProposalForm'
import { SampleDataButton } from './SampleDataButton'
import { ToolPanel } from './ToolPanel'

/** Proposal builder: saved proposals (including AI drafts) stay editable; attach to applications. */
export function ProposalBuilder({ youth }: { youth: Youth }) {
  const { t } = useTranslation('career')
  const { l } = useLocalized()
  // 'sample' opens a new proposal filled with sample content.
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
        <>
          <SampleDataButton
            label={t('toolkit.sample.proposal')}
            onFill={() => setEditing(editing === 'sample' ? 'sample-2' : 'sample')}
          />
          {editing === null && (
            <Button className="rounded-full" onClick={() => setEditing('new')}>
              <Plus className="size-4" aria-hidden />
              {t('toolkit.proposal.new')}
            </Button>
          )}
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-4">
          {editing !== null && (
            <ProposalForm
              key={editing}
              initial={
                current
                  ? { ...EMPTY_PROPOSAL, ...current }
                  : editing.startsWith('sample')
                    ? (Object.fromEntries(
                        Object.entries(SAMPLE_PROPOSAL).map(([k, v]) => [k, l(v)]),
                      ) as ProposalDraft)
                    : EMPTY_PROPOSAL
              }
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
