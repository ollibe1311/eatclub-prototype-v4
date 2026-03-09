import { cn } from "../../lib/utils"

interface EventCardProps {
  title: string
  date: string
  value?: string
  change?: string
  className?: string
}

export function EventCard({ title, date, value, change, className }: EventCardProps) {
  return (
    <div className={cn("p-4 bg-card border border-border rounded-2xl flex items-center justify-between min-w-[220px]", className)}>
      <div>
        <p className="text-sm font-semibold text-text-primary">{title}</p>
        <p className="text-xs text-text-secondary mt-0.5">{date}</p>
      </div>
      {(value || change) && (
        <div className="text-right ml-4">
          {value && <p className="text-lg font-bold text-text-primary">{value}</p>}
          {change && <p className="text-xs text-green font-medium">{change}</p>}
        </div>
      )}
    </div>
  )
}
