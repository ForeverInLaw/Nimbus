import { get, post, put, del } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/shared/constants';

export async function getRoutes() {
  const response = await get(API_ENDPOINTS.ROUTES.LIST);
  return response.data;
}

export async function getRoute(id) {
  const response = await get(API_ENDPOINTS.ROUTES.DETAIL(id));
  return response.data;
}

export async function createRoute(data) {
  const response = await post(API_ENDPOINTS.ROUTES.CREATE, data);
  return response.data;
}

export async function updateRoute(id, data) {
  const response = await put(API_ENDPOINTS.ROUTES.UPDATE(id), data);
  return response.data;
}

export async function deleteRoute(id) {
  await del(API_ENDPOINTS.ROUTES.DELETE(id));
}
