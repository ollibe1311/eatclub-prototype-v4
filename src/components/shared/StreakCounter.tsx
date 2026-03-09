import { yoyStreak } from "../../data/mock-data"
import { cn } from "../../lib/utils"

export function StreakCounter() {
  return (
    <div className="mt-4 p-4 bg-green/5 border border-green/20 rounded-2xl">
      <div className="flex items-center gap-4">
        <div>
          <span className="text-4xl font-bold text-green">{yoyStreak.currentStreak}</span>
          <span className="text-sm text-text-secondary ml-1.5">weeks beating YoY</span>
        </div>
        <div className="flex items-center gap-1">
          {yoyStreak.weekDots.map((won, i) => (
            <div
              key={i}
              className={cn(
                "w-3 h-3 rounded-full",
                won ? "bg-green" : "bg-red/50"
              )}
            />
          ))}
        </div>
      </div>
      <p className="text-xs text-text-secondary mt-2">{yoyStreak.riskCopy}</p>
    </div>
  )
}
