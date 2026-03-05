/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/v1/queryUserList */
export async function queryUserList(
  params: {
    // query
    /** keyword */
    keyword?: string;
    /** current */
    current?: number;
    /** pageSize */
    pageSize?: number;
    /** sorter */
    sorter?: Record<string, string>;
    /** filter */
    filter?: Record<string, string[]>;
  },
  options?: Record<string, unknown>,
) {
  return request<API.Result<API.PageInfo<API.UserInfo>>>(
    '/api/v1/queryUserList',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/v1/user */
export async function addUser(
  body?: API.UserInfoVO,
  options?: Record<string, unknown>,
) {
  return request<API.Result<API.UserInfo>>('/api/v1/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/user/${param0} */
export async function getUserDetail(
  params: {
    // path
    /** userId */
    userId: string;
  },
  options?: Record<string, unknown>,
) {
  const { userId: param0 } = params;
  return request<API.Result<API.UserInfo>>(`/api/v1/user/${param0}`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/v1/user/${param0} */
export async function modifyUser(
  params: {
    // path
    /** userId */
    userId: string;
  },
  body?: API.UserInfoVO,
  options?: Record<string, unknown>,
) {
  const { userId: param0 } = params;
  return request<API.Result<API.UserInfo>>(`/api/v1/user/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/v1/user/${param0} */
export async function deleteUser(
  params: {
    // path
    /** userId */
    userId: string;
  },
  options?: Record<string, unknown>,
) {
  const { userId: param0 } = params;
  return request<API.Result<string>>(`/api/v1/user/${param0}`, {
    method: 'DELETE',
    params: { ...params },
    ...(options || {}),
  });
}
