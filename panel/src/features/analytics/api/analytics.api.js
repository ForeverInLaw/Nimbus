import { get } from '@/lib/api-client';

/**
 * Analytics API functions
 */

/**
 * Get dashboard statistics
 * @returns {Promise<Object>} Dashboard stats
 */
export async function getDashboardStats() {
  const response = await get('/admin/stats');
  return response.data;
}

/**
 * Get recent activity
 * @returns {Promise<Array>} Recent activity items
 */
export async function getRecentActivity() {
  const response = await get('/admin/activity');
  return response.data;
}

/**
 * Get traffic analytics
 * @param {Object} params - Query parameters
 * @param {string} params.startDate - Start date
 * @param {string} params.endDate - End date
 * @returns {Promise<Object>} Traffic analytics data
 */
export async function getTrafficAnalytics(params) {
  const response = await get('/admin/analytics/traffic', { params });
  return response.data;
}
