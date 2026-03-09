import { useState } from "react"
import { TrendingUp, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { SectionHeader } from "../shared/SectionHeader"
import { ChartControls } from "../shared/ChartControls"
import { EventCard } from "../shared/EventCard"
import { Card } from "../ui/card"
import { AnomalyBadge } from "../shared/AnomalyBadge"
import { AnomalyExplanation } from "../shared/AnomalyExplanation"
import { aovKPIs, aovTrendDataWithRolling, aovEvents, kpiSparklines, anomalies } from "../../data/mock-data"
import { Sparkline } from "../shared/Sparkline"

export function AOVSection() {
  const [showAnomalies, setShowAnomalies] = useState(false)
  const sectionAnomalies = anomalies.filter((a) => a.section === "aov-section")

  return (
    <section>
      <SectionHeader icon={<TrendingUp className="w-5 h-5" />} title="Average Order Value - (AOV)">
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

      {/* Plain-text KPIs with green subtext */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {aovKPIs.map((kpi, i) => {
          const sparklineKeys = ["posAov", "eatclubAov", "sevenDayAvgAov", "directCustomers"] as const
          return (
            <div key={kpi.label}>
              <p className="text-3xl font-bold text-text-primary">{kpi.value}</p>
              <p className="text-sm text-text-secondary mt-0.5">{kpi.label}</p>
              {kpi.subtext && (
                <p className="text-xs text-green mt-0.5">{kpi.subtext}</p>
              )}
              <div className="mt-1.5">
                <Sparkline data={kpiSparklines[sparklineKeys[i]]} />
              </div>
            </div>
          )
        })}
      </div>

      <Card>
        <div className="mb-4">
          <ChartControls
            filters={[
              { options: [{ value: "all", label: "Show All" }, { value: "pos", label: "POS" }, { value: "eatclub", label: "EatClub" }] },
              { options: [{ value: "3day", label: "3-day avg" }, { value: "7day", label: "7-day avg" }] },
            ]}
          />
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={aovTrendDataWithRolling}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e7e7e7" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#4e4e4e" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#4e4e4e" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} domain={[15, 30]} />
            <Tooltip formatter={(value) => [value != null ? `$${Number(value).toFixed(2)}` : "—", ""]} />
            <Legend />
            <Bar dataKey="pos" name="POS AOV" fill="#313131" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="eatclub" name="EatClub AOV" fill="#f8d54b" radius={[4, 4, 0, 0]} barSize={20} />
            <Line dataKey="avg" name="Average" stroke="#788229" strokeWidth={2} dot={{ fill: "#788229", r: 4 }} />
            {/* C3 — Rolling 3-Day AOV Signal */}
            <Line
              dataKey="rolling3d"
              name="Rolling 3-Day"
              stroke="#d93636"
              strokeWidth={2}
              strokeDasharray="6 3"
              dot={{ fill: "#d93636", r: 3 }}
              connectNulls={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      {/* Key Events — horizontal scroll below chart */}
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
          {aovEvents.map((ev, i) => (
            <EventCard key={i} {...ev} className="flex-shrink-0" />
          ))}
        </div>
      </div>
    </section>
  )
}
