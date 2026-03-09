// Today's Pulse — intraday actual vs forecast (cumulative, hourly from 9AM)
// Modelled on real restaurant day: slow morning, lunch bump, quiet arvo, dinner ramp
const hours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM"]

export const todaysPulse = [
  {
    label: "Revenue",
    value: "$678",
    dayForecast: "$2,200",
    delta: -26.6,
    status: "amber" as const,
    lossCopy: "$780 behind forecast pace",
    intraday: hours.map((hour, i) => ({
      hour,
      //                  9AM  10AM  11AM  12PM  1PM   2PM   3PM   4PM   5PM   6PM   7PM    8PM    9PM    10PM
      actual:   i <= 6 ? [  0,   45,   95,  310,  450,  610,  678][i] : null,
      forecast:           [  0,   60,  180,  420,  640,  780,  940, 1080, 1280, 1520, 1760,  1940,  2080,  2200][i],
    })),
  },
  {
    label: "Covers",
    value: "38",
    dayForecast: "160",
    delta: -20.8,
    status: "red" as const,
    lossCopy: "10 covers behind pace",
    intraday: hours.map((hour, i) => ({
      hour,
      actual:   i <= 6 ? [  0,    2,    5,   16,   24,   32,   38][i] : null,
      forecast:           [  0,    3,   10,   26,   42,   54,   68,   82,   98,  118,  136,   148,   156,   160][i],
    })),
  },
  {
    label: "AOV",
    value: "$59.30",
    dayForecast: "$57.50",
    delta: 3.1,
    status: "green" as const,
    lossCopy: "$1.80 above forecast",
    intraday: hours.map((hour, i) => ({
      hour,
      actual:   i <= 6 ? [  0,   42,   48,   53,   56.5, 58.2, 59.3][i] : null,
      forecast:           [  0,   44,   46,   49.5, 52,   53.8, 54.8, 55.4, 55.9, 56.4, 56.8,  57.0,  57.3,  57.5][i],
    })),
  },
  {
    label: "Labour Cost %",
    value: "31.2%",
    dayForecast: "30.0%",
    delta: 1.2,
    status: "amber" as const,
    lossCopy: "1.2pts over budget",
    intraday: hours.map((hour, i) => ({
      hour,
      actual:   i <= 6 ? [  0,   42,   38,   35,   33.5, 32.2, 31.2][i] : null,
      forecast:           [  0,   40,   36.5, 33,   31.8, 31.2, 30.9, 30.7, 30.5, 30.4, 30.3,  30.2,  30.1,  30.0][i],
    })),
  },
]

// Data Freshness
export const dataFreshness = {
  lastUpdated: new Date(Date.now() - 2 * 60 * 1000), // 2 min ago
  status: "fresh" as const,
}

// KPI Sparklines — 7-point arrays for all 18 KPIs across 5 sections
export const kpiSparklines = {
  // Revenue Trend (4)
  posRevenue: [85200, 88400, 91200, 87600, 93400, 96100, 98450],
  eatclubRevenue: [31400, 32100, 33800, 32900, 34500, 35200, 35790],
  sevenDayAvg: [2100, 2200, 2180, 2300, 2280, 2350, 2345],
  avgPerDay: [2050, 2150, 2200, 2180, 2300, 2320, 2345],
  // Table Management (4)
  totalBooking: [4500, 4620, 4780, 4650, 4820, 4900, 4892],
  avgPartySize: [3.2, 3.3, 3.5, 3.4, 3.3, 3.5, 3.4],
  bookingTime: [20, 20.5, 21, 20, 19.5, 20.5, 20.5],
  waitlist: [3.8, 3.5, 3.2, 3.6, 3.3, 3.5, 3.4],
  // Bookings & Service (3)
  totalBookings: [245, 258, 262, 270, 265, 280, 277],
  walkins: [220, 215, 210, 218, 205, 212, 207],
  bookingsRevenue: [1180, 1220, 1280, 1250, 1310, 1330, 1345],
  // AOV (4)
  posAov: [58.2, 59.5, 60.1, 61.3, 60.8, 61.5, 62.08],
  eatclubAov: [60.1, 61.2, 62.5, 63.1, 62.8, 63.5, 64.08],
  sevenDayAvgAov: [40.2, 41.5, 42.1, 42.8, 43.2, 43.5, 43.8],
  directCustomers: [38.5, 39.2, 39.8, 40.1, 40.5, 40.8, 41.0],
  // Market Comparison (3)
  revenuePerSqFt: [8500, 8800, 9200, 9500, 9800, 9900, 10000],
  marketAov: [44.5, 45.2, 46.1, 46.8, 47.5, 48.1, 48.67],
  performanceGap: [28, 30, 31, 32, 33, 34, 35],
}

