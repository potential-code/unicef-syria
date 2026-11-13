import type { Youth } from '@shared/types'
import { useTranslation } from 'react-i18next'
import { COURSE_BY_ID } from '@/data/courses'
import { courseStatus } from '@/domain/completion'
import { useLocalized } from '@/i18n'
import { CAREER_LINKS } from '../config'
import { resumeTarget } from '../lib'

export interface NextStep {
  title: string
  body?: string
  to: string
  cta: string
}

/** Recommended next action for the dashboard and path (brief §2 Y02, §5 demonstration path). */
export function useNextAction(y: Youth): NextStep {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  if (!y.assessment)
    return {
      title: t('next.discover'),
      body: t('next.discoverBody'),
      to: '/youth/discovery',
      cta: t('next.discoverCta'),
    }
  if (!y.route)
    return {
      title: t('next.route'),
      body: t('next.routeBody'),
      to: '/youth/discovery/results',
      cta: t('next.routeCta'),
    }
  if (!y.pathGenerated)
    return {
      title: t('next.path'),
      body: t('next.pathBody'),
      to: '/youth/path',
      cta: t('next.pathCta'),
    }

  // Next: apply to a trainer-led centre programme (general courses stay open meanwhile).
  if (!y.trainingApplication)
    return {
      title: t('next.programme'),
      body: t('next.programmeBody'),
      to: '/youth/programmes',
      cta: t('next.programmeCta'),
    }

  const active = y.plan.find((id) => courseStatus(y.progress[id]) === 'inProgress')
  const target = active ?? y.plan.find((id) => courseStatus(y.progress[id]) === 'todo')
  if (!target)
    return {
      title: t('next.apply'),
      body: t('next.applyBody'),
      to: CAREER_LINKS.opportunities,
      cta: t('next.applyCta'),
    }

  const course = COURSE_BY_ID[target]
  const where = resumeTarget(y.progress[target])
  const to = where === 'quiz' ? `/youth/learn/${target}/quiz` : `/youth/learn/${target}/${where}`
  if (!active)
    return {
      title: t('next.start', { id: target, title: l(course.title) }),
      body: l(course.units[0]?.synopsis),
      to,
      cta: t('next.startCta'),
    }
  if (where === 'quiz')
    return {
      title: t('next.quiz', { id: target }),
      body: l(course.title),
      to,
      cta: t('next.quizCta'),
    }
  // C05 Unit 3 pairs with the CV builder (main walkthrough step 2).
  const cv = target === 'C05' && where === 3
  return {
    title: cv
      ? t('next.unitCv', { id: target, unit: where })
      : t('next.unit', { id: target, unit: where }),
    body: l(course.units[where - 1]?.title),
    to,
    cta: t('next.unitCta'),
  }
}
