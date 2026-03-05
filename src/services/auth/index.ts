import { history, request } from '@umijs/max';
import { message } from 'antd';

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResult {
  success: boolean;
  data?: {
    token: string;
    userId: string;
    username: string;
    nickname: string;
    avatar?: string;
    roles: string[];
    permissions: string[];
  };
  errorMessage?: string;
}

/** 登录接口 POST /api/v1/login */
export async function login(
  body: LoginParams,
  options?: Record<string, unknown>,
): Promise<LoginResult> {
  return request<LoginResult>('/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 登出接口 POST /api/v1/logout */
export async function logout(options?: Record<string, unknown>) {
  return request<{ success: boolean }>('/api/v1/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 获取当前用户信息 GET /api/v1/currentUser */
export async function getCurrentUser(options?: Record<string, unknown>) {
  return request<LoginResult>('/api/v1/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

// 登录成功后的处理
export const handleLoginSuccess = (
  result: LoginResult,
  callback?: () => void,
) => {
  if (result.success && result.data) {
    // 保存token到localStorage
    localStorage.setItem('token', result.data.token);
    localStorage.setItem('userInfo', JSON.stringify(result.data));
    message.success('登录成功');
    if (callback) {
      callback();
    } else {
      history.push('/home');
    }
    return true;
  }
  message.error(result.errorMessage || '登录失败，请检查用户名和密码');
  return false;
};

// 获取保存的用户信息
export const getSavedUserInfo = () => {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? JSON.parse(userInfo) : null;
};

// 登出
export const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userInfo');
  message.success('已退出登录');
  history.push('/login');
};

// 检查是否已登录
export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};
