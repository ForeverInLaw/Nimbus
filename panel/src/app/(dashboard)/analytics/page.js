"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Download, RefreshCw } from 'lucide-react';
import { StatsCard } from '@/shared/components/StatsCard';
import { LineChart, BarChart, PieChart, AreaChart } from '@/shared/components/charts';
import { formatNumber, formatBytes } from '@/shared/utils/format';
import { exportToCSV, exportToJSON } from '@/shared/utils/export';
import { 
  subDays, 
  startOfDay, 
  endOfDay, 
  format as formatDate 
} from 'date-fns';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState({
    from: startOfDay(subDays(new Date(), 7)),
    to: endOfDay(new Date()),
  });

  // Mock data - replace with real API calls
  const stats = {
    totalRequests: 1254789,
    totalBandwidth: 5368709120, // bytes
    avgResponseTime: 245, // ms
    errorRate: 2.3, // %
  };

  // Traffic over time (7 days)
  const trafficData = [
    { date: 'Mon', requests: 15234, bandwidth: 856234567 },
    { date: 'Tue', requests: 18456, bandwidth: 923456789 },
    { date: 'Wed', requests: 21567, bandwidth: 1034567890 },
    { date: 'Thu', requests: 19234, bandwidth: 945678901 },
    { date: 'Fri', requests: 22789, bandwidth: 1123456789 },
    { date: 'Sat', requests: 17234, bandwidth: 890123456 },
    { date: 'Sun', requests: 16123, bandwidth: 856789012 },
  ];

  // Protocol breakdown
  const protocolData = [
    { name: 'HTTP', value: 45, count: 564532 },
    { name: 'HTTPS', value: 40, count: 501916 },
    { name: 'TCP', value: 10, count: 125479 },
    { name: 'UDP', value: 3, count: 37644 },
    { name: 'DNS', value: 2, count: 25096 },
  ];

  // Top agents by traffic
  const topAgentsData = [
    { name: 'Web Server 1', requests: 234567, bandwidth: 1234567890 },
    { name: 'API Server', requests: 189234, bandwidth: 987654321 },
    { name: 'Database Proxy', requests: 145678, bandwidth: 765432109 },
    { name: 'CDN Edge', requests: 123456, bandwidth: 654321098 },
    { name: 'Load Balancer', requests: 98765, bandwidth: 543210987 },
  ];

  // Response time distribution
  const responseTimeData = [
    { range: '0-100ms', count: 450000 },
    { range: '100-200ms', count: 380000 },
    { range: '200-500ms', count: 280000 },
    { range: '500ms-1s', count: 95000 },
    { range: '>1s', count: 49789 },
  ];

  const handleExportCSV = () => {
    const data = trafficData.map(d => ({
      Date: d.date,
      Requests: d.requests,
      'Bandwidth (MB)': (d.bandwidth / 1024 / 1024).toFixed(2),
    }));
    exportToCSV(data, 'analytics-traffic');
  };

  const handleExportJSON = () => {
    const data = {
      dateRange,
      stats,
      trafficData,
      protocolData,
      topAgentsData,
      responseTimeData,
    };
    exportToJSON(data, 'analytics-full');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Detailed traffic analytics and system metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            {formatDate(dateRange.from, 'MMM dd')} - {formatDate(dateRange.to, 'MMM dd')}
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" />
            CSV
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportJSON}>
            <Download className="mr-2 h-4 w-4" />
            JSON
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Requests"
          value={formatNumber(stats.totalRequests)}
          description="Last 7 days"
          trend="up"
          trendValue="+12.5%"
        />
        <StatsCard
          title="Total Bandwidth"
          value={formatBytes(stats.totalBandwidth)}
          description="Data transferred"
          trend="up"
          trendValue="+8.2%"
        />
        <StatsCard
          title="Avg Response Time"
          value={`${stats.avgResponseTime}ms`}
          description="P95 latency"
          trend="down"
          trendValue="-5.3%"
        />
        <StatsCard
          title="Error Rate"
          value={`${stats.errorRate}%`}
          description="4xx + 5xx errors"
          trend="down"
          trendValue="-1.2%"
        />
      </div>

      {/* Traffic Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Over Time</CardTitle>
            <CardDescription>Requests per day (last 7 days)</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={trafficData}
              xAxisKey="date"
              lines={[
                { dataKey: 'requests', name: 'Requests', color: 'hsl(var(--primary))' }
              ]}
              height={300}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bandwidth Usage</CardTitle>
            <CardDescription>Data transferred per day</CardDescription>
          </CardHeader>
          <CardContent>
            <AreaChart
              data={trafficData.map(d => ({
                ...d,
                bandwidthMB: Math.round(d.bandwidth / 1024 / 1024)
              }))}
              xAxisKey="date"
              areas={[
                { dataKey: 'bandwidthMB', name: 'Bandwidth (MB)', color: 'hsl(var(--primary))' }
              ]}
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      {/* Protocol & Agents */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Protocol Distribution</CardTitle>
            <CardDescription>Requests by protocol type</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart
              data={protocolData}
              height={300}
              colors={[
                'hsl(var(--primary))',
                'hsl(var(--secondary))',
                'hsl(220, 70%, 50%)',
                'hsl(280, 70%, 50%)',
                'hsl(340, 70%, 50%)',
              ]}
            />
            <div className="mt-4 space-y-2">
              {protocolData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="h-3 w-3 rounded-sm" 
                      style={{ 
                        backgroundColor: ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(220, 70%, 50%)', 'hsl(280, 70%, 50%)', 'hsl(340, 70%, 50%)'][index]
                      }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{formatNumber(item.count)} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Agents by Traffic</CardTitle>
            <CardDescription>Most active agents</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={topAgentsData}
              xAxisKey="name"
              bars={[
                { dataKey: 'requests', name: 'Requests', color: 'hsl(var(--primary))' }
              ]}
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      {/* Response Time Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Response Time Distribution</CardTitle>
          <CardDescription>Request count by response time range</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart
            data={responseTimeData}
            xAxisKey="range"
            bars={[
              { dataKey: 'count', name: 'Requests', color: 'hsl(var(--primary))' }
            ]}
            height={300}
          />
        </CardContent>
      </Card>
    </div>
  );
}
