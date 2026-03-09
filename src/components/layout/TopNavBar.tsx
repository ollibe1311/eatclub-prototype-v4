import { Menu, ChevronDown, Calendar, Bell, Eye, LayoutGrid } from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuItem } from "../ui/dropdown-menu"
import { FreshnessIndicator } from "../shared/FreshnessIndicator"
import { AnomalyBadge } from "../shared/AnomalyBadge"
import { SavedViewsMenu } from "../shared/SavedViewsMenu"
import { dataFreshness, anomalies } from "../../data/mock-data"
import { useState } from "react"

interface TopNavBarProps {
  viewMode: "full" | "glance"
  onToggleView: () => void
}

export function TopNavBar({ viewMode, onToggleView }: TopNavBarProps) {
  const [savedView, setSavedView] = useState("default")
  const totalAnomalies = anomalies.length
  const worstSeverity = anomalies.some((a) => a.severity === "red") ? "red" as const : "gold" as const

  return (
    <nav className="sticky top-0 z-50 bg-bg border-b border-border/50 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-black/5 rounded-lg cursor-pointer">
            <Menu className="w-5 h-5 text-text-primary" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent-gold flex items-center justify-center">
              <span className="text-xs font-bold">EC</span>
            </div>
            <span className="font-semibold text-text-primary">EatClub</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Glance / Full toggle */}
          <button
            className="p-2 hover:bg-black/5 rounded-lg cursor-pointer"
            onClick={onToggleView}
            title={viewMode === "full" ? "Switch to Glance View" : "Switch to Full View"}
          >
            {viewMode === "full" ? <Eye className="w-5 h-5 text-text-secondary" /> : <LayoutGrid className="w-5 h-5 text-text-secondary" />}
          </button>

          {/* Global anomaly bell */}
          <button className="relative p-2 hover:bg-black/5 rounded-lg cursor-pointer">
            <Bell className="w-5 h-5 text-text-secondary" />
            <AnomalyBadge count={totalAnomalies} severity={worstSeverity} className="absolute -top-0.5 -right-0.5" />
          </button>

          <DropdownMenu
            trigger={
              <Button variant="pill" size="sm">
                Table Management
                <ChevronDown className="w-4 h-4" />
              </Button>
            }
          >
            <DropdownMenuItem>Table Management</DropdownMenuItem>
            <DropdownMenuItem>Revenue Analytics</DropdownMenuItem>
            <DropdownMenuItem>Cost Management</DropdownMenuItem>
          </DropdownMenu>

          <Button variant="pill" size="sm">
            <Calendar className="w-4 h-4" />
            7 days
            <ChevronDown className="w-4 h-4" />
          </Button>

          <SavedViewsMenu activeView={savedView} onSelectView={setSavedView} />

          <FreshnessIndicator lastUpdated={dataFreshness.lastUpdated} status={dataFreshness.status} />
        </div>
      </div>
    </nav>
  )
}