// Revenue Summary
export const revenueSummary = {
  totalRevenue: 134240.71,
  totalRevenueChange: 15.2,
  channels: [
    { channel: "POS Revenue", current: 98450.32, previous: 85230.18, change: 15.5 },
    { channel: "EatClub Revenue", current: 35790.39, previous: 31420.55, change: 13.9 },
    { channel: "Subtotal", current: 134240.71, previous: 116650.73, change: 15.1 },
  ],
  donut: { pos: 73, eatclub: 27 },
}

// Revenue Trend
export const revenueTrendKPIs = [
  { label: "POS Revenue", value: "$10,000", color: "#313131", type: "square" as const },
  { label: "EatClub Revenue", value: "$2,000", color: "#f8d54b", type: "square" as const },
  { label: "7 Day Average", value: "$2,345", color: null, type: "dashed" as const },
  { label: "Average per day", value: "$2,345", color: null, type: "none" as const },
]

export const revenueTrendData = [
  { day: "Mon", pos: 1800, eatclub: 700, label: "$10.36" },
  { day: "Tue", pos: 1700, eatclub: 650, label: "$10.36" },
  { day: "Wed", pos: 1600, eatclub: 600, label: "$10.36" },
  { day: "Thu", pos: 1200, eatclub: 500, label: "$10.36" },
  { day: "Fri", pos: 1900, eatclub: 750, label: "$10.36" },
  { day: "Sat", pos: 2000, eatclub: 800, label: "$10.36" },
  { day: "Sun", pos: 1850, eatclub: 700, label: "$10.36" },
]

export const revenueEvents = [
  { title: "Peak Day", date: "Thus 06 September", value: "$1,046", change: "↑ %15.0 avg" },
  { title: "New menu launch", date: "03 September", value: "$24.46", change: "↑ %15.0 avg" },
  { title: "Taylor Swift conert", date: "03 September", value: "$24.46", change: "↑ %15.0 avg" },
  { title: "Taylor Swift conert", date: "03 September", value: "$24.46", change: "↑ %15.0 avg" },
]

// Period Comparison (not visible as separate section in Figma — kept for compatibility)
export const periodComparison = {
  current: { label: "This Period", amount: 134240.71, change: 15.2 },
  previous: { label: "Last Period", amount: 116650.73, change: 8.4 },
}

export const yearlyComparison = {
  current: { label: "This Year", amount: 1842350.00, change: 22.1 },
  previous: { label: "Last Year", amount: 1509100.00, change: 14.3 },
}

// Table Management
export const tableKPIs = [
  { label: "Total booking", value: "4,892", icon: "gear" as const },
  { label: "Average party size", value: "3.4", icon: "people" as const },
  { label: "Booking time", value: "Sat 8:30pm", icon: "clock" as const },
  { label: "Waitlist", value: "3.4", icon: "calendar" as const },
]

