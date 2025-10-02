import { get, post, put, del } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/shared/constants';

export async function getUsers() {
  const response = await get(API_ENDPOINTS.USERS.LIST);
  return response.data;
}

export async function getUser(id) {
  const response = await get(API_ENDPOINTS.USERS.DETAIL(id));
  return response.data;
}

export async function createUser(data) {
  const response = await post(API_ENDPOINTS.USERS.CREATE, data);
  return response.data;
}

export async function updateUser(id, data) {
  const response = await put(API_ENDPOINTS.USERS.UPDATE(id), data);
  return response.data;
}

export async function deleteUser(id) {
  await del(API_ENDPOINTS.USERS.DELETE(id));
}
