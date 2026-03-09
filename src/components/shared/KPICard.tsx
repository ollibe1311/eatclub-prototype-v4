import { cn } from "../../lib/utils"
import { TrendIndicator } from "./TrendIndicator"
import { DonutChart } from "./DonutChart"
import type { ReactNode } from "react"

interface KPICardProps {
  label: string
  value: string
  trend?: number
  icon?: ReactNode
  donut?: { value: number; total: number }
  accent?: boolean
  className?: string
}

export function KPICard({ label, value, trend, icon, donut, accent, className }: KPICardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] p-5 flex flex-col gap-2",
        accent ? "bg-accent-gold text-text-primary" : "bg-card border border-border",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={cn("text-xs font-medium uppercase tracking-wider mb-1", accent ? "text-text-primary/70" : "text-text-secondary")}>
            {label}
          </p>
          <p className="text-2xl font-bold">{value}</p>
          {trend !== undefined && (
            <div className="mt-1">
              <TrendIndicator value={trend} />
            </div>
          )}
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
            {icon}
          </div>
        )}
        {donut && (
          <DonutChart value={donut.value} total={donut.total} size={64} />
        )}
      </div>
    </div>
  )
}
