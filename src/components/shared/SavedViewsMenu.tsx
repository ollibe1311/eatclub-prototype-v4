import { useState } from "react"
import { Bookmark, ChevronDown, Check } from "lucide-react"
import { cn } from "../../lib/utils"

interface SavedView {
  id: string
  label: string
  isPreset?: boolean
}

const defaultViews: SavedView[] = [
  { id: "default", label: "Default View", isPreset: true },
  { id: "cost-focus", label: "Cost Focus", isPreset: true },
]

interface SavedViewsMenuProps {
  activeView: string
  onSelectView: (viewId: string) => void
  onSaveView?: () => void
}

export function SavedViewsMenu({ activeView, onSelectView, onSaveView }: SavedViewsMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-border rounded-full text-sm font-medium text-text-primary cursor-pointer hover:bg-gray-50"
        onClick={() => setOpen(!open)}
      >
        <Bookmark className="w-3.5 h-3.5" />
        Views
        <ChevronDown className="w-3.5 h-3.5" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl border border-border shadow-lg z-50 py-1">
            {defaultViews.map((view) => (
              <button
                key={view.id}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 cursor-pointer",
                  activeView === view.id && "font-medium"
                )}
                onClick={() => { onSelectView(view.id); setOpen(false) }}
              >
                {activeView === view.id && <Check className="w-3.5 h-3.5 text-green" />}
                <span className={activeView !== view.id ? "ml-5.5" : ""}>{view.label}</span>
              </button>
            ))}
            <div className="border-t border-border my-1" />
            <button
              className="w-full text-left px-3 py-2 text-sm text-accent-olive hover:bg-gray-50 cursor-pointer"
              onClick={() => { onSaveView?.(); setOpen(false) }}
            >
              + Save current view
            </button>
          </div>
        </>
      )}
    </div>
  )
}
