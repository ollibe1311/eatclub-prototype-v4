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
