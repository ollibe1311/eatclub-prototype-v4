import { cn } from "../../lib/utils"

interface AnomalyBadgeProps {
  count: number
  severity: "red" | "gold"
  className?: string
}

export function AnomalyBadge({ count, severity, className }: AnomalyBadgeProps) {
  if (count === 0) return null
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[11px] font-bold text-white",
        severity === "red" ? "bg-red" : "bg-amber",
        className
      )}
    >
      {count}
    </span>
  )
}
