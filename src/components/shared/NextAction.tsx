import { Link } from '@tanstack/react-router'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Motif } from '@/components/brand'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/** Persistent next-action card (brief §1 Global behaviour). */
export function NextAction({
  label,
  title,
  body,
  to,
  cta,
  className,
}: {
  label: string
  title: string
  body?: string
  to: string
  cta: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'on-dark relative overflow-hidden rounded-2xl bg-grad-unicef p-6 text-white shadow-lg',
        className,
      )}
    >
      <Motif variant="card" className="text-white/[0.12]" />
      <p className="relative flex items-center gap-1.5 text-xs font-bold tracking-wider text-white/85 uppercase">
        <Sparkles className="size-3.5" aria-hidden />
        {label}
      </p>
      <p className="relative mt-1.5 text-xl leading-snug font-bold">{title}</p>
      {body && <p className="relative mt-1 text-sm text-white/85">{body}</p>}
      <Button
        asChild
        className="relative mt-4 rounded-full bg-white text-navy shadow-md hover:bg-sky-100"
      >
        <Link to={to}>
          {cta}
          <ArrowRight className="size-4 rtl-mirror" aria-hidden />
        </Link>
      </Button>
    </div>
  )
}
