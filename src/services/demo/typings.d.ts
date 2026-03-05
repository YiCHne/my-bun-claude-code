/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace API {
  interface PageInfo<T = Record<string, unknown>> {
    /** current page number */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<T>;
  }

  interface Result<T = Record<string, unknown>> {
    success?: boolean;
    errorMessage?: string;
    data?: T;
  }

  type UserGenderEnum = 'MALE' | 'FEMALE';

  interface UserInfo {
    id?: string;
    name?: string;
    /** nick */
    nickName?: string;
    /** email */
    email?: string;
    gender?: UserGenderEnum;
  }

  interface UserInfoVO {
    name?: string;
    /** nick */
    nickName?: string;
    /** email */
    email?: string;
  }
}
