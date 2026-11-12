import type { Toolkit, YouthId } from '@shared/types'
import { now } from '@/lib/clock'
import { update, withYouth } from '../db'
import { refreshBadges } from './youth'

/** Save any toolkit section; badges re-evaluate (e.g. Job Ready after CV + interview practice). */
export function saveToolkit<K extends keyof Toolkit>(youthId: YouthId, key: K, value: Toolkit[K]) {
  update((db) => withYouth(db, youthId, (y) => refreshBadges({ ...y, toolkit: { ...y.toolkit, [key]: value } })))
}

/** Append an AI-coach CV bullet (editable later in the CV builder). */
export function addCvBullet(youthId: YouthId, text: string) {
  update((db) =>
    withYouth(db, youthId, (y) => {
      const cv = y.toolkit.cv ?? { summary: '', education: '', experience: [], projects: '', skills: '', languages: '', includeCertificates: [] }
      // Replace the vague original bullet when present (C05 Unit 3 scenario).
      const experience = cv.experience.includes('Helped at events')
        ? cv.experience.map((e) => (e === 'Helped at events' ? text : e))
        : cv.experience.includes(text) ? cv.experience : [...cv.experience, text]
      return refreshBadges({ ...y, toolkit: { ...y.toolkit, cv: { ...cv, experience } } })
    }),
  )
}

export function addInterviewPractice(youthId: YouthId, question: string, answer: string, rating: 'developing' | 'clear' | 'strong', next: string) {
  update((db) =>
    withYouth(db, youthId, (y) =>
      refreshBadges({ ...y, toolkit: { ...y.toolkit, interviews: [...y.toolkit.interviews, { question, answer, rating, next, at: now() }] } }),
    ),
  )
}

export function addProposal(youthId: YouthId, p: Omit<Toolkit['proposals'][number], 'id'>) {
  update((db) =>
    withYouth(db, youthId, (y) =>
      refreshBadges({ ...y, toolkit: { ...y.toolkit, proposals: [...y.toolkit.proposals, { ...p, id: `PRP${y.toolkit.proposals.length + 1}` }] } }),
    ),
  )
}

export function updateProposal(youthId: YouthId, p: Toolkit['proposals'][number]) {
  update((db) =>
    withYouth(db, youthId, (y) => ({ ...y, toolkit: { ...y.toolkit, proposals: y.toolkit.proposals.map((x) => (x.id === p.id ? p : x)) } })),
  )
}

export function addCoachingNote(youthId: YouthId, note: string) {
  update((db) => withYouth(db, youthId, (y) => ({ ...y, coachingNotes: [...y.coachingNotes, note] })))
}
