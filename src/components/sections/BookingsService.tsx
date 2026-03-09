import { CalendarCheck } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { SectionHeader } from "../shared/SectionHeader"
import { Card } from "../ui/card"
import { TrendIndicator } from "../shared/TrendIndicator"
import { bookingsKPIs, bookingsData } from "../../data/mock-data"

export function BookingsService() {
  return (
    <section>
      <SectionHeader icon={<CalendarCheck className="w-5 h-5" />} title="Bookings and service" />

      {/* Plain text KPIs */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {bookingsKPIs.map((kpi) => (
          <div key={kpi.label}>
            <p className="text-3xl font-bold text-text-primary">{kpi.value}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-text-secondary">{kpi.label}</span>
              <TrendIndicator value={kpi.trend} className="text-xs" />
            </div>
          </div>
        ))}
      </div>

      <Card>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bookingsData} barGap={2}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e7e7e7" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#4e4e4e" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#4e4e4e" }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="bookings" name="Bookings" fill="#313131" radius={[4, 4, 0, 0]} />
            <Bar dataKey="walkins" name="Walk-ins" fill="#f8d54b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="noshow" name="No-shows" fill="#d93636" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </section>
  )
}
