import { Link } from '@tanstack/react-router'
import { ArrowRight, Sparkles } from 'lucide-react'
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
        'on-dark relative overflow-hidden rounded-2xl bg-grad-unicef p-5 text-white shadow-md',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -end-10 -top-10 size-40 rounded-full bg-white/10"
        aria-hidden
      />
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-white/85">
        <Sparkles className="size-3.5" aria-hidden />
        {label}
      </p>
      <p className="mt-1.5 text-lg font-bold leading-snug">{title}</p>
      {body && <p className="mt-1 text-sm text-white/85">{body}</p>}
      <Button asChild variant="secondary" className="mt-4 bg-white text-navy hover:bg-sky-100">
        <Link to={to}>
          {cta}
          <ArrowRight className="size-4 rtl-mirror" aria-hidden />
        </Link>
      </Button>
    </div>
  )
}
