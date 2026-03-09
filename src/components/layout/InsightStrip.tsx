import { useState } from "react"
import { Lightbulb, X } from "lucide-react"
import { dailyInsights } from "../../data/mock-data"

interface InsightStripProps {
  onNavigate?: (moduleId: string) => void
}

export function InsightStrip({ onNavigate }: InsightStripProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())

  const visible = dailyInsights.filter((ins) => !dismissed.has(ins.id)).slice(0, 2)

  if (visible.length === 0) return null

  return (
    <div className="max-w-[1440px] mx-auto px-8 -mb-4">
      <div className="grid grid-cols-2 gap-4">
        {visible.map((insight) => (
          <div
            key={insight.id}
            className="flex items-start gap-3 p-4 bg-amber/5 border border-amber/20 rounded-2xl"
          >
            <div className="w-8 h-8 rounded-full bg-amber/15 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Lightbulb className="w-4 h-4 text-amber" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-primary leading-relaxed">{insight.text}</p>
              <button
                className="text-xs font-medium text-accent-olive mt-1.5 hover:underline cursor-pointer"
                onClick={() => onNavigate?.(insight.module)}
              >
                {insight.cta} →
              </button>
            </div>
            <button
              className="p-1 hover:bg-black/5 rounded-md cursor-pointer flex-shrink-0"
              onClick={() => setDismissed((prev) => new Set(prev).add(insight.id))}
            >
              <X className="w-3.5 h-3.5 text-text-secondary" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