// Heatmap data as percentage strings matching Figma exactly
export const heatmapData: (string | null)[][] = [
  // Mon - starts with empty slots then values
  [null, null, "43%", "32%", "32%", "32%", "43%", "32%", "32%", "32%"],
  // Tue
  [null, null, "43%", "32%", "32%", "32%", "43%", "32%", "32%", "32%"],
  // Wed
  ["100%", "43%", "43%", "32%", "32%", "32%", "43%", "32%", "32%", "32%"],
  // Thu
  ["100%", "43%", "43%", "32%", "32%", "10%", "43%", "32%", "32%", "10%"],
  // Fri
  ["100%", "100%", "81%", "81%", "94%", "91%", "81%", "81%", "94%", "91%"],
  // Sat
  ["100%", "100%", null, null, null, null, null, null, null, null],
  // Sun
  ["100%", "100%", "81%", "81%", "94%", "91%", "81%", "81%", "94%", "91%"],
]

export const heatmapDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
export const heatmapTimes = ["9am", "9:30am", "", "", "", "", "", "", "", ""]

export const tableTurnover = [
  { label: "Table turnover rate", value: "1.2" },
  { label: "No Show rate", value: "7.2%" },
  { label: "Revenue per table", value: "Sat 8:30pm" },
]

// Bookings & Service
export const bookingsKPIs = [
  { label: "Total Bookings", value: "277", trend: 8.5 },
  { label: "Walk-ins", value: "207", trend: -2.3 },
  { label: "Revenue", value: "$1,345", trend: 15.4 },
]

export const bookingsData = [
  { day: "Mon", bookings: 42, walkins: 15, noshow: 3 },
  { day: "Tue", bookings: 38, walkins: 18, noshow: 2 },
  { day: "Wed", bookings: 45, walkins: 20, noshow: 4 },
  { day: "Thu", bookings: 52, walkins: 22, noshow: 2 },
  { day: "Fri", bookings: 62, walkins: 25, noshow: 1 },
  { day: "Sat", bookings: 68, walkins: 18, noshow: 0 },
  { day: "Sun", bookings: 35, walkins: 10, noshow: 0 },
]

// Order Analysis
export const orderAnalysis = {
  aov: 21.46,
  aovChange: 5.3,
  previousAov: 20.23,
  channels: [
    { channel: "POS AOV", value: 20.22, change: -15.0, from: "$4,200" },
    { channel: "EatClub AOV", value: 20.22, change: 7.8, from: "$4,200" },
    { channel: "Subtotal", value: 20.22, change: 5.3, from: null },
  ],
}

// Top Dishes
export const topDishes = [
  { rank: 1, name: "Truffle Burrata", category: "Appetiser", status: "hot" as const, orders: 47, ordersDaily: 7, revenue: 752, revenueDaily: 7, movement: 3 },
  { rank: 2, name: "Truffle Burrata", category: "Appetiser", status: "cooling" as const, orders: 47, ordersDaily: 7, revenue: 752, revenueDaily: 7, movement: 3 },
  { rank: 3, name: "Truffle Burrata", category: "Appetiser", status: "steady" as const, orders: 47, ordersDaily: 7, revenue: 752, revenueDaily: 7, movement: 3 },
  { rank: 4, name: "Truffle Burrata", category: "Appetiser", status: "steady" as const, orders: 47, ordersDaily: 7, revenue: 752, revenueDaily: 7, movement: 3 },
  { rank: 5, name: "Truffle Burrata", category: "Appetiser", status: "steady" as const, orders: 47, ordersDaily: 7, revenue: 752, revenueDaily: 7, movement: 3 },
  { rank: 6, name: "Truffle Burrata", category: "Appetiser", status: "steady" as const, orders: 47, ordersDaily: 7, revenue: 752, revenueDaily: 7, movement: 0 },
]

// AOV Section
export const aovKPIs = [
  { label: "POS AOV", value: "$62.08", subtext: "5.2% avg from $64.12" },
  { label: "EatClub AOV", value: "$64.08", subtext: "5.2% avg from $64.12" },
  { label: "7-Day Avg", value: "$43.80", subtext: "5.2% avg from $64.12" },
  { label: "Direct Customers", value: "$41.00", subtext: "5.2% avg from $64.12" },
]

