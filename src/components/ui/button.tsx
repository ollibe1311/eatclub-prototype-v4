import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import type { ButtonHTMLAttributes } from "react"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors cursor-pointer disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-text-primary text-white rounded-[var(--radius-pill)] hover:bg-text-secondary",
        outline: "border border-border bg-card text-text-primary rounded-[var(--radius-pill)] hover:bg-gray-50",
        ghost: "text-text-secondary hover:bg-gray-100 rounded-lg",
        pill: "bg-white border border-border rounded-[var(--radius-pill)] text-text-primary hover:bg-gray-50",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 py-1 text-xs",
        lg: "h-12 px-6 py-3",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
}
