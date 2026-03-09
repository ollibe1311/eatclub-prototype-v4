import { BarChart3 } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { SectionHeader } from "../shared/SectionHeader"
import { Card } from "../ui/card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table"
import { marketKPIs, marketTrendData, marketChartKPIs, marketPriceComparison, kpiSparklines, competitiveRanking } from "../../data/mock-data"
import { Sparkline } from "../shared/Sparkline"
import { useState } from "react"
import { cn } from "../../lib/utils"

export function MarketComparison() {
  const [activeTab, setActiveTab] = useState("revenue")

  return (
    <section>
      <SectionHeader icon={<BarChart3 className="w-5 h-5" />} title="Market comparison" />

      {/* 3 Colored KPI cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {marketKPIs.map((kpi, i) => {
          const sparklineKeys = ["revenuePerSqFt", "marketAov", "performanceGap"] as const
          return (
            <div
              key={kpi.label}
              className="rounded-[var(--radius-card)] p-6"
              style={{ backgroundColor: kpi.bgColor }}
            >
              <p className="text-3xl font-bold text-text-primary">{kpi.value}</p>
              <p className="text-sm text-text-secondary mt-1">{kpi.label}</p>
              <div className="mt-3">
                <Sparkline
                  data={kpiSparklines[sparklineKeys[i]]}
                  color={kpi.color}
                  width={80}
                  height={24}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Plain text tab bar */}
      <Card className="mb-6">
        <div className="flex items-center gap-6 mb-6">
          {[
            { value: "revenue", label: "Revenue per sq ft" },
            { value: "aov", label: "Average order value" },
            { value: "costs", label: "Costs" },
            { value: "rankings", label: "Rankings" },
          ].map((tab) => (
            <button
              key={tab.value}
              className={cn(
                "text-sm font-medium pb-1 cursor-pointer transition-colors",
                activeTab === tab.value
                  ? "text-text-primary border-b-2 border-text-primary"
                  : "text-text-secondary hover:text-text-primary"
              )}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* D2 — Competitive Ranking tab */}
        {activeTab === "rankings" ? (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-text-secondary">{competitiveRanking.area}</span>
              <span className="text-xs text-text-secondary bg-border/50 px-2 py-0.5 rounded-full">#{competitiveRanking.position} of {competitiveRanking.totalVenues}</span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 font-medium text-text-secondary w-12">Rank</th>
                  <th className="text-left py-3 font-medium text-text-secondary">Venue</th>
                  <th className="text-right py-3 font-medium text-text-secondary">Revenue</th>
                  <th className="text-right py-3 font-medium text-text-secondary">Trend</th>
                </tr>
              </thead>
              <tbody>
                {competitiveRanking.peers.map((peer) => (
                  <tr
                    key={peer.rank}
                    className={cn(
                      "border-b border-border last:border-b-0",
                      peer.isYou && "bg-accent-gold/20"
                    )}
                  >
                    <td className="py-3 font-medium">#{peer.rank}</td>
                    <td className={cn("py-3", peer.isYou && "font-bold")}>{peer.name}</td>
                    <td className="py-3 text-right">{peer.revenue}</td>
                    <td className={cn("py-3 text-right font-medium", peer.trend > 0 ? "text-green" : "text-red")}>
                      {peer.trend > 0 ? "+" : ""}{peer.trend}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            {/* Chart KPIs — plain text with indicators */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              {marketChartKPIs.map((kpi) => (
                <div key={kpi.label}>
                  <p className="text-3xl font-bold text-text-primary">{kpi.value}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {kpi.type === "circle" && (
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: kpi.color }} />
                    )}
                    {kpi.type === "line" && (
                      <span className="w-4 border-t-2" style={{ borderColor: kpi.color }} />
                    )}
                    <span className="text-sm text-text-secondary">{kpi.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={marketTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e7e7" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#4e4e4e" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#4e4e4e" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip formatter={(value) => [`$${Number(value).toFixed(2)}`, ""]} />
                <Line
                  dataKey="venue"
                  name="Your Venue"
                  stroke="#f8d54b"
                  strokeWidth={2.5}
                  dot={{ fill: "#f8d54b", r: 5, stroke: "#fff", strokeWidth: 2 }}
                  type="monotone"
                />
                <Line
                  dataKey="market"
                  name="Market Average"
                  stroke="#313131"
                  strokeWidth={2}
                  dot={{ fill: "#313131", r: 4, stroke: "#fff", strokeWidth: 1 }}
                  type="monotone"
                />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}
      </Card>

      {/* Market Price Comparison */}
      <Card>
        <p className="text-sm font-semibold mb-4">Market price comparison</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead className="text-right">Your Price</TableHead>
              <TableHead className="text-right">Market Avg</TableHead>
              <TableHead className="text-right">Difference</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {marketPriceComparison.map((row) => (
              <TableRow key={row.item}>
                <TableCell className="font-medium">{row.item}</TableCell>
                <TableCell className="text-right">{row.venue}</TableCell>
                <TableCell className="text-right text-text-secondary">{row.market}</TableCell>
                <TableCell className="text-right text-green font-medium">{row.diff}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </section>
  )
}
