import type { Toolkit, ToolkitTarget, Youth } from '@shared/types'
import {
  addCvBullet,
  addInterviewPractice,
  addProposal,
  saveToolkit,
} from '@/store/actions/toolkit'

/** Read "Label: value" lines (optionally numbered) from a draft. */
function fields(text: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const raw of text.split('\n')) {
    const line = raw.replace(/^\s*\d+\.\s*/, '').trim()
    const m = line.match(/^([A-Za-z ]+):\s*(.+)$/)
    if (m?.[1] && m[2]) out[m[1].trim().toLowerCase()] = m[2].trim()
  }
  return out
}

/** Lines that are questions, without numbering or "Ask:" prefixes; skips "Instead of" examples. */
function questions(text: string): string[] {
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.endsWith('?') && !/^instead of/i.test(l))
    .map((l) =>
      l
        .replace(/^\s*\d+\.\s*/, '')
        .replace(/^ask:\s*/i, '')
        .trim(),
    )
}

/**
 * Save a reviewed coach draft to the right toolkit section (brief §12, §13).
 * `context` carries the learner's last answer (interview practice) and a client label (proposal).
 */
export function saveCoachDraft(
  y: Youth,
  target: ToolkitTarget,
  text: string,
  context: { answer: string; client: string; fallbackQuestion: string },
) {
  const f = fields(text)
  switch (target) {
    case 'cv':
      addCvBullet(y.id, text.trim())
      return
    case 'interview': {
      addInterviewPractice(
        y.id,
        f.question ?? context.fallbackQuestion,
        context.answer,
        'clear',
        f['next practice task'] ?? text.trim(),
      )
      return
    }
    case 'business': {
      const prev: NonNullable<Toolkit['business']> = y.toolkit.business ?? {
        customer: '',
        problem: '',
        solution: '',
        evidence: '',
        model: '',
        costs: '',
        nextExperiment: '',
        questions: [],
      }
      const qs = questions(text)
      const merged = {
        ...prev,
        customer: f.customer ?? prev.customer,
        problem: f.problem ?? prev.problem,
        solution: f['proposed solution'] ?? prev.solution,
        model: f['how it could earn'] ?? prev.model,
        nextExperiment: f['next experiment'] ?? prev.nextExperiment,
        questions: [...prev.questions, ...qs.filter((q) => !prev.questions.includes(q))],
      }
      const parsed = qs.length > 0 || Object.keys(f).length > 0
      saveToolkit(
        y.id,
        'business',
        parsed
          ? merged
          : { ...merged, evidence: [prev.evidence, text.trim()].filter(Boolean).join('\n') },
      )
      return
    }
    case 'proposal':
      addProposal(y.id, {
        client: context.client,
        goal: f['client goal'] ?? (Object.keys(f).length ? '' : text.trim()),
        experience: '',
        deliverables: f.deliverables ?? '',
        timing: f.timing ?? '',
        review: f['review stage'] ?? '',
        assumptions: f.assumptions ?? '',
        fee: '',
      })
      return
    case 'freelanceProfile': {
      const prev = y.toolkit.freelanceProfile ?? {
        services: '',
        samples: '',
        availability: '',
        assignments: '',
        pricing: '',
      }
      saveToolkit(y.id, 'freelanceProfile', {
        ...prev,
        services: f.service ?? prev.services,
        samples: f['work samples'] ?? prev.samples,
        availability: f.availability ?? prev.availability,
        assignments: f['preferred assignments'] ?? prev.assignments,
      })
      return
    }
    case 'plan':
      saveToolkit(y.id, 'plan', text.trim())
  }
}
