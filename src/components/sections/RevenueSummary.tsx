import { DollarSign } from "lucide-react"
import { SectionHeader } from "../shared/SectionHeader"
import { Card } from "../ui/card"
import { TrendIndicator } from "../shared/TrendIndicator"
import { DonutChart } from "../shared/DonutChart"
import { ProgressBar } from "../shared/ProgressBar"
import { StreakCounter } from "../shared/StreakCounter"
import { revenueSummary } from "../../data/mock-data"
import { formatCurrency } from "../../lib/utils"

export function RevenueSummary() {
  return (
    <section>
      <SectionHeader icon={<DollarSign className="w-5 h-5" />} title="Revenue Summary" />
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-accent-gold border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-text-primary/70 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold">{formatCurrency(revenueSummary.totalRevenue)}</p>
              <div className="mt-2">
                <TrendIndicator value={revenueSummary.totalRevenueChange} />
              </div>
            </div>
            <DonutChart value={revenueSummary.donut.pos} total={100} size={80} />
          </div>
          {/* A1 — Daily Revenue Target Progress Bar */}
          <ProgressBar />
        </Card>

        <Card>
          <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-4">Revenue Channels</p>
          <div className="space-y-3">
            {revenueSummary.channels.map((ch) => (
              <div key={ch.channel} className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">{ch.channel}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold">{formatCurrency(ch.current)}</span>
                  <TrendIndicator value={ch.change} className="text-xs" />
                </div>
              </div>
            ))}
          </div>
          {/* A4 — YoY Streak Counter */}
          <StreakCounter />
        </Card>
      </div>
    </section>
  )
}
