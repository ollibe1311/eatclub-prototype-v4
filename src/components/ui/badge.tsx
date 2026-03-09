import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import type { HTMLAttributes } from "react"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-[var(--radius-pill)] px-3 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-text-secondary",
        hot: "bg-[#d4a574]/20 text-[#8b5e3c]",
        cooling: "bg-blue-50 text-blue-600",
        steady: "bg-gray-100 text-gray-500",
        ontrack: "bg-green-50 text-green-700",
        overtarget: "bg-red-50 text-red-600",
        efficient: "bg-emerald-50 text-emerald-700",
        movement: "bg-amber-50 text-amber-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
