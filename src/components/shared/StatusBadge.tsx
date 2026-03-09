import { Badge } from "../ui/badge"

const statusConfig = {
  hot: { emoji: "🔥", variant: "hot" as const, label: "Hot" },
  cooling: { emoji: "❄️", variant: "cooling" as const, label: "Cooling" },
  steady: { emoji: "⚖️", variant: "steady" as const, label: "Steady" },
  ontrack: { emoji: "✅", variant: "ontrack" as const, label: "On track" },
  overtarget: { emoji: "⚠️", variant: "overtarget" as const, label: "Over target" },
  efficient: { emoji: "⚡", variant: "efficient" as const, label: "Efficient" },
}

interface StatusBadgeProps {
  status: keyof typeof statusConfig
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <Badge variant={config.variant} className={className}>
      <span>{config.emoji}</span>
      {config.label}
    </Badge>
  )
}
