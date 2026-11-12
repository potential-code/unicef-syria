import type { CourseId, Opportunity } from '@shared/types'
import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/input'
import { COURSE_BY_ID } from '@/data/courses'
import { useLocalized } from '@/i18n'
import { ChoiceSelect } from './ChoiceSelect'
import { Field } from './Field'

export interface CandidateFilterState {
  opp: string
  skill: string
  course: string
  interest: string
  location: string
  availability: string
}

export const EMPTY_FILTERS: Omit<CandidateFilterState, 'opp'> = {
  skill: '',
  course: 'any',
  interest: 'any',
  location: 'any',
  availability: 'any',
}

/** Filters: skills, completed training, career interest, location, availability (brief §16 E02). */
export function CandidateFilters({
  value,
  onChange,
  opportunities,
  courses,
  interests,
  availability,
}: {
  value: CandidateFilterState
  onChange: (v: CandidateFilterState) => void
  opportunities: Opportunity[]
  courses: CourseId[]
  interests: string[]
  availability: string[]
}) {
  const { t } = useTranslation('employer')
  const { l } = useLocalized()
  const set = (k: keyof CandidateFilterState, v: string) => onChange({ ...value, [k]: v })
  const any = { value: 'any', label: t('candidates.any') }
  return (
    <div className="card grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
      <Field
        id="f-opp"
        label={t('candidates.matchAgainst')}
        className="sm:col-span-2 xl:col-span-1"
        compact
      >
        <ChoiceSelect
          size="sm"
          id="f-opp"
          value={value.opp}
          onChange={(v) => set('opp', v)}
          options={[
            { value: 'none', label: t('candidates.noOpp') },
            ...opportunities.map((o) => ({ value: o.id, label: `${o.id} ${l(o.title)}` })),
          ]}
        />
      </Field>
      <Field id="f-skill" label={t('candidates.skillFilter')} compact>
        <div className="relative">
          <Search
            className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-ink-soft"
            aria-hidden
          />
          <Input
            id="f-skill"
            value={value.skill}
            onChange={(e) => set('skill', e.target.value)}
            placeholder={t('candidates.skillPh')}
            className="h-9 ps-9"
          />
        </div>
      </Field>
      <Field id="f-course" label={t('candidates.trainingFilter')} compact>
        <ChoiceSelect
          size="sm"
          id="f-course"
          value={value.course}
          onChange={(v) => set('course', v)}
          options={[
            any,
            ...courses.map((c) => ({ value: c, label: `${c} ${l(COURSE_BY_ID[c].title)}` })),
          ]}
        />
      </Field>
      <Field id="f-interest" label={t('candidates.interestFilter')} compact>
        <ChoiceSelect
          size="sm"
          id="f-interest"
          value={value.interest}
          onChange={(v) => set('interest', v)}
          options={[any, ...interests.map((i) => ({ value: i, label: i }))]}
        />
      </Field>
      <Field id="f-location" label={t('candidates.locationFilter')} compact>
        <ChoiceSelect
          size="sm"
          id="f-location"
          value={value.location}
          onChange={(v) => set('location', v)}
          options={[
            any,
            ...(['Damascus', 'Aleppo', 'Homs'] as const).map((g) => ({
              value: g,
              label: t(`governorates.${g}`),
            })),
          ]}
        />
      </Field>
      <Field id="f-avail" label={t('candidates.availabilityFilter')} compact>
        <ChoiceSelect
          size="sm"
          id="f-avail"
          value={value.availability}
          onChange={(v) => set('availability', v)}
          options={[any, ...availability.map((a) => ({ value: a, label: a }))]}
        />
      </Field>
    </div>
  )
}
