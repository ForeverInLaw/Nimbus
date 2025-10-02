"use client"

import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { CHART_COLORS } from "@/shared/constants"

/**
 * AreaChart - Reusable area chart component
 * 
 * @param {Object} props
 * @param {Array} props.data - Chart data
 * @param {Array<{dataKey: string, name: string, color?: string}>} props.areas - Areas configuration
 * @param {string} props.xAxisKey - Key for X axis
 * @param {boolean} [props.showGrid] - Show grid (default: true)
 * @param {boolean} [props.showLegend] - Show legend (default: true)
 * @param {number} [props.height] - Chart height in pixels (default: 300)
 * @param {string} [props.className] - Additional CSS classes
 */
export function AreaChart({
  data,
  areas,
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
        <RechartsAreaChart data={data}>
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
          {areas.map((area, index) => (
            <Area
              key={area.dataKey}
              type="monotone"
              dataKey={area.dataKey}
              name={area.name}
              stroke={area.color || CHART_COLORS[index % CHART_COLORS.length]}
              fill={area.color || CHART_COLORS[index % CHART_COLORS.length]}
              fillOpacity={0.6}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  )
}
