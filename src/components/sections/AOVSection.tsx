import { TrendingUp, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { SectionHeader } from "../shared/SectionHeader"
import { ChartControls } from "../shared/ChartControls"
import { EventCard } from "../shared/EventCard"
import { Card } from "../ui/card"
import { aovKPIs, aovTrendData, aovEvents } from "../../data/mock-data"

export function AOVSection() {
  return (
    <section>
      <SectionHeader icon={<TrendingUp className="w-5 h-5" />} title="Average Order Value - (AOV)" />

      {/* Plain-text KPIs with green subtext */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {aovKPIs.map((kpi) => (
          <div key={kpi.label}>
            <p className="text-3xl font-bold text-text-primary">{kpi.value}</p>
            <p className="text-sm text-text-secondary mt-0.5">{kpi.label}</p>
            {kpi.subtext && (
              <p className="text-xs text-green mt-0.5">{kpi.subtext}</p>
            )}
          </div>
        ))}
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
          <ComposedChart data={aovTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e7e7e7" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#4e4e4e" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#4e4e4e" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} domain={[15, 30]} />
            <Tooltip formatter={(value) => [`$${Number(value).toFixed(2)}`, ""]} />
            <Legend />
            <Bar dataKey="pos" name="POS AOV" fill="#313131" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="eatclub" name="EatClub AOV" fill="#f8d54b" radius={[4, 4, 0, 0]} barSize={20} />
            <Line dataKey="avg" name="Average" stroke="#788229" strokeWidth={2} dot={{ fill: "#788229", r: 4 }} />
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
