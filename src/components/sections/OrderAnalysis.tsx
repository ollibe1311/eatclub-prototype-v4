import { ShoppingBag } from "lucide-react"
import { SectionHeader } from "../shared/SectionHeader"
import { Card } from "../ui/card"
import { TrendIndicator } from "../shared/TrendIndicator"
import { orderAnalysis } from "../../data/mock-data"
import { formatCurrency } from "../../lib/utils"

export function OrderAnalysis() {
  return (
    <section>
      <SectionHeader icon={<ShoppingBag className="w-5 h-5" />} title="Order Analysis" />
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-accent-gold border-none">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold">{formatCurrency(orderAnalysis.aov)}</p>
              <p className="text-sm text-text-primary/70 mt-1">Average order value</p>
              <div className="mt-2">
                <TrendIndicator value={orderAnalysis.aovChange} />
                <span className="text-xs text-text-primary/60 ml-1">from ${orderAnalysis.previousAov}</span>
              </div>
            </div>
            {/* Mini bar comparison */}
            <div className="flex items-end gap-3 mr-4">
              <div className="text-center">
                <p className="text-xs text-text-primary/60 mb-1">${orderAnalysis.previousAov}</p>
                <div className="w-14 h-20 bg-text-primary/20 rounded-t-md" />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold mb-1">{formatCurrency(orderAnalysis.aov)}</p>
                <div className="w-14 h-28 bg-[#4a5aab] rounded-t-md" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.15) 3px, rgba(255,255,255,0.15) 6px)" }} />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="space-y-0">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-sm text-text-secondary">Average order value</span>
              <span className="text-sm font-medium uppercase text-text-secondary">AOV</span>
            </div>
            {orderAnalysis.channels.map((ch) => (
              <div key={ch.channel} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                <div>
                  <span className="text-sm text-text-secondary">{ch.channel}</span>
                  {ch.from && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <TrendIndicator value={ch.change} className="text-xs" />
                      <span className="text-xs text-text-secondary">from {ch.from}</span>
                    </div>
                  )}
                </div>
                <span className="text-sm font-semibold">{formatCurrency(ch.value)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
