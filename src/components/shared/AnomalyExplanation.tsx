import { AlertTriangle, ExternalLink } from "lucide-react"
import { cn } from "../../lib/utils"

interface AnomalyExplanationProps {
  severity: "red" | "gold"
  title: string
  explanation: string
  suggestion: string
  relatedSection?: string
  onNavigate?: (sectionId: string) => void
}

export function AnomalyExplanation({ severity, title, explanation, suggestion, relatedSection, onNavigate }: AnomalyExplanationProps) {
  return (
    <div className={cn(
      "p-4 rounded-2xl border mt-3",
      severity === "red" ? "bg-red/5 border-red/20" : "bg-amber/5 border-amber/20"
    )}>
      <div className="flex items-start gap-3">
        <AlertTriangle className={cn("w-4 h-4 mt-0.5 flex-shrink-0", severity === "red" ? "text-red" : "text-amber")} />
        <div className="flex-1">
          <p className="text-sm font-semibold text-text-primary">{title}</p>
          <p className="text-xs text-text-secondary mt-1 leading-relaxed">{explanation}</p>
          <p className="text-xs text-accent-olive mt-2 leading-relaxed font-medium">{suggestion}</p>
          {relatedSection && onNavigate && (
            <button
              className="inline-flex items-center gap-1 text-xs text-accent-olive mt-2 hover:underline cursor-pointer"
              onClick={() => onNavigate(relatedSection)}
            >
              View section <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