export const aovTrendData = [
  { day: "Mon", pos: 23.50, eatclub: 17.20, avg: 20.35 },
  { day: "Tue", pos: 24.10, eatclub: 17.80, avg: 20.95 },
  { day: "Wed", pos: 25.20, eatclub: 18.50, avg: 21.85 },
  { day: "Thu", pos: 24.80, eatclub: 18.10, avg: 21.45 },
  { day: "Fri", pos: 26.30, eatclub: 19.20, avg: 22.75 },
  { day: "Sat", pos: 25.80, eatclub: 18.80, avg: 22.30 },
  { day: "Sun", pos: 23.90, eatclub: 17.50, avg: 20.70 },
]

export const aovEvents = [
  { title: "Weekend promotion", date: "21 September", value: "$24.46", change: "15.0% avg" },
  { title: "Weekend promotion", date: "21 September", value: "$24.46", change: "15.0% avg" },
]

// Cost Management
export const costKPIs = {
  staffCost: { value: 32.4, target: 30.0, gap: 2.4, daily: [28, 31, 33, 35, 30, 29, 34] },
  foodCost: { value: 32.4, target: 30.0, gap: 2.4, daily: [27, 29, 30, 28, 27, 29, 31] },
}

export const costBreakdownPie = [
  { name: "Margin", value: 30, color: "#313131" },
  { name: "Labour", value: 25, color: "#788229" },
  { name: "Food", value: 20, color: "#9aa23a" },
  { name: "Rent & Utilities", value: 15, color: "#c8d44b" },
  { name: "Margin", value: 5, color: "#e8ec8a" },
  { name: "Margin", value: 5, color: "#f5f7c4" },
]

export const costBreakdownTable = [
  { category: "Margin", current: "14.5%", target: "15%", amount: "$5,075", status: "ontrack" as const, variance: "On target", color: "#313131" },
  { category: "Labour", current: "14.5%", target: "15%", amount: "$5,075", status: "overtarget" as const, variance: "+1.8%", color: "#788229" },
  { category: "Food", current: "14.5%", target: "15%", amount: "$5,075", status: "efficient" as const, variance: "-1.8%", color: "#9aa23a" },
  { category: "Rent & Utilities", current: "14.5%", target: "15%", amount: "$5,075", status: "efficient" as const, variance: "-1.8%", color: "#c8d44b" },
  { category: "Margin", current: "14.5%", target: "15%", amount: "$5,075", status: "efficient" as const, variance: "-1.8%", color: "#e8ec8a" },
  { category: "Margin", current: "14.5%", target: "15%", amount: "$5,075", status: "efficient" as const, variance: "On target", color: "#f5f7c4" },
]

export const costInsights = [
  { title: "Food cost effiency", description: "Food cost is 32% vs industry benchmark of 30%. Review supplier prices, adjust portion sizes, or optimize menu pricing for high-cost ingredients." },
  { title: "Labour cost control", description: "Labour cost at 28% is higher than ideal 25-26% for this revenue level. Reassess staff scheduling during low-demand periods or cross-train staff to reduce overtime." },
  { title: "Prime Cost Management", description: "Prime cost is 60%, hitting the upper acceptable limit. Combined review of food + labour; consider bundling deals that maintain margin without increasin..." },
]

// Market Comparison
export const marketKPIs = [
  { label: "Revenue per sq ft", value: "$10,000", color: "#f8d54b", bgColor: "#fef9e7" },
  { label: "Average order value", value: "$48.67", color: "#7c83db", bgColor: "#eeedf8" },
  { label: "Performance gap", value: "↑35%", color: "#44b66c", bgColor: "#e8f5ec" },
]

