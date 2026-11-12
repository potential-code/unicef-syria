import type { CommunityPost, Localized } from '@shared/types'
import { Flag, MessageCircle, ShieldCheck } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Avatar } from '@/components/shared/Avatar'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { formatDate, formatTime, useLocalized } from '@/i18n'
import { addReply, reportPost } from '@/store/actions/community'
import { LText } from '../LText'

/** A moderated post with replies, a reply form and a report action. */
export function PostCard({ post, me }: { post: CommunityPost; me: Localized }) {
  const { t } = useTranslation('career')
  const { l, lang } = useLocalized()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [tried, setTried] = useState(false)
  const when = (iso: string) =>
    `${formatDate(iso, lang, { day: 'numeric', month: 'short' })}, ${formatTime(iso, lang)}`
  const invalid = text.trim().length < 2

  const reply = (e: FormEvent) => {
    e.preventDefault()
    setTried(true)
    if (invalid) return
    addReply(post.id, me, text.trim())
    setText('')
    setTried(false)
    toast.success(t('community.replyToast'))
  }

  return (
    <article className="rounded-2xl border bg-white p-5 shadow-sm">
      <header className="flex items-center gap-3">
        <Avatar name={l(post.author)} size={40} />
        <div className="min-w-0 flex-1">
          <p className="font-semibold">{l(post.author)}</p>
          <p className="text-xs text-ink-soft">{when(post.at)}</p>
        </div>
        {!post.reported && (
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full text-ink-soft"
            onClick={() => {
              reportPost(post.id)
              toast.success(t('community.reportToast'), {
                description: t('community.reportToastBody'),
              })
            }}
          >
            <Flag className="size-4" aria-hidden />
            {t('community.report')}
          </Button>
        )}
      </header>
      {post.reported ? (
        <p className="mt-3 flex items-start gap-2 rounded-xl bg-notice-soft p-3 text-sm">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-notice" aria-hidden />
          {t('community.reported')}
        </p>
      ) : (
        <p className="mt-3 whitespace-pre-line">
          <LText value={post.body} />
        </p>
      )}
      {post.replies.length > 0 && (
        <ul className="mt-4 space-y-2 border-s-2 border-sky-200 ps-4">
          {post.replies.map((r) => (
            <li key={`${r.at}-${r.author.en}`} className="rounded-xl bg-sky-50 p-3 text-sm">
              <p className="font-semibold">
                {l(r.author)}{' '}
                <span className="ms-1 text-xs font-normal text-ink-soft">{when(r.at)}</span>
              </p>
              <p className="mt-0.5">
                <LText value={r.body} />
              </p>
            </li>
          ))}
        </ul>
      )}
      {!post.reported && (
        <div className="mt-3">
          {open ? (
            <form onSubmit={reply} noValidate className="space-y-2">
              <Label htmlFor={`reply-${post.id}`}>{t('community.replyLabel')}</Label>
              <Textarea
                id={`reply-${post.id}`}
                rows={2}
                value={text}
                onChange={(e) => setText(e.target.value)}
                aria-invalid={tried && invalid}
              />
              {tried && invalid && (
                <p className="text-sm text-danger">{t('community.replyError')}</p>
              )}
              <div className="flex gap-2">
                <Button type="submit" size="sm" className="rounded-full">
                  {t('community.sendReply')}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="rounded-full"
                  onClick={() => setOpen(false)}
                >
                  {t('common:cancel')}
                </Button>
              </div>
            </form>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full text-blue"
              onClick={() => setOpen(true)}
            >
              <MessageCircle className="size-4" aria-hidden />
              {t('community.reply', { count: post.replies.length })}
            </Button>
          )}
        </div>
      )}
    </article>
  )
}
