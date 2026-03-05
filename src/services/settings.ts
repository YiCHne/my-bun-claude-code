import { request } from '@umijs/max';

export interface SystemSettings {
  siteName: string;
  siteDescription: string;
  email: string;
  language: string;
  theme: string;
  notifications: {
    email: boolean;
    system: boolean;
    security: boolean;
  };
}

/** 获取系统设置 GET /api/v1/system/settings */
export async function getSystemSettings(options?: Record<string, unknown>) {
  return request<{ success: boolean; data: SystemSettings }>(
    '/api/v1/system/settings',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 更新系统设置 PUT /api/v1/system/settings */
export async function updateSystemSettings(
  body: Partial<SystemSettings>,
  options?: Record<string, unknown>,
) {
  return request<{ success: boolean; data: SystemSettings }>(
    '/api/v1/system/settings',
    {
      method: 'PUT',
      data: body,
      ...(options || {}),
    },
  );
}

/** 更新通知设置 PUT /api/v1/system/notifications */
export async function updateNotifications(
  body: { notifications: SystemSettings['notifications'] },
  options?: Record<string, unknown>,
) {
  return request<{ success: boolean; data: SystemSettings['notifications'] }>(
    '/api/v1/system/notifications',
    {
      method: 'PUT',
      data: body,
      ...(options || {}),
    },
  );
}
