import { get, post, put, del } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/shared/constants';

export async function getGeoDNSRecords() {
  const response = await get(API_ENDPOINTS.GEODNS.LIST);
  return response.data;
}

export async function getGeoDNSRecord(id) {
  const response = await get(API_ENDPOINTS.GEODNS.DETAIL(id));
  return response.data;
}

export async function createGeoDNSRecord(data) {
  const response = await post(API_ENDPOINTS.GEODNS.CREATE, data);
  return response.data;
}

export async function updateGeoDNSRecord(id, data) {
  const response = await put(API_ENDPOINTS.GEODNS.UPDATE(id), data);
  return response.data;
}

export async function deleteGeoDNSRecord(id) {
  await del(API_ENDPOINTS.GEODNS.DELETE(id));
}
