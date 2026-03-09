import { useState } from "react"
import { BarChart3, Download, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, LabelList } from "recharts"
import { SectionHeader } from "../shared/SectionHeader"
import { EventCard } from "../shared/EventCard"
import { Card } from "../ui/card"
import { AnomalyBadge } from "../shared/AnomalyBadge"
import { AnomalyExplanation } from "../shared/AnomalyExplanation"
import { revenueTrendKPIs, revenueTrendData, revenueEvents, kpiSparklines, anomalies, revenueAttribution, revenueForecastData, upcomingEvents } from "../../data/mock-data"
import { Sparkline } from "../shared/Sparkline"
import { cn } from "../../lib/utils"

interface RevenueTrendProps {
  onOpenDrawer?: () => void
}

export function RevenueTrend({ onOpenDrawer }: RevenueTrendProps) {
  const [showAnomalies, setShowAnomalies] = useState(false)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [showForecast, setShowForecast] = useState(false)

  const sectionAnomalies = anomalies.filter((a) => a.section === "revenue-trend")
  const chartData = showForecast ? revenueForecastData : revenueTrendData
  const attribution = selectedDay ? revenueAttribution[selectedDay] : null

  return (
    <section>
      <SectionHeader icon={<BarChart3 className="w-5 h-5" />} title="Revenue Trend">
        {sectionAnomalies.length > 0 && (
          <button className="flex items-center gap-1.5 cursor-pointer" onClick={() => setShowAnomalies(!showAnomalies)}>
            <AnomalyBadge count={sectionAnomalies.length} severity={sectionAnomalies[0].severity} />
            <span className="text-xs text-text-secondary">{showAnomalies ? "Hide" : "Show"} anomalies</span>
          </button>
        )}
      </SectionHeader>

      {showAnomalies && sectionAnomalies.map((a) => (
        <AnomalyExplanation key={a.id} severity={a.severity} title={a.title} explanation={a.explanation} suggestion={a.suggestion} />
      ))}

      {/* Plain-text KPIs — not in cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {revenueTrendKPIs.map((kpi, i) => {
          const sparklineKeys = ["posRevenue", "eatclubRevenue", "sevenDayAvg", "avgPerDay"] as const
          const isClickable = i === 0 && onOpenDrawer
          return (
            <div
              key={kpi.label}
              className={isClickable ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}
              onClick={isClickable ? onOpenDrawer : undefined}
            >
              <p className="text-3xl font-bold text-text-primary">{kpi.value}</p>
              <div className="flex items-center gap-2 mt-1">
                {kpi.type === "square" && kpi.color && (
                  <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: kpi.color }} />
                )}
                {kpi.type === "dashed" && (
                  <span className="w-4 border-t-2 border-dashed border-text-secondary" />
                )}
                <span className="text-sm text-text-secondary">{kpi.label}</span>
                {isClickable && <span className="text-xs text-accent-olive">→ Details</span>}
              </div>
              <div className="mt-1.5">
                <Sparkline data={kpiSparklines[sparklineKeys[i]]} color={kpi.color || "#788229"} />
              </div>
            </div>
          )
        })}
      </div>

      <Card>
        {/* Filter controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-border rounded-full text-sm font-medium text-text-primary cursor-pointer">
              Channel: All <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-border rounded-full text-sm font-medium text-text-primary cursor-pointer">
              Daily <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-border rounded-full text-sm font-medium text-text-primary cursor-pointer">
              Compare last period
            </button>
            {/* D1 — Forecast toggle */}
            <button
              className={cn(
                "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium cursor-pointer border",
                showForecast ? "bg-accent-olive text-white border-accent-olive" : "bg-white border-border text-text-primary"
              )}
              onClick={() => setShowForecast(!showForecast)}
            >
              +3 Day Forecast
            </button>
          </div>
          <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-border rounded-full text-sm font-medium text-text-primary cursor-pointer">
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>

        {/* Chart area */}
        <div className="mb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-secondary font-medium">Impact</span>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gray-200" />
              <span className="w-8 h-8 rounded-full bg-gray-200" />
            </div>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={chartData}
              barGap={0}
              barCategoryGap="20%"
              onClick={(data) => {
                if (data?.activeLabel) {
                  const label = String(data.activeLabel)
                  setSelectedDay(selectedDay === label ? null : label)
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e7e7" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#4e4e4e" }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 12, fill: "#4e4e4e" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
              />
              <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]} />
              <ReferenceLine y={2200} stroke="#313131" strokeDasharray="6 4" strokeWidth={1.5} />
              {/* D1 — Event markers */}
              {showForecast && upcomingEvents.map((ev) => (
                <ReferenceLine
                  key={ev.date}
                  x={ev.date === "Thu" ? "Thu" : ev.date === "Fri" ? "Fri" : "Sat"}
                  stroke="#f59e0b"
                  strokeDasharray="4 4"
                  strokeWidth={1}
                  label={{ value: ev.label, position: "top", fontSize: 10, fill: "#f59e0b" }}
                />
              ))}
              <Bar dataKey="pos" stackId="a" fill="#313131" radius={[0, 0, 0, 0]} />
              <Bar dataKey="eatclub" stackId="a" fill="#788229" radius={[4, 4, 0, 0]}>
                <LabelList
                  dataKey="label"
                  position="top"
                  style={{ fontSize: 11, fill: "#4e4e4e" }}
                  offset={8}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* C1 — Revenue Attribution on bar click */}
        {attribution && (
          <div className="mt-4 p-4 bg-bg rounded-2xl border border-border">
            <p className="text-sm font-semibold mb-3">{selectedDay} — Revenue Breakdown</p>
            <div className="space-y-2">
              {attribution.map((item) => (
                <div key={item.category} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-text-secondary">{item.category}</span>
                      <span className="text-xs font-medium">${item.amount.toLocaleString()} ({item.pct}%)</span>
                    </div>
                    <div className="h-2 bg-border/50 rounded-full overflow-hidden">
                      <div className="h-full bg-accent-olive/60 rounded-full" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* D1 — Upcoming Events section */}
      {showForecast && (
        <div className="mt-4 p-4 bg-amber/5 border border-amber/20 rounded-2xl">
          <p className="text-sm font-semibold mb-2">Coming Up</p>
          <div className="flex gap-4">
            {upcomingEvents.map((ev) => (
              <div key={ev.label} className="flex items-center gap-2">
                <span className={cn(
                  "w-2 h-2 rounded-full",
                  ev.type === "sport" ? "bg-red" : ev.type === "internal" ? "bg-accent-olive" : "bg-amber"
                )} />
                <span className="text-xs font-medium">{ev.date}</span>
                <span className="text-xs text-text-secondary">{ev.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Events — below chart, horizontal scroll */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-lg">🔮</span>
            <span className="text-base font-semibold text-text-primary">Key events</span>
            <div className="flex items-center gap-1 ml-2">
              <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-text-secondary hover:bg-gray-50 cursor-pointer">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-text-secondary hover:bg-gray-50 cursor-pointer">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <button className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary cursor-pointer">
            Show all <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {revenueEvents.map((ev, i) => (
            <EventCard key={i} {...ev} className="flex-shrink-0" />
          ))}
        </div>
      </div>
    </section>
  )
}
