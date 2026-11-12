import { Link } from '@tanstack/react-router'
import { ArrowRight, ListChecks } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Checkbox } from '@/components/ui/checkbox'

export interface ActionItem {
  id: string
  title: string
  body: string
  to?: string
  search?: Record<string, string>
}

/** Programme action list (brief §18): tick items off in this session; links open the records. */
export function ActionList({ title, items }: { title: string; items: ActionItem[] }) {
  const { t } = useTranslation('admin')
  const [done, setDone] = useState<string[]>([])
  return (
    <section aria-labelledby="actions-title" className="rounded-3xl border bg-white p-5 shadow-sm">
      <h2 id="actions-title" className="mb-1 flex items-center gap-2 text-lg">
        <ListChecks className="size-5 text-blue" aria-hidden />
        {title}
      </h2>
      <p className="mb-4 text-sm text-ink-soft">
        {t('actions.body', { done: done.length, total: items.length })}
      </p>
      {items.length === 0 ? (
        <p className="rounded-2xl bg-sky-50 p-4 text-sm text-ink-soft">{t('actions.none')}</p>
      ) : (
        <ul className="space-y-2">
          {items.map((a) => {
            const checked = done.includes(a.id)
            const id = `act-${a.id}`
            return (
              <li
                key={a.id}
                className="flex flex-wrap items-start gap-3 rounded-2xl border p-3 sm:flex-nowrap"
              >
                <Checkbox
                  id={id}
                  checked={checked}
                  className="mt-1 size-5"
                  onCheckedChange={(v) => {
                    setDone((d) => (v ? [...d, a.id] : d.filter((x) => x !== a.id)))
                    if (v) toast.success(t('actions.marked'))
                  }}
                />
                <label htmlFor={id} className="min-w-0 flex-1 cursor-pointer">
                  <span
                    className={
                      checked ? 'font-medium text-ink-soft line-through' : 'font-medium text-ink'
                    }
                  >
                    {a.title}
                  </span>
                  <span className="block text-sm text-ink-soft">{a.body}</span>
                </label>
                {a.to && (
                  <Link
                    to={a.to}
                    search={(a.search ?? {}) as never}
                    className="inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-sm font-semibold text-blue hover:bg-sky-50"
                  >
                    {t('actions.open')}
                    <ArrowRight className="size-4 rtl-mirror" aria-hidden />
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