export const marketTrendData = [
  { day: "Mon", venue: 38, market: 35 },
  { day: "Tue", venue: 68, market: 48 },
  { day: "Wed", venue: 55, market: 35 },
  { day: "Thu", venue: 72, market: 50 },
  { day: "Fri", venue: 60, market: 45 },
  { day: "Sat", venue: 57, market: 35 },
  { day: "Sun", venue: 62, market: 40 },
]

export const marketChartKPIs = [
  { label: "Total Revenue", value: "$10,000", color: "#f8d54b", type: "circle" as const },
  { label: "Market average AOV", value: "$48.00", color: "#313131", type: "line" as const },
  { label: "Performance gap", value: "↑ 35%", color: "#44b66c", type: "none" as const },
]

export const marketPriceComparison = [
  { item: "Wagyu Burger", venue: "$30.00", market: "$28.50", diff: "+5.3%" },
  { item: "Fish & Chips", venue: "$25.00", market: "$24.00", diff: "+4.2%" },
  { item: "Caesar Salad", venue: "$18.00", market: "$17.50", diff: "+2.9%" },
  { item: "House Wine (glass)", venue: "$14.00", market: "$13.00", diff: "+7.7%" },
]

// ────────────────────────────────────────────────
// A1 — Revenue Target Progress Bar
// ────────────────────────────────────────────────
export const revenueTarget = {
  current: 678,
  target: 2200,
  paceProjection: 1640,  // where you'll end at current pace
  milestones: [
    { pct: 25, label: "$550" },
    { pct: 50, label: "$1,100" },
    { pct: 75, label: "$1,650" },
    { pct: 100, label: "$2,200" },
  ],
  lossCopy: "At current pace, you'll miss target by $560",
}

// ────────────────────────────────────────────────
// A2 — Bullet Chart Ranges for Cost Cards
// ────────────────────────────────────────────────
export const costBulletRanges = {
  staffCost: { poor: [0, 35] as [number, number], acceptable: [0, 32] as [number, number], good: [0, 28] as [number, number], target: 30, actual: 32.4 },
  foodCost: { poor: [0, 35] as [number, number], acceptable: [0, 32] as [number, number], good: [0, 28] as [number, number], target: 30, actual: 32.4 },
}

// ────────────────────────────────────────────────
// A3 — Dynamic Insight Cards
// ────────────────────────────────────────────────
export const dailyInsights = [
  { id: "ins-1", icon: "lightbulb" as const, text: "Revenue is 26% behind forecast pace. Consider running a lunchtime flash promotion to recover.", module: "revenue-summary", cta: "View Revenue" },
  { id: "ins-2", icon: "lightbulb" as const, text: "Staff cost is 2.4% over target — Thursday had 3 extra hours of overtime logged.", module: "cost-management", cta: "View Costs" },
  { id: "ins-3", icon: "lightbulb" as const, text: "Table utilisation on Tuesdays is only 32%. Consider a Tuesday special to drive mid-week traffic.", module: "table-management", cta: "View Tables" },
  { id: "ins-4", icon: "lightbulb" as const, text: "Truffle Burrata is trending — orders up 22% this week. Consider featuring it as a special.", module: "top-dishes", cta: "View Dishes" },
  { id: "ins-5", icon: "lightbulb" as const, text: "Your AOV is $1.80 above forecast — upselling is working. Keep pushing drink pairings.", module: "aov-section", cta: "View AOV" },
  { id: "ins-6", icon: "lightbulb" as const, text: "Walk-ins are down 2.3% — review your Google visibility and door signage placement.", module: "bookings-service", cta: "View Bookings" },
]

// ────────────────────────────────────────────────
// A4 — YoY Streak Counter
// ────────────────────────────────────────────────
export const yoyStreak = {
  currentStreak: 8,
  weekDots: [true, true, false, true, true, true, true, true, true, true, true, true] as boolean[],
  riskCopy: "4 more weeks to match your best streak of 12",
}

