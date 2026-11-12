import type { Youth } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { Avatar } from '@/components/shared/Avatar'

/** Learner name with avatar; links to the record when a path is given. */
export function LearnerName({ y, to }: { y: Youth; to?: string }) {
  const body = (
    <span className="flex items-center gap-2.5">
      <Avatar src={y.image} name={y.profile.name} size={32} />
      <span className="min-w-0">
        <span className="block font-medium text-ink">{y.profile.name}</span>
        <span className="block text-xs text-ink-soft">{y.id}</span>
      </span>
    </span>
  )
  return to ? (
    <Link
      to={to}
      params={{ youthId: y.id } as never}
      className="rounded-lg hover:text-blue focus-visible:outline-2 [&_span.font-medium]:hover:text-blue"
    >
      {body}
    </Link>
  ) : (
    body
  )
}
