import { get, post, put, del } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/shared/constants';

/**
 * Rule API functions
 */

export async function getRules() {
  const response = await get(API_ENDPOINTS.RULES.LIST);
  return response.data;
}

export async function getRule(id) {
  const response = await get(API_ENDPOINTS.RULES.DETAIL(id));
  return response.data;
}

export async function createRule(data) {
  const response = await post(API_ENDPOINTS.RULES.CREATE, data);
  return response.data;
}

export async function updateRule(id, data) {
  const response = await put(API_ENDPOINTS.RULES.UPDATE(id), data);
  return response.data;
}

export async function deleteRule(id) {
  await del(API_ENDPOINTS.RULES.DELETE(id));
}
