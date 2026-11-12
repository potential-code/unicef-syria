import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-navy",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline:
          "border border-primary/40 bg-white text-primary shadow-xs hover:border-primary hover:bg-sky-50",
        secondary: "bg-sky-100 text-ink hover:bg-sky-200",
        ghost: "text-ink hover:bg-sky-50",
        link: "text-primary underline underline-offset-4 hover:no-underline",
      },
      // Compact, consistent control heights: 36 / 40 / 48 px.
      size: {
        default: "h-10 px-4 text-sm has-[>svg]:px-3.5",
        sm: "h-9 gap-1.5 px-3 text-sm has-[>svg]:px-2.5",
        lg: "h-12 px-6 text-base has-[>svg]:px-5",
        icon: "size-10",
        "icon-sm": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
