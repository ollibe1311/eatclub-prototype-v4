import { TopNavBar } from "./components/layout/TopNavBar"
import { RevenueSummary } from "./components/sections/RevenueSummary"
import { RevenueTrend } from "./components/sections/RevenueTrend"
import { TableManagement } from "./components/sections/TableManagement"
import { BookingsService } from "./components/sections/BookingsService"
import { OrderAnalysis } from "./components/sections/OrderAnalysis"
import { TopDishes } from "./components/sections/TopDishes"
import { AOVSection } from "./components/sections/AOVSection"
import { CostManagement } from "./components/sections/CostManagement"
import { MarketComparison } from "./components/sections/MarketComparison"

function App() {
  return (
    <div className="min-h-screen bg-bg">
      <TopNavBar />
      <main className="max-w-[1440px] mx-auto px-8 py-8 space-y-10">
        <h1 className="text-[32px] font-semibold text-text-primary">Business Analytics</h1>
        <RevenueSummary />
        <RevenueTrend />
        <TableManagement />
        <BookingsService />
        <OrderAnalysis />
        <TopDishes />
        <AOVSection />
        <CostManagement />
        <MarketComparison />
      </main>
    </div>
  )
}

export default App