// ────────────────────────────────────────────────
// B1 — Anomaly Detection
// ────────────────────────────────────────────────
export const anomalies = [
  { id: "anom-1", section: "revenue-trend", severity: "red" as const, title: "Revenue Drop", explanation: "Thursday revenue was 31% below the 4-week Thursday average ($1,700 vs $2,460). This coincided with a road closure on Smith Street that reduced foot traffic.", suggestion: "Consider geo-targeted push notification next time nearby road works are scheduled." },
  { id: "anom-2", section: "cost-management", severity: "gold" as const, title: "Labour Spike", explanation: "Staff costs hit 35% on Thursday — 3 hours of unplanned overtime were logged when a team member called in sick. The replacement was on a higher rate.", suggestion: "Review on-call roster to ensure backup staff are at similar pay rates." },
  { id: "anom-3", section: "aov-section", severity: "gold" as const, title: "AOV Surge", explanation: "Saturday AOV jumped to $68.20, 12% above the 4-week Saturday average. This was driven by a wine-pairing dinner event that lifted per-head spend.", suggestion: "Schedule monthly wine-pairing events — they consistently lift AOV by 10-15%." },
]

// ────────────────────────────────────────────────
// B2 — Drill-Down Detail Drawer (Revenue example)
// ────────────────────────────────────────────────
export const revenueDrawerData = {
  title: "POS Revenue — Breakdown",
  total: "$98,450",
  change: 15.5,
  subcategories: [
    { name: "Dine-in", value: "$62,400", pct: 63 },
    { name: "Takeaway", value: "$22,100", pct: 23 },
    { name: "Delivery", value: "$13,950", pct: 14 },
  ],
  topItems: [
    { name: "Wagyu Burger", revenue: "$4,230", orders: 141 },
    { name: "Truffle Burrata", revenue: "$3,760", orders: 47 },
    { name: "Fish & Chips", revenue: "$3,125", orders: 125 },
    { name: "Caesar Salad", revenue: "$2,340", orders: 130 },
  ],
  miniTrend: [85200, 88400, 91200, 87600, 93400, 96100, 98450],
}

// ────────────────────────────────────────────────
// B3 — Period Comparison on Heatmap
// ────────────────────────────────────────────────
export const heatmapPreviousPeriod: (string | null)[][] = [
  [null, null, "38%", "28%", "30%", "28%", "40%", "30%", "28%", "30%"],
  [null, null, "40%", "30%", "28%", "30%", "38%", "28%", "30%", "28%"],
  ["95%", "40%", "38%", "28%", "30%", "28%", "40%", "30%", "28%", "28%"],
  ["92%", "38%", "40%", "30%", "28%", "12%", "40%", "30%", "28%", "12%"],
  ["95%", "92%", "75%", "78%", "88%", "85%", "75%", "78%", "88%", "85%"],
  ["95%", "92%", null, null, null, null, null, null, null, null],
  ["92%", "95%", "78%", "75%", "88%", "85%", "78%", "75%", "88%", "85%"],
]

// ────────────────────────────────────────────────
// C1 — Revenue Attribution (per-day waterfall)
// ────────────────────────────────────────────────
export const revenueAttribution: Record<string, { category: string; amount: number; pct: number }[]> = {
  Mon: [
    { category: "Dine-in", amount: 1260, pct: 50 },
    { category: "Takeaway", amount: 630, pct: 25 },
    { category: "EatClub", amount: 420, pct: 17 },
    { category: "Delivery", amount: 190, pct: 8 },
  ],
  Tue: [
    { category: "Dine-in", amount: 1175, pct: 50 },
    { category: "Takeaway", amount: 588, pct: 25 },
    { category: "EatClub", amount: 392, pct: 17 },
    { category: "Delivery", amount: 195, pct: 8 },
  ],
  Wed: [
    { category: "Dine-in", amount: 1100, pct: 50 },
    { category: "Takeaway", amount: 550, pct: 25 },
    { category: "EatClub", amount: 360, pct: 16 },
    { category: "Delivery", amount: 190, pct: 9 },
  ],
  Thu: [
    { category: "Dine-in", amount: 850, pct: 50 },
    { category: "Takeaway", amount: 425, pct: 25 },
    { category: "EatClub", amount: 280, pct: 16 },
    { category: "Delivery", amount: 145, pct: 9 },
  ],
  Fri: [
    { category: "Dine-in", amount: 1425, pct: 54 },
    { category: "Takeaway", amount: 570, pct: 21 },
    { category: "EatClub", amount: 465, pct: 18 },
    { category: "Delivery", amount: 190, pct: 7 },
  ],
  Sat: [
    { category: "Dine-in", amount: 1540, pct: 55 },
    { category: "Takeaway", amount: 560, pct: 20 },
    { category: "EatClub", amount: 480, pct: 17 },
    { category: "Delivery", amount: 220, pct: 8 },
  ],
  Sun: [
    { category: "Dine-in", amount: 1295, pct: 51 },
    { category: "Takeaway", amount: 555, pct: 22 },
    { category: "EatClub", amount: 430, pct: 17 },
    { category: "Delivery", amount: 270, pct: 10 },
  ],
}

