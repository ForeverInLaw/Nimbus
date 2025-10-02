import { get, post, put, del } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/shared/constants';

/**
 * Agent API functions
 * Uses the enhanced api-client with automatic error handling and toast notifications
 */

/**
 * Get all agents
 * @returns {Promise<Array>} List of agents
 */
export async function getAgents() {
  const response = await get(API_ENDPOINTS.AGENTS.LIST);
  return response.data;
}

/**
 * Get single agent by ID
 * @param {string} id - Agent ID
 * @returns {Promise<Object>} Agent details
 */
export async function getAgent(id) {
  const response = await get(API_ENDPOINTS.AGENTS.DETAIL(id));
  return response.data;
}

/**
 * Create new agent
 * @param {Object} data - Agent data
 * @param {string} data.name - Agent name
 * @param {string} data.ip - Agent IP address
 * @param {number} data.port - Agent port
 * @param {Object} data.capabilities - Agent capabilities
 * @returns {Promise<Object>} Created agent
 */
export async function createAgent(data) {
  const response = await post(API_ENDPOINTS.AGENTS.CREATE, data);
  return response.data;
}

/**
 * Update existing agent
 * @param {string} id - Agent ID
 * @param {Object} data - Updated agent data
 * @returns {Promise<Object>} Updated agent
 */
export async function updateAgent(id, data) {
  const response = await put(API_ENDPOINTS.AGENTS.UPDATE(id), data);
  return response.data;
}

/**
 * Delete agent
 * @param {string} id - Agent ID
 * @returns {Promise<void>}
 */
export async function deleteAgent(id) {
  await del(API_ENDPOINTS.AGENTS.DELETE(id));
}

/**
 * Bulk delete agents
 * @param {Array<string>} ids - Array of agent IDs
 * @returns {Promise<void>}
 */
export async function bulkDeleteAgents(ids) {
  await post(API_ENDPOINTS.AGENTS.BULK_DELETE, { ids });
}

/**
 * Enable/disable agent
 * @param {string} id - Agent ID
 * @param {boolean} enabled - Enable or disable
 * @returns {Promise<Object>} Updated agent
 */
export async function toggleAgentStatus(id, enabled) {
  const response = await put(API_ENDPOINTS.AGENTS.UPDATE(id), { enabled });
  return response.data;
}
