import type { Youth } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { Avatar } from '@/components/shared/Avatar'
import { cn } from '@/lib/utils'

/** Avatar and name linking to the learner's training record. */
export function LearnerName({
  youth,
  sub,
  className,
  link = true,
}: {
  youth: Youth
  sub?: string
  className?: string
  link?: boolean
}) {
  const body = (
    <>
      <Avatar src={youth.image} name={youth.profile.name} size={36} />
      <span className="min-w-0">
        <span className="block font-semibold text-ink group-hover:text-blue">
          {youth.profile.name}
        </span>
        {sub && <span className="block text-xs leading-snug text-ink-soft">{sub}</span>}
      </span>
    </>
  )
  if (!link) return <span className={cn('flex items-center gap-3', className)}>{body}</span>
  return (
    <Link
      to="/trainer/learners/$youthId"
      params={{ youthId: youth.id }}
      className={cn(
        'group flex min-h-11 items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      {body}
    </Link>
  )
}
