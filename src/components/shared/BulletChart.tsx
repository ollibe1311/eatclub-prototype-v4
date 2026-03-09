import { cn } from "../../lib/utils"

interface BulletChartProps {
  poor: [number, number]
  acceptable: [number, number]
  good: [number, number]
  target: number
  actual: number
  max?: number
}

export function BulletChart({ poor, acceptable, good, target, actual, max = 40 }: BulletChartProps) {
  const toPct = (v: number) => (v / max) * 100
  const actualOver = actual > target

  return (
    <div className="relative h-10 w-full">
      {/* Range bands */}
      <div className="absolute inset-0 rounded-md overflow-hidden">
        <div className="absolute inset-y-0 bg-red/15" style={{ left: 0, width: `${toPct(poor[1])}%` }} />
        <div className="absolute inset-y-0 bg-amber/15" style={{ left: 0, width: `${toPct(acceptable[1])}%` }} />
        <div className="absolute inset-y-0 bg-green/15" style={{ left: 0, width: `${toPct(good[1])}%` }} />
      </div>

      {/* Actual bar */}
      <div
        className={cn(
          "absolute top-2.5 h-5 rounded-sm transition-all",
          actualOver ? "bg-red/70" : "bg-accent-olive/70"
        )}
        style={{ left: 0, width: `${toPct(actual)}%` }}
      />

      {/* Target line */}
      <div
        className="absolute top-1 h-8 w-0.5 bg-text-primary"
        style={{ left: `${toPct(target)}%` }}
      />

      {/* Labels */}
      <span
        className="absolute -bottom-4 text-[10px] text-text-secondary -translate-x-1/2"
        style={{ left: `${toPct(target)}%` }}
      >
        {target}%
      </span>
      <span
        className={cn("absolute -bottom-4 text-[10px] font-semibold -translate-x-1/2", actualOver ? "text-red" : "text-accent-olive")}
        style={{ left: `${toPct(actual)}%` }}
      >
        {actual}%
      </span>
    </div>
  )
}
