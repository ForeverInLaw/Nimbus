"use client"

import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { CHART_COLORS } from "@/shared/constants"

/**
 * PieChart - Reusable pie chart component
 * 
 * @param {Object} props
 * @param {Array<{name: string, value: number}>} props.data - Chart data
 * @param {string} props.dataKey - Key for values (default: 'value')
 * @param {string} props.nameKey - Key for names (default: 'name')
 * @param {Array<string>} [props.colors] - Custom colors array
 * @param {boolean} [props.showLegend] - Show legend (default: true)
 * @param {number} [props.height] - Chart height in pixels (default: 300)
 * @param {string} [props.className] - Additional CSS classes
 */
export function PieChart({
  data,
  dataKey = "value",
  nameKey = "name",
  colors = CHART_COLORS,
  showLegend = true,
  height = 300,
  className,
}) {
  if (!data || data.length === 0) {
    return (
      <div className={className} style={{ height }}>
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          No data available
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          {showLegend && <Legend />}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}
