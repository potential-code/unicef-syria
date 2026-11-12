import type { CommunityPost, Localized } from '@shared/types'
import { Send } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { addPost } from '@/store/actions/community'

/** New post in the selected group, with a reminder of the community guidelines. */
export function NewPostForm({
  groupId,
  groupName,
  me,
}: {
  groupId: CommunityPost['groupId']
  groupName: string
  me: Localized
}) {
  const { t } = useTranslation('career')
  const [text, setText] = useState('')
  const [tried, setTried] = useState(false)
  const invalid = text.trim().length < 5

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setTried(true)
    if (invalid) return
    addPost(groupId, me, text.trim())
    setText('')
    setTried(false)
    toast.success(t('community.postToast', { group: groupName }))
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-2xl border-2 border-blue/20 bg-white p-4 shadow-sm"
    >
      <Label htmlFor="new-post" className="font-semibold">
        {t('community.newPost', { group: groupName })}
      </Label>
      <Textarea
        id="new-post"
        rows={3}
        className="mt-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('community.newPostPlaceholder')}
        aria-invalid={tried && invalid}
        aria-describedby="new-post-hint"
      />
      {tried && invalid && <p className="mt-1 text-sm text-danger">{t('community.postError')}</p>}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p id="new-post-hint" className="text-xs text-ink-soft">
          {t('community.postHint')}
        </p>
        <Button type="submit" className="rounded-full">
          <Send className="size-4 rtl-mirror" aria-hidden />
          {t('community.publish')}
        </Button>
      </div>
    </form>
  )
}
