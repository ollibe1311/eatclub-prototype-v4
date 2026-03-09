import { UtensilsCrossed, Minus } from "lucide-react"
import { SectionHeader } from "../shared/SectionHeader"
import { Card } from "../ui/card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table"
import { StatusBadge } from "../shared/StatusBadge"
import { topDishes } from "../../data/mock-data"
import { formatCurrency, cn } from "../../lib/utils"

export function TopDishes() {
  return (
    <section>
      <SectionHeader icon={<UtensilsCrossed className="w-5 h-5" />} title="Top performing dishes" />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Dish</TableHead>
              <TableHead>Trend</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-center">Movement</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topDishes.map((dish) => (
              <TableRow key={dish.rank}>
                <TableCell>
                  <span className="text-sm font-semibold text-text-primary">{dish.rank}</span>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-text-primary">{dish.name}</p>
                    <p className="text-xs text-text-secondary">{dish.category}</p>
                  </div>
                </TableCell>
                <TableCell><StatusBadge status={dish.status} /></TableCell>
                <TableCell className="text-right">
                  <p className="font-medium">{dish.orders}</p>
                  <p className="text-xs text-text-secondary">{dish.ordersDaily} avg / day</p>
                </TableCell>
                <TableCell className="text-right">
                  <p className="font-medium">{formatCurrency(dish.revenue)}</p>
                  <p className="text-xs text-text-secondary">{dish.revenueDaily} avg / day</p>
                </TableCell>
                <TableCell className="text-center">
                  {dish.movement !== 0 ? (
                    <span className={cn(
                      "inline-flex items-center justify-center px-3 py-1 rounded-lg text-sm font-medium",
                      dish.movement > 0 ? "bg-green/10 text-green" : "bg-red/10 text-red"
                    )}>
                      {dish.movement > 0 ? "+" : ""}{dish.movement}
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center w-10 h-8 rounded-lg bg-gray-100 text-text-secondary">
                      <Minus className="w-4 h-4" />
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </section>
  )
}
