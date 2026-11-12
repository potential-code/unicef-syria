import { useTranslation } from 'react-i18next'
import { COURSE_BY_ID } from '@/data/courses'
import { useLocalized } from '@/i18n'
import type { GapItem, MatchItem } from '../../lib/match'

/** Turns match and gap items into sentences that name the actual evidence. */
export function useMatchText() {
  const { t } = useTranslation('career')
  const { l } = useLocalized()
  const course = (id: keyof typeof COURSE_BY_ID) => `${id} ${l(COURSE_BY_ID[id].title)}`
  const matchText = (m: MatchItem) => {
    if (m.kind === 'route') return t('opps.match.route')
    if (m.kind === 'course') return t('opps.match.course', { course: course(m.courseId) })
    if (m.kind === 'toolkit') return t(`opps.match.toolkit.${m.item}`)
    return t('opps.match.skill', { mine: m.mine, skill: l(m.skill) })
  }
  const gapText = (g: GapItem) =>
    g.kind === 'course'
      ? t('opps.match.gapCourse', { course: course(g.courseId) })
      : t(`opps.match.gapToolkit.${g.item}`)
  return { matchText, gapText }
}
