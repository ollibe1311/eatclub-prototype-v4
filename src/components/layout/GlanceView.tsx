import { todaysPulse, revenueTarget, dailyInsights, anomalies } from "../../data/mock-data"
import { cn } from "../../lib/utils"

interface GlanceViewProps {
  onNavigate?: (moduleId: string) => void
}

export function GlanceView({ onNavigate }: GlanceViewProps) {
  const pct = Math.min((revenueTarget.current / revenueTarget.target) * 100, 100)
  const paceRatio = revenueTarget.paceProjection / revenueTarget.target
  const barColor = paceRatio >= 0.9 ? "bg-accent-gold" : paceRatio >= 0.7 ? "bg-amber" : "bg-red"

  return (
    <div className="max-w-[1440px] mx-auto px-8 py-8 space-y-6">
      <h1 className="text-[32px] font-semibold text-text-primary">At a Glance</h1>

      {/* Pulse Summary */}
      <div className="grid grid-cols-4 gap-4">
        {todaysPulse.map((kpi) => (
          <div
            key={kpi.label}
            className={cn(
              "p-4 rounded-2xl border",
              kpi.status === "green" ? "bg-green/5 border-green/20" :
              kpi.status === "amber" ? "bg-amber/5 border-amber/20" :
              "bg-red/5 border-red/20"
            )}
          >
            <p className="text-2xl font-bold text-text-primary">{kpi.value}</p>
            <p className="text-sm text-text-secondary">{kpi.label}</p>
            <p className={cn(
              "text-xs font-medium mt-1",
              kpi.status === "green" ? "text-green" : kpi.status === "amber" ? "text-amber" : "text-red"
            )}>
              {kpi.lossCopy}
            </p>
          </div>
        ))}
      </div>

      {/* Revenue Target Progress */}
      <div className="p-5 bg-white rounded-2xl border border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">Daily Revenue Progress</span>
          <span className="text-sm text-text-secondary">${revenueTarget.current.toLocaleString()} / ${revenueTarget.target.toLocaleString()}</span>
        </div>
        <div className="relative h-4 bg-border/50 rounded-full overflow-hidden">
          <div className={cn("absolute inset-y-0 left-0 rounded-full", barColor)} style={{ width: `${pct}%` }} />
        </div>
        <p className="text-xs text-text-secondary mt-2">{revenueTarget.lossCopy}</p>
      </div>

      {/* Anomaly Summary */}
      {anomalies.length > 0 && (
        <div className="p-5 bg-white rounded-2xl border border-border">
          <p className="text-sm font-semibold mb-3">Anomalies Detected ({anomalies.length})</p>
          <div className="space-y-2">
            {anomalies.map((a) => (
              <div
                key={a.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl",
                  a.severity === "red" ? "bg-red/5" : "bg-amber/5"
                )}
              >
                <div className={cn("w-2 h-2 rounded-full flex-shrink-0", a.severity === "red" ? "bg-red" : "bg-amber")} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-text-secondary truncate">{a.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Insights */}
      <div className="p-5 bg-white rounded-2xl border border-border">
        <p className="text-sm font-semibold mb-3">Today's Insights</p>
        <div className="space-y-3">
          {dailyInsights.slice(0, 3).map((ins) => (
            <div key={ins.id} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-amber mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm text-text-primary">{ins.text}</p>
                <button
                  className="text-xs text-accent-olive mt-1 hover:underline cursor-pointer"
                  onClick={() => onNavigate?.(ins.module)}
                >
                  {ins.cta} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
