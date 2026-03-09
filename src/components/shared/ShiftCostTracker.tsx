import { Users, DollarSign, TrendingUp, Clock } from "lucide-react"
import { currentShift } from "../../data/mock-data"
import { cn } from "../../lib/utils"

export function ShiftCostTracker() {
  const overTarget = currentShift.labourPct > currentShift.target

  return (
    <div className="grid grid-cols-4 gap-3 mb-6">
      <div className="p-4 bg-white rounded-2xl border border-border">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-text-secondary" />
          <span className="text-xs text-text-secondary">Staff on Floor</span>
        </div>
        <p className="text-2xl font-bold text-text-primary">{currentShift.staffOnFloor}</p>
        <p className="text-[10px] text-text-secondary mt-1">{currentShift.shiftStart} – {currentShift.shiftEnd}</p>
      </div>

      <div className="p-4 bg-white rounded-2xl border border-border">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-4 h-4 text-text-secondary" />
          <span className="text-xs text-text-secondary">Labour Cost</span>
        </div>
        <p className="text-2xl font-bold text-text-primary">${currentShift.labourCost}</p>
        <p className="text-[10px] text-text-secondary mt-1">This shift</p>
      </div>

      <div className="p-4 bg-white rounded-2xl border border-border">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-text-secondary" />
          <span className="text-xs text-text-secondary">Shift Revenue</span>
        </div>
        <p className="text-2xl font-bold text-text-primary">${currentShift.revenueThisShift}</p>
        <p className="text-[10px] text-text-secondary mt-1">Since {currentShift.shiftStart}</p>
      </div>

      <div className={cn("p-4 rounded-2xl border", overTarget ? "bg-red/5 border-red/20" : "bg-green/5 border-green/20")}>
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-text-secondary" />
          <span className="text-xs text-text-secondary">Labour %</span>
        </div>
        <p className={cn("text-2xl font-bold", overTarget ? "text-red" : "text-green")}>{currentShift.labourPct}%</p>
        <p className="text-[10px] text-text-secondary mt-1">Target: {currentShift.target}%</p>
      </div>
    </div>
  )
}
