import type { CommunityPost } from '@shared/types'
import {
  Briefcase,
  HelpCircle,
  Lightbulb,
  Lock,
  MessagesSquare,
  Palette,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Stagger, StaggerItem } from '@/components/motion'
import { EmptyState } from '@/components/shared/EmptyState'
import { COMMUNITY_GROUPS } from '@/data/community'
import { COHORTS } from '@/data/orgs'
import { useLocalized } from '@/i18n'
import { usePosts } from '@/store/actions/community'
import { useMyYouth } from '@/store/hooks'
import { CareerHero } from '../components/CareerHero'
import { CommunityRules } from '../components/community/CommunityRules'
import { type GroupOption, GroupPicker } from '../components/community/GroupPicker'
import { NewPostForm } from '../components/community/NewPostForm'
import { PostCard } from '../components/community/PostCard'
import { EventCard } from '../components/EventCard'

const GROUP_STYLE = {
  career: { icon: HelpCircle, tone: 'bg-blue text-white' },
  jobSearch: { icon: Briefcase, tone: 'bg-cyan text-ink' },
  enterprise: { icon: Lightbulb, tone: 'bg-orange text-white' },
  freelance: { icon: Palette, tone: 'bg-yellow text-ink' },
} as const

/** Y13 moderated community groups, the learner's cohort group and the E01 event. */
export function CommunityPage() {
  const { t } = useTranslation('career')
  const { l } = useLocalized()
  const youth = useMyYouth()
  const posts = usePosts()
  const first = youth.profile.name.split(' ')[0] ?? youth.profile.name
  const me = { en: first, ar: first }

  const count = (id: string) => posts.filter((p) => p.groupId === id).length
  const groups: GroupOption[] = [
    ...COMMUNITY_GROUPS.map((g) => ({
      id: g.id,
      name: l(g.name),
      description: l(g.description),
      count: count(g.id),
      ...GROUP_STYLE[g.id],
    })),
    ...COHORTS.filter((c) => youth.cohortIds.includes(c.id)).map((c) => ({
      id: c.id,
      name: t('community.cohortGroup', { cohort: l(c.name) }),
      description: t('community.cohortGroupBody'),
      count: count(c.id),
      icon: Users,
      tone: 'bg-navy text-white',
      members: true,
    })),
  ]
  const restricted = COHORTS.filter((c) => !youth.cohortIds.includes(c.id)).map((c) => c.id)
  const [groupId, setGroupId] = useState<string>(groups[0]?.id ?? 'career')
  const group = groups.find((g) => g.id === groupId) ?? groups[0]
  const shown = posts.filter((p) => p.groupId === group?.id)

  return (
    <div className="space-y-8">
      <CareerHero
        icon={MessagesSquare}
        eyebrow={t('community.eyebrow')}
        title={t('community.title')}
        body={t('community.intro')}
      />
      <EventCard youth={youth} />
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="space-y-4">
          <GroupPicker
            groups={groups}
            value={group?.id ?? ''}
            onChange={setGroupId}
            label={t('community.groupsLabel')}
            membersLabel={t('community.membersOnly')}
            postsLabel={(n) => t('community.posts', { count: n })}
          />
          {restricted.length > 0 && (
            <p className="flex items-start gap-2 rounded-xl bg-blue-50 p-3 text-xs text-navy">
              <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden />
              {t('community.restricted', { cohorts: restricted.join(', ') })}
            </p>
          )}
          <div className="hidden lg:block">
            <CommunityRules />
          </div>
        </div>
        <section aria-labelledby="group-heading" className="space-y-4">
          <div>
            <h2 id="group-heading" className="text-2xl">
              {group?.name}
            </h2>
            <p className="text-sm text-ink-soft">{group?.description}</p>
          </div>
          {group && (
            <NewPostForm
              groupId={group.id as CommunityPost['groupId']}
              groupName={group.name}
              me={me}
            />
          )}
          {shown.length === 0 ? (
            <EmptyState
              icon={MessagesSquare}
              title={t('community.empty.title')}
              body={t('community.empty.body')}
            />
          ) : (
            <Stagger key={group?.id} className="space-y-4">
              {shown.map((p) => (
                <StaggerItem key={p.id}>
                  <PostCard post={p} me={me} />
                </StaggerItem>
              ))}
            </Stagger>
          )}
          <div className="lg:hidden">
            <CommunityRules />
          </div>
        </section>
      </div>
    </div>
  )
}
