import { revenueTarget } from "../../data/mock-data"
import { cn } from "../../lib/utils"

export function ProgressBar() {
  const { current, target, paceProjection, milestones, lossCopy } = revenueTarget
  const pct = Math.min((current / target) * 100, 100)
  const pacePct = Math.min((paceProjection / target) * 100, 100)

  // Color based on pace: gold (on track) → amber (behind) → red (way behind)
  const paceRatio = paceProjection / target
  const barColor = paceRatio >= 0.9 ? "bg-accent-gold" : paceRatio >= 0.7 ? "bg-amber" : "bg-red"
  const textColor = paceRatio >= 0.9 ? "text-accent-gold" : paceRatio >= 0.7 ? "text-amber" : "text-red"

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-text-primary">Daily Revenue Target</span>
        <span className="text-sm text-text-secondary">${current.toLocaleString()} / ${target.toLocaleString()}</span>
      </div>

      {/* Bar track */}
      <div className="relative h-6 bg-border/50 rounded-full overflow-hidden">
        {/* Actual fill */}
        <div
          className={cn("absolute inset-y-0 left-0 rounded-full transition-all", barColor)}
          style={{ width: `${pct}%` }}
        />
        {/* Pace projection dashed line */}
        <div
          className="absolute top-0 h-full w-0.5 border-l-2 border-dashed border-text-primary/40"
          style={{ left: `${pacePct}%` }}
        />
        {/* Milestone markers */}
        {milestones.map((m) => (
          <div
            key={m.pct}
            className="absolute top-0 h-full w-px bg-text-primary/20"
            style={{ left: `${m.pct}%` }}
          />
        ))}
      </div>

      {/* Milestone labels */}
      <div className="relative h-5 mt-1">
        {milestones.map((m) => (
          <span
            key={m.pct}
            className="absolute text-[10px] text-text-secondary -translate-x-1/2"
            style={{ left: `${m.pct}%` }}
          >
            {m.label}
          </span>
        ))}
      </div>

      {/* Loss-framed copy */}
      <p className={cn("text-xs font-medium mt-1", textColor)}>{lossCopy}</p>
    </div>
  )
}
