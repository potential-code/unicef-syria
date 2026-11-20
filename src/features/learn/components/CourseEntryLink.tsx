import type { CourseId, CourseProgress } from '@shared/types'
import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { courseEntry } from '../lib'

/** Opens the course view at the right place: unit 1 to review, else the resume point. */
export function CourseEntryLink({
  courseId,
  progress,
  className,
  children,
}: {
  courseId: CourseId
  progress: CourseProgress | undefined
  className?: string
  children: ReactNode
}) {
  const e = courseEntry(progress)
  return 'unit' in e ? (
    <Link to={e.to} params={{ courseId, unit: e.unit }} className={className}>
      {children}
    </Link>
  ) : (
    <Link to={e.to} params={{ courseId }} className={className}>
      {children}
    </Link>
  )
}
