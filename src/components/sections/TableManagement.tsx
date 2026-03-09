import { useState } from "react"
import { LayoutGrid } from "lucide-react"
import { SectionHeader } from "../shared/SectionHeader"
import { tableKPIs, heatmapData, heatmapDays, tableTurnover } from "../../data/mock-data"
import { cn } from "../../lib/utils"

const kpiIcons: Record<string, string> = {
  gear: "⚙️",
  people: "👥",
  clock: "🕐",
  calendar: "📅",
}

function getHeatCellStyle(value: string | null): { bg: string; text: string; border?: string } {
  if (!value) return { bg: "bg-white/10", text: "text-white/30" }
  const num = parseInt(value)
  if (num >= 94) return { bg: "bg-[#c8d44b]", text: "text-[#3d4a0f]" }
  if (num >= 81) return { bg: "bg-[#a8b535]", text: "text-[#3d4a0f]" }
  if (num >= 43) return { bg: "bg-[#d4dc7a]", text: "text-[#3d4a0f]" }
  if (num >= 32) return { bg: "bg-[#e2e8a8]", text: "text-[#3d4a0f]" }
  if (num <= 10) return { bg: "bg-white/20", text: "text-red-400", border: "border border-red-400/50" }
  return { bg: "bg-[#e8ecb8]", text: "text-[#3d4a0f]" }
}

export function TableManagement() {
  const [interval, setInterval] = useState<"30" | "60">("30")

  return (
    <section>
      <SectionHeader icon={<LayoutGrid className="w-5 h-5" />} title="Table management - Utilisation" />

      {/* KPIs — plain text with icons */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {tableKPIs.map((kpi) => (
          <div key={kpi.label} className="flex items-start gap-3">
            <div>
              <p className="text-3xl font-bold text-text-primary">{kpi.value}</p>
              <p className="text-sm text-text-secondary mt-0.5">{kpi.label}</p>
            </div>
            <span className="text-xl mt-1 opacity-50">{kpiIcons[kpi.icon]}</span>
          </div>
        ))}
      </div>

      {/* Dark olive heatmap */}
      <div className="rounded-[var(--radius-card)] bg-[#6b7a1f] p-6 mb-6">
        {/* Controls inside dark area */}
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex rounded-full bg-white/20 p-0.5">
            <button
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-full transition-colors cursor-pointer",
                interval === "30" ? "bg-white text-text-primary" : "text-white/80 hover:text-white"
              )}
              onClick={() => setInterval("30")}
            >
              30 mins
            </button>
            <button
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-full transition-colors cursor-pointer",
                interval === "60" ? "bg-white text-text-primary" : "text-white/80 hover:text-white"
              )}
              onClick={() => setInterval("60")}
            >
              60 mins
            </button>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/30 text-xs text-white font-medium">
              High $1,200+
            </span>
            <div className="flex gap-1">
              <span className="w-12 h-3 rounded-sm bg-[#c8d44b]" />
              <span className="w-12 h-3 rounded-sm bg-[#d4dc7a]" />
              <span className="w-8 h-3 rounded-sm bg-white/30" />
            </div>
          </div>
        </div>

        {/* Time labels */}
        <div className="grid gap-1.5 mb-1" style={{ gridTemplateColumns: `48px repeat(10, 1fr)` }}>
          <div />
          <div className="text-xs text-white/70 text-center">9am</div>
          <div className="text-xs text-white/70 text-center">9:30am</div>
          <div /><div /><div /><div /><div /><div /><div /><div />
        </div>

        {/* Heatmap grid */}
        <div className="space-y-1.5">
          {heatmapDays.map((day, di) => (
            <div key={day} className="grid gap-1.5" style={{ gridTemplateColumns: `48px repeat(10, 1fr)` }}>
              <div className="text-xs text-white/70 flex items-center">{day}</div>
              {heatmapData[di].map((val, ti) => {
                const style = getHeatCellStyle(val)
                return (
                  <div
                    key={`${di}-${ti}`}
                    className={cn(
                      "h-9 rounded-md flex items-center justify-center text-xs font-medium transition-colors",
                      style.bg,
                      style.text,
                      style.border
                    )}
                  >
                    {val || ""}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Turnover stats below heatmap */}
      <div className="grid grid-cols-3 gap-8">
        {tableTurnover.map((item) => (
          <div key={item.label}>
            <p className="text-3xl font-bold text-text-primary">{item.value}</p>
            <p className="text-sm text-text-secondary mt-1">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
