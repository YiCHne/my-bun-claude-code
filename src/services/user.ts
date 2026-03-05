import { request } from '@umijs/max';

export interface UserProfile {
  id: string;
  username: string;
  nickname: string;
  avatar: string;
  email: string;
  phone: string;
  roles: string[];
  createdAt: string;
}

export interface UpdateProfileParams {
  nickname?: string;
  email?: string;
  phone?: string;
}

export interface ChangePasswordParams {
  currentPassword: string;
  newPassword: string;
}

/** 获取用户信息 GET /api/v1/user/profile */
export async function getUserProfile(options?: Record<string, unknown>) {
  return request<{ success: boolean; data: UserProfile }>(
    '/api/v1/user/profile',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 更新用户信息 PUT /api/v1/user/profile */
export async function updateUserProfile(
  body: UpdateProfileParams,
  options?: Record<string, unknown>,
) {
  return request<{ success: boolean; data: UserProfile }>(
    '/api/v1/user/profile',
    {
      method: 'PUT',
      data: body,
      ...(options || {}),
    },
  );
}

/** 修改密码 POST /api/v1/user/password */
export async function changePassword(
  body: ChangePasswordParams,
  options?: Record<string, unknown>,
) {
  return request<{ success: boolean; errorMessage?: string }>(
    '/api/v1/user/password',
    {
      method: 'POST',
      data: body,
      ...(options || {}),
    },
  );
}

/** 上传头像 POST /api/v1/user/avatar */
export async function uploadAvatar(
  body: { avatar: string },
  options?: Record<string, unknown>,
) {
  return request<{ success: boolean; data: { avatar: string } }>(
    '/api/v1/user/avatar',
    {
      method: 'POST',
      data: body,
      ...(options || {}),
    },
  );
}