// ────────────────────────────────────────────────
// C3 — Rolling 3-Day AOV
// ────────────────────────────────────────────────
export const aovTrendDataWithRolling = [
  { day: "Mon", pos: 23.50, eatclub: 17.20, avg: 20.35, rolling3d: null as number | null },
  { day: "Tue", pos: 24.10, eatclub: 17.80, avg: 20.95, rolling3d: null },
  { day: "Wed", pos: 25.20, eatclub: 18.50, avg: 21.85, rolling3d: 20.38 },
  { day: "Thu", pos: 24.80, eatclub: 18.10, avg: 21.45, rolling3d: 21.08 },
  { day: "Fri", pos: 26.30, eatclub: 19.20, avg: 22.75, rolling3d: 22.02 },
  { day: "Sat", pos: 25.80, eatclub: 18.80, avg: 22.30, rolling3d: 22.17 },
  { day: "Sun", pos: 23.90, eatclub: 17.50, avg: 20.70, rolling3d: 21.92 },
]

// ────────────────────────────────────────────────
// D1 — Event Calendar Integration
// ────────────────────────────────────────────────
export const upcomingEvents = [
  { date: "Thu", label: "AFL Round 1", type: "sport" as const },
  { date: "Fri", label: "Wine Dinner", type: "internal" as const },
  { date: "Sat", label: "Laneway Festival", type: "local" as const },
]

export const revenueForecastData = [
  ...revenueTrendData,
  { day: "Mon+", pos: 1750, eatclub: 680, label: "$2,430", forecast: true },
  { day: "Tue+", pos: 1850, eatclub: 720, label: "$2,570", forecast: true },
  { day: "Wed+", pos: 2100, eatclub: 850, label: "$2,950", forecast: true },
]

// ────────────────────────────────────────────────
// D2 — Competitive Ranking
// ────────────────────────────────────────────────
export const competitiveRanking = {
  position: 12,
  totalVenues: 87,
  area: "Inner Melbourne",
  peers: [
    { rank: 10, name: "Smith & Deli", revenue: "$142,500", trend: 8.2 },
    { rank: 11, name: "Chin Chin", revenue: "$138,200", trend: 5.1 },
    { rank: 12, name: "Your Venue", revenue: "$134,241", trend: 15.2, isYou: true },
    { rank: 13, name: "Tipo 00", revenue: "$131,800", trend: 3.4 },
    { rank: 14, name: "Supernormal", revenue: "$128,400", trend: -2.1 },
  ],
}

// ────────────────────────────────────────────────
// D3 — Live Shift Cost Tracker
// ────────────────────────────────────────────────
export const currentShift = {
  staffOnFloor: 6,
  labourCost: 412,
  revenueThisShift: 678,
  labourPct: 31.2,
  target: 30.0,
  shiftStart: "11:00 AM",
  shiftEnd: "3:00 PM",
}
