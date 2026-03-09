import { revenueDrawerData } from "../../data/mock-data"
import { TrendIndicator } from "../shared/TrendIndicator"
import { Sparkline } from "../shared/Sparkline"

export function RevenueDrawer() {
  const { total, change, subcategories, topItems, miniTrend } = revenueDrawerData

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div>
        <p className="text-3xl font-bold text-text-primary">{total}</p>
        <div className="mt-1">
          <TrendIndicator value={change} />
        </div>
        <div className="mt-3">
          <Sparkline data={miniTrend} width={200} height={32} color="#313131" />
        </div>
      </div>

      {/* Subcategories */}
      <div>
        <p className="text-sm font-semibold mb-3">Revenue by Channel</p>
        <div className="space-y-3">
          {subcategories.map((cat) => (
            <div key={cat.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-text-secondary">{cat.name}</span>
                <span className="text-sm font-medium">{cat.value}</span>
              </div>
              <div className="h-2 bg-border/50 rounded-full overflow-hidden">
                <div className="h-full bg-accent-olive rounded-full" style={{ width: `${cat.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Items */}
      <div>
        <p className="text-sm font-semibold mb-3">Top Items</p>
        <div className="space-y-2">
          {topItems.map((item) => (
            <div key={item.name} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
              <div>
                <p className="text-sm font-medium text-text-primary">{item.name}</p>
                <p className="text-xs text-text-secondary">{item.orders} orders</p>
              </div>
              <span className="text-sm font-semibold">{item.revenue}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
