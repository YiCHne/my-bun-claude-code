import { request } from '@umijs/max';

export interface UserItem {
  id?: string;
  username: string;
  nickname: string;
  password?: string;
  email: string;
  phone?: string;
  avatar?: string;
  roles?: string[];
  status?: 'active' | 'disabled';
  createdAt?: string;
  updatedAt?: string;
}

export interface PageInfo {
  list: UserItem[];
  total: number;
  current: number;
  pageSize: number;
}

export interface FormValues {
  username: string;
  nickname: string;
  password?: string;
  email: string;
  phone?: string;
  roles?: string[];
  status?: 'active' | 'disabled';
}

// 用户列表
export async function getUserList(params?: {
  current?: number;
  pageSize?: number;
  keyword?: string;
}): Promise<{
  success: boolean;
  data?: PageInfo;
  errorMessage?: string;
}> {
  return request('/api/v1/admin/users', {
    method: 'GET',
    params,
  });
}

// 获取用户详情
export async function getUserDetail(userId: string): Promise<{
  success: boolean;
  data?: UserItem;
  errorMessage?: string;
}> {
  return request(`/api/v1/admin/users/${userId}`, {
    method: 'GET',
  });
}

// 新增用户
export async function addUser(body: FormValues): Promise<{
  success: boolean;
  data?: UserItem;
  errorMessage?: string;
}> {
  return request('/api/v1/admin/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: body,
  });
}

// 更新用户
export async function updateUser(
  userId: string,
  body: Partial<FormValues>,
): Promise<{
  success: boolean;
  errorMessage?: string;
}> {
  return request(`/api/v1/admin/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data: body,
  });
}

// 删除用户
export async function deleteUser(userId: string): Promise<{
  success: boolean;
  errorMessage?: string;
}> {
  return request(`/api/v1/admin/users/${userId}`, {
    method: 'DELETE',
  });
}

// 批量删除用户
export async function batchDeleteUsers(userIds: string[]): Promise<{
  success: boolean;
  errorMessage?: string;
}> {
  return request('/api/v1/admin/users/batch', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    data: { ids: userIds },
  });
}

// 用户API对象
export const userAPI = {
  getUserList,
  getUserDetail,
  addUser,
  updateUser,
  deleteUser,
  batchDeleteUsers,
};

export default userAPI;
