import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "../../lib/utils"

interface TrendIndicatorProps {
  value: number
  className?: string
}

export function TrendIndicator({ value, className }: TrendIndicatorProps) {
  const isPositive = value >= 0
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-sm font-medium",
        isPositive ? "text-green" : "text-red",
        className
      )}
    >
      {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
      {isPositive ? "+" : ""}{value.toFixed(1)}%
    </span>
  )
}
