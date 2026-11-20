import type { CourseId, Unit, YouthId } from '@shared/types'
import { Lightbulb, MessageSquareQuote, PencilLine, Save, UserRound } from 'lucide-react'
import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Motif } from '@/components/brand'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useLocalized } from '@/i18n'
import { saveReflection } from '@/store/actions/learning'
import { SelfCheckList } from './SelfCheckList'

const MIN = 15

/** Practical scenario as an activity: read the situation, write your response, then compare. */
export function ScenarioActivity({
  unit,
  courseId,
  youthId,
  initial,
  onSaved,
}: {
  unit: Unit
  courseId: CourseId
  youthId: YouthId
  initial: string
  onSaved: () => void
}) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  const id = useId()
  const [saved, setSaved] = useState(initial)
  const [text, setText] = useState(saved)
  const short = text.trim().length < MIN

  const save = () => {
    saveReflection(youthId, courseId, unit.id, text.trim())
    setSaved(text.trim())
    toast.success(t('scenario.saved'))
    onSaved()
  }

  return (
    <div className="space-y-5">
      <section className="card relative overflow-hidden rounded-3xl border-s-4 border-s-yellow p-5 sm:p-6">
        <MessageSquareQuote className="absolute end-4 top-4 size-14 text-yellow/40" aria-hidden />
        <p className="relative text-xs font-bold uppercase tracking-wide text-blue">
          {t('scenario.situation')}
        </p>
        <p className="relative mt-2 pe-14 leading-relaxed text-ink">{l(unit.scenario)}</p>
      </section>

      <section className="card rounded-3xl p-5 sm:p-6" aria-labelledby={`${id}-h`}>
        <h3 id={`${id}-h`} className="flex items-center gap-2 text-base">
          <PencilLine className="size-5 text-blue" aria-hidden />
          {t('scenario.yourTurn')}
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-blue">
          <UserRound className="size-3.5" aria-hidden />
          {t('scenario.selfCheck')}
        </p>
        <Label htmlFor={`${id}-a`} className="mt-2 block text-sm font-normal text-ink-soft">
          {t('scenario.prompt')}
        </Label>
        <Textarea
          id={`${id}-a`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="mt-3"
          aria-describedby={`${id}-hint`}
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p id={`${id}-hint`} className="text-xs text-ink-soft">
            {saved ? t('scenario.savedHint') : t('scenario.hint', { n: MIN })}
          </p>
          <Button className="rounded-full" disabled={short || text.trim() === saved} onClick={save}>
            <Save className="size-4" aria-hidden />
            {t('scenario.save')}
          </Button>
        </div>
      </section>

      {saved && unit.takeaway && (
        <div className="on-dark relative flex items-start gap-3 overflow-hidden rounded-3xl bg-navy p-5 text-white shadow-md sm:p-6">
          <Motif variant="corner" className="text-cyan/20" />
          <Lightbulb className="relative mt-0.5 size-5 shrink-0 text-yellow" aria-hidden />
          <span className="relative">
            <span className="block text-xs font-bold uppercase tracking-wide text-yellow">
              {t('scenario.compare')}
            </span>
            <span className="mt-1 block text-lg font-semibold">{l(unit.takeaway)}</span>
          </span>
        </div>
      )}
      {saved && <SelfCheckList />}
    </div>
  )
}
