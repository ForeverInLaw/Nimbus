import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/constants';
import * as analyticsApi from '../api/analytics.api';
import { useAgents } from '@/features/agents/hooks';
import { useRules } from '@/features/rules/hooks';
import { useRoutes } from '@/features/routes/hooks';
import { useGeoDNSRecords } from '@/features/geodns/hooks';
import { useUsers } from '@/features/users/hooks';

/**
 * Get dashboard statistics
 * Calculates stats from existing data
 */
export function useDashboardStats() {
  const { data: agents = [] } = useAgents();
  const { data: rules = [] } = useRules();
  const { data: routes = [] } = useRoutes();
  const { data: dnsRecords = [] } = useGeoDNSRecords();
  const { data: users = [] } = useUsers();

  return {
    data: {
      totalAgents: agents.length,
      connectedAgents: agents.filter(a => a.status === 'connected').length,
      disconnectedAgents: agents.filter(a => a.status === 'disconnected').length,
      totalRules: rules.length,
      totalRoutes: routes.length,
      totalDNSRecords: dnsRecords.length,
      totalUsers: users.length,
      adminUsers: users.filter(u => u.role === 'admin').length,
    },
    isLoading: false,
  };
}

/**
 * Get recent activity
 */
export function useRecentActivity() {
  return useQuery({
    queryKey: [QUERY_KEYS.RECENT_ACTIVITY],
    queryFn: analyticsApi.getRecentActivity,
    staleTime: 10000, // 10 seconds
  });
}

/**
 * Get traffic analytics
 */
export function useTrafficAnalytics(params) {
  return useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD_STATS, 'traffic', params],
    queryFn: () => analyticsApi.getTrafficAnalytics(params),
    staleTime: 30000,
  });
}
