import { useState } from "react"
import { PiggyBank, ChevronLeft, ChevronRight } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { SectionHeader } from "../shared/SectionHeader"
import { Card } from "../ui/card"
import { StatusBadge } from "../shared/StatusBadge"
import { BulletChart } from "../shared/BulletChart"
import { AnomalyBadge } from "../shared/AnomalyBadge"
import { AnomalyExplanation } from "../shared/AnomalyExplanation"
import { ShiftCostTracker } from "../shared/ShiftCostTracker"
import { costKPIs, costBulletRanges, costBreakdownPie, costBreakdownTable, costInsights, anomalies } from "../../data/mock-data"
import { cn } from "../../lib/utils"

function CostCard({ title, value, gap, bulletData }: {
  title: string; value: number; gap: number
  bulletData: { poor: [number, number]; acceptable: [number, number]; good: [number, number]; target: number; actual: number }
}) {
  return (
    <Card>
      <p className="text-sm text-text-secondary mb-2">{title}</p>
      <div className="flex items-end gap-3 mb-4">
        <span className="text-3xl font-bold">${value}%</span>
      </div>
      {/* A2 — Bullet Chart replaces mini daily bars */}
      <div className="mb-4">
        <BulletChart {...bulletData} />
      </div>
      <p className="text-xs text-text-secondary mt-4">Gap: {gap}%</p>
    </Card>
  )
}

export function CostManagement() {
  const [showAnomalies, setShowAnomalies] = useState(false)
  const sectionAnomalies = anomalies.filter((a) => a.section === "cost-management")

  return (
    <section>
      <SectionHeader icon={<PiggyBank className="w-5 h-5" />} title="Cost Management">
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

      {/* D3 — Shift Cost Tracker */}
      <ShiftCostTracker />

      <div className="grid grid-cols-2 gap-4 mb-6">
        <CostCard title="Staff Cost" value={costKPIs.staffCost.value} gap={costKPIs.staffCost.gap} bulletData={costBulletRanges.staffCost} />
        <CostCard title="Food cost" value={costKPIs.foodCost.value} gap={costKPIs.foodCost.gap} bulletData={costBulletRanges.foodCost} />
      </div>

      {/* Cost Breakdown header */}
      <p className="text-sm font-semibold mb-4">Cost breakdown</p>

      <div className="grid grid-cols-[300px_1fr] gap-6 mb-6">
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={costBreakdownPie} innerRadius={0} outerRadius={120} dataKey="value" stroke="#fff" strokeWidth={2}>
                {costBreakdownPie.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 font-medium text-text-secondary">Category</th>
                <th className="text-left py-3 font-medium text-text-secondary">Current</th>
                <th className="text-left py-3 font-medium text-text-secondary">Target</th>
                <th className="text-left py-3 font-medium text-text-secondary">Amount</th>
                <th className="text-left py-3 font-medium text-text-secondary">Status</th>
                <th className="text-right py-3 font-medium text-text-secondary">Variance</th>
              </tr>
            </thead>
            <tbody>
              {costBreakdownTable.map((row, i) => (
                <tr key={i} className="border-b border-border last:border-b-0">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: row.color }} />
                      <span className="font-medium">{row.category}</span>
                    </div>
                  </td>
                  <td className="py-3">{row.current}</td>
                  <td className="py-3">{row.target}</td>
                  <td className="py-3">{row.amount}</td>
                  <td className="py-3"><StatusBadge status={row.status} /></td>
                  <td className={cn("py-3 text-right font-medium", row.variance.startsWith("+") ? "text-red" : row.variance.startsWith("-") ? "text-green" : "text-text-secondary")}>
                    {row.variance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights section */}
      <div className="mt-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-lg">🔮</span>
          <span className="text-base font-semibold text-text-primary">Insights</span>
          <div className="flex items-center gap-1 ml-2">
            <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-text-secondary hover:bg-gray-50 cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-text-secondary hover:bg-gray-50 cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {costInsights.map((insight, i) => (
            <Card key={i} className="p-5">
              <p className="text-sm font-semibold text-text-primary mb-2">{insight.title}</p>
              <p className="text-xs text-text-secondary leading-relaxed">{insight.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
