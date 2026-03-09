import { GitCompare } from "lucide-react"
import { SectionHeader } from "../shared/SectionHeader"
import { Card } from "../ui/card"
import { TrendIndicator } from "../shared/TrendIndicator"
import { periodComparison, yearlyComparison } from "../../data/mock-data"
import { formatCurrency } from "../../lib/utils"

function ComparisonCard({ title, current, previous }: {
  title: string
  current: { label: string; amount: number; change: number }
  previous: { label: string; amount: number; change: number }
}) {
  return (
    <Card>
      <p className="text-sm font-semibold mb-4">{title}</p>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-text-secondary">{current.label}</p>
            <p className="text-xl font-bold">{formatCurrency(current.amount)}</p>
          </div>
          <TrendIndicator value={current.change} />
        </div>
        <div className="border-t border-border pt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-text-secondary">{previous.label}</p>
            <p className="text-lg font-semibold text-text-secondary">{formatCurrency(previous.amount)}</p>
          </div>
          <TrendIndicator value={previous.change} />
        </div>
      </div>
    </Card>
  )
}

export function PeriodComparison() {
  return (
    <section>
      <SectionHeader icon={<GitCompare className="w-5 h-5" />} title="Period Comparison" />
      <div className="grid grid-cols-2 gap-4">
        <ComparisonCard title="Period Comparison" current={periodComparison.current} previous={periodComparison.previous} />
        <ComparisonCard title="Yearly Comparison" current={yearlyComparison.current} previous={yearlyComparison.previous} />
      </div>
    </section>
  )
}
