"use client"

import {
  Box,
  Users,
  ShieldCheck,
  Map,
  Globe,
  Activity,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/shared/components/StatsCard';
import { ActivityFeed } from '@/shared/components/ActivityFeed';
import { LineChart, PieChart } from '@/shared/components/charts';
import { useDashboardStats, useRecentActivity } from '@/features/analytics/hooks';

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: activities = [], isLoading: activityLoading } = useRecentActivity();

  // Real agent status data
  const agentStatusData = [
    { name: 'Connected', value: stats?.connectedAgents || 0 },
    { name: 'Disconnected', value: stats?.disconnectedAgents || 0 },
  ];

  const trafficData = [
    { time: '00:00', requests: 120 },
    { time: '04:00', requests: 80 },
    { time: '08:00', requests: 250 },
    { time: '12:00', requests: 400 },
    { time: '16:00', requests: 350 },
    { time: '20:00', requests: 200 },
  ];

  if (statsLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          System overview and real-time metrics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Agents"
          value={stats?.totalAgents || 0}
          description={`${stats?.connectedAgents || 0} connected`}
          icon={Box}
        />
        <StatsCard
          title="Rules"
          value={stats?.totalRules || 0}
          description="Active routing rules"
          icon={ShieldCheck}
        />
        <StatsCard
          title="Routes"
          value={stats?.totalRoutes || 0}
          description="Network routes"
          icon={Map}
        />
        <StatsCard
          title="DNS Records"
          value={stats?.totalDNSRecords || 0}
          description="GeoDNS entries"
          icon={Globe}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Agent Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Agent Status</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart
              data={agentStatusData}
              height={250}
              colors={['hsl(var(--primary))', 'hsl(var(--destructive))']}
            />
          </CardContent>
        </Card>

        {/* Traffic Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic (Last 24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              data={trafficData}
              xAxisKey="time"
              lines={[{ dataKey: 'requests', name: 'Requests', color: 'hsl(var(--primary))' }]}
              height={250}
            />
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed & System Info */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <ActivityFeed activities={activities} />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>System Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Users</span>
                <span className="font-medium">{stats?.totalUsers || 0}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Admin Users</span>
                <span className="font-medium">{stats?.adminUsers || 0}</span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">System Status</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  Operational
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
