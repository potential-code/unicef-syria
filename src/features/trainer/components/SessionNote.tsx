import { NotebookPen } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { saveSessionNote } from '@/store/actions/sessions'
import { useDb } from '@/store/db'

/** Brief follow-up note after a session (brief §17 T03). */
export function SessionNote({ sessionId }: { sessionId: string }) {
  const { t } = useTranslation('trainer')
  const saved = useDb((db) => db.sessionNotes[sessionId]) ?? ''
  const [text, setText] = useState(saved)
  const dirty = text.trim() !== saved.trim()
  return (
    <section className="card p-5 sm:p-6 xl:self-start">
      <h2 className="flex items-center gap-2 text-lg text-navy">
        <NotebookPen className="size-5 text-blue" aria-hidden />
        {t('note.title')}
      </h2>
      <Label htmlFor="s-note" className="mt-3 block text-sm text-ink-soft">
        {t('note.label')}
      </Label>
      <Textarea
        id="s-note"
        className="mt-1.5 min-h-24"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('note.placeholder')}
        maxLength={400}
      />
      <div className="mt-3 flex items-center justify-between gap-2">
        <p className="text-xs text-ink-soft tabular-nums">{text.length}/400</p>
        <Button
          size="sm"
          className="rounded-full"
          disabled={!dirty || !text.trim()}
          onClick={() => {
            saveSessionNote(sessionId, text.trim())
            toast.success(t('note.saved'))
          }}
        >
          {t('common:save')}
        </Button>
      </div>
    </section>
  )
}
