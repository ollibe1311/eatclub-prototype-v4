import { useState, useCallback } from "react"
import type { FormEvent } from "react"
import { Lock } from "lucide-react"
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

const PASS_HASH = "3@tclUb"
const STORAGE_KEY = "ec-bi-auth"

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (value === PASS_HASH) {
      sessionStorage.setItem(STORAGE_KEY, "1")
      onUnlock()
    } else {
      setError(true)
      setValue("")
    }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-8 bg-white rounded-[32px] shadow-lg border border-border text-center">
        <div className="w-12 h-12 rounded-full bg-accent-gold/20 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-5 h-5 text-accent-olive" />
        </div>
        <h1 className="text-lg font-semibold text-text-primary mb-1">EatClub Analytics</h1>
        <p className="text-sm text-text-secondary mb-6">Enter the password to view this prototype</p>
        <input
          type="password"
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(false) }}
          placeholder="Password"
          className="w-full px-4 py-3 rounded-xl border border-border text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent-gold/50 mb-3"
          autoFocus
        />
        {error && <p className="text-xs text-red mb-3">Incorrect password</p>}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-text-primary text-white text-sm font-medium hover:bg-text-primary/90 transition-colors cursor-pointer"
        >
          View Prototype
        </button>
      </form>
    </div>
  )
}

function App() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(STORAGE_KEY) === "1")
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

  if (!authed) return <PasswordGate onUnlock={() => setAuthed(true)} />

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
