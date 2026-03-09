import { useState, useCallback } from "react"
import { TopNavBar } from "./components/layout/TopNavBar"
import { PulseStrip } from "./components/layout/PulseStrip"
import { InsightStrip } from "./components/layout/InsightStrip"
import { GlanceView } from "./components/layout/GlanceView"
import { RevenueSummary } from "./components/sections/RevenueSummary"
import { RevenueTrend } from "./components/sections/RevenueTrend"
import { TableManagement } from "./components/sections/TableManagement"
import { BookingsService } from "./components/sections/BookingsService"
import { OrderAnalysis } from "./components/sections/OrderAnalysis"
import { TopDishes } from "./components/sections/TopDishes"
import { AOVSection } from "./components/sections/AOVSection"
import { CostManagement } from "./components/sections/CostManagement"
import { MarketComparison } from "./components/sections/MarketComparison"
import { DetailDrawer } from "./components/shared/DetailDrawer"
import { RevenueDrawer } from "./components/drawers/RevenueDrawer"

function App() {
  const [viewMode, setViewMode] = useState<"full" | "glance">("full")
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleNavigate = useCallback((moduleId: string) => {
    // Switch to full view if in glance mode
    if (viewMode === "glance") setViewMode("full")
    // Scroll to the target section after a brief delay for view switch
    setTimeout(() => {
      const el = document.getElementById(moduleId)
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }, [viewMode])

  return (
    <div className="min-h-screen bg-bg">
      <TopNavBar viewMode={viewMode} onToggleView={() => setViewMode(viewMode === "full" ? "glance" : "full")} />
      <PulseStrip />

      {viewMode === "glance" ? (
        <GlanceView onNavigate={handleNavigate} />
      ) : (
        <>
          <InsightStrip onNavigate={handleNavigate} />
          <main className="max-w-[1440px] mx-auto px-8 py-8 space-y-10">
            <h1 className="text-[32px] font-semibold text-text-primary">Business Analytics</h1>
            <div id="revenue-summary"><RevenueSummary /></div>
            <div id="revenue-trend"><RevenueTrend onOpenDrawer={() => setDrawerOpen(true)} /></div>
            <div id="table-management"><TableManagement /></div>
            <div id="bookings-service"><BookingsService /></div>
            <div id="order-analysis"><OrderAnalysis /></div>
            <div id="top-dishes"><TopDishes /></div>
            <div id="aov-section"><AOVSection /></div>
            <div id="cost-management"><CostManagement /></div>
            <div id="market-comparison"><MarketComparison /></div>
          </main>
        </>
      )}

      <DetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="POS Revenue — Breakdown">
        <RevenueDrawer />
      </DetailDrawer>
    </div>
  )
}

export default App
