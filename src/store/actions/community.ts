import type { CommunityPost, Localized } from '@shared/types'
import { now } from '@/lib/clock'
import { update, useDb } from '../db'

export function usePosts() {
  return useDb((db) => db.posts)
}

export function addPost(groupId: CommunityPost['groupId'], author: Localized, body: string) {
  update((db) => ({
    ...db,
    posts: [
      {
        id: `CP${db.posts.length + 1}`,
        groupId,
        author,
        body: { en: body, ar: body },
        at: now(),
        replies: [],
      },
      ...db.posts,
    ],
  }))
}

export function addReply(postId: string, author: Localized, body: string) {
  update((db) => ({
    ...db,
    posts: db.posts.map((p) =>
      p.id === postId
        ? { ...p, replies: [...p.replies, { author, body: { en: body, ar: body }, at: now() }] }
        : p,
    ),
  }))
}

export function reportPost(postId: string) {
  update((db) => ({
    ...db,
    posts: db.posts.map((p) => (p.id === postId ? { ...p, reported: true } : p)),
  }))
}
