import type { CourseId } from '@shared/types'

/**
 * Hash-router href for pages owned by other feature areas (library, path, dashboard). Plain
 * anchors keep this feature independent of route files that may be generated later.
 */
export function hashHref(path: string): string {
  return `#${path}`
}

export function courseHref(courseId: CourseId): string {
  return hashHref(`/youth/library/${courseId}`)
}
