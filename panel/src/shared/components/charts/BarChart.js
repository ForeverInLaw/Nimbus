"use client"

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { CHART_COLORS } from "@/shared/constants"

/**
 * BarChart - Reusable bar chart component
 * 
 * @param {Object} props
 * @param {Array} props.data - Chart data
 * @param {Array<{dataKey: string, name: string, color?: string}>} props.bars - Bars configuration
 * @param {string} props.xAxisKey - Key for X axis
 * @param {boolean} [props.showGrid] - Show grid (default: true)
 * @param {boolean} [props.showLegend] - Show legend (default: true)
 * @param {number} [props.height] - Chart height in pixels (default: 300)
 * @param {string} [props.className] - Additional CSS classes
 */
export function BarChart({
  data,
  bars,
  xAxisKey,
  showGrid = true,
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
        <RechartsBarChart data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />}
          <XAxis
            dataKey={xAxisKey}
            className="text-xs"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <YAxis
            className="text-xs"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            labelStyle={{ color: "hsl(var(--popover-foreground))" }}
          />
          {showLegend && <Legend />}
          {bars.map((bar, index) => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              name={bar.name}
              fill={bar.color || CHART_COLORS[index % CHART_COLORS.length]}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}
