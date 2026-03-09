import { PieChart, Pie, Cell } from "recharts"

interface DonutChartProps {
  value: number
  total: number
  size?: number
  colors?: [string, string]
}

export function DonutChart({ value, total, size = 64, colors = ["#f8d54b", "#f9f7c7"] }: DonutChartProps) {
  const data = [
    { value },
    { value: total - value },
  ]
  return (
    <PieChart width={size} height={size}>
      <Pie
        data={data}
        innerRadius={size * 0.32}
        outerRadius={size * 0.46}
        dataKey="value"
        startAngle={90}
        endAngle={-270}
        stroke="none"
      >
        <Cell fill={colors[0]} />
        <Cell fill={colors[1]} />
      </Pie>
    </PieChart>
  )
}
