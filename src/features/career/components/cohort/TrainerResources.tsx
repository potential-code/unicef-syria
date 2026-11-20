import type { ResourceLink, Youth } from '@shared/types'
import { Download, FileText, FolderOpen } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { COURSE_BY_ID } from '@/data/courses'
import { COHORTS } from '@/data/orgs'
import { TEMPLATE_BY_ID } from '@/data/templates'
import { formatDate, useLocalized } from '@/i18n'
import { linksFor, useResourceLinks } from '@/store/actions/resources'

/** Resources the learner's trainer linked to their cohort or cohort courses (T04, learner side). */
export function TrainerResources({ youth }: { youth: Youth }) {
  const { t } = useTranslation('career')
  const { l, lang } = useLocalized()
  const links = linksFor(youth, useResourceLinks())
  const label = (id: string) =>
    id.startsWith('K')
      ? l(COHORTS.find((c) => c.id === id)?.name)
      : `${id} ${l(COURSE_BY_ID[id as keyof typeof COURSE_BY_ID]?.title)}`

  return (
    <section className="card p-5 sm:p-6" aria-labelledby="trainer-res-h">
      <h2 id="trainer-res-h" className="flex items-center gap-2 text-lg">
        <FolderOpen className="size-5 text-blue" aria-hidden />
        {t('cohort.resources.title')}
      </h2>
      <p className="mt-1 text-sm text-ink-soft">{t('cohort.resources.body')}</p>
      {links.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-dashed border-cyan/40 bg-sky-50/70 p-4 text-sm text-ink-soft">
          {t('cohort.resources.empty')}
        </p>
      ) : (
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {links.map((r) => (
            <ResourceItem
              key={r.id}
              link={r}
              target={label(r.target)}
              date={formatDate(r.at, lang)}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

function ResourceItem({
  link,
  target,
  date,
}: {
  link: ResourceLink
  target: string
  date: string
}) {
  const { t } = useTranslation('career')
  const { l } = useLocalized()
  const tpl = TEMPLATE_BY_ID[link.template]
  const download = () => {
    const blob = new Blob([l(tpl.body)], { type: 'text/plain;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `${link.template}.txt`
    a.click()
    URL.revokeObjectURL(a.href)
  }
  return (
    <li className="flex flex-col rounded-2xl border border-border/70 bg-white p-4 shadow-sm">
      <p className="flex items-center gap-2 font-semibold">
        <FileText className="size-4 shrink-0 text-blue" aria-hidden />
        {l(tpl.title)}
      </p>
      <p className="mt-0.5 text-xs text-ink-soft">
        {target} · {date}
      </p>
      <p className="mt-2 text-sm">
        <span className="font-semibold text-navy">{t('cohort.resources.task')}: </span>
        {link.task}
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="mt-3 self-start rounded-full">
            {t('cohort.resources.open')}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{l(tpl.title)}</DialogTitle>
            <DialogDescription>{link.task}</DialogDescription>
          </DialogHeader>
          <pre
            className="max-h-[60vh] overflow-y-auto rounded-xl bg-sky-50 p-4 font-sans text-sm leading-relaxed whitespace-pre-wrap"
            dir="auto"
          >
            {l(tpl.body)}
          </pre>
          <Button className="self-start rounded-full" onClick={download}>
            <Download className="size-4" aria-hidden />
            {t('cohort.resources.download')}
          </Button>
        </DialogContent>
      </Dialog>
    </li>
  )
}
