import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {
    configProvider: {
      theme: {
        token: {
          colorPrimary: '#667eea',
          colorSuccess: '#52c41a',
          colorWarning: '#faad14',
          colorError: '#ff4d4f',
          colorInfo: '#667eea',
          borderRadius: 10,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
        components: {
          Button: {
            primaryShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
            controlHeight: 40,
          },
          Input: {
            controlHeight: 40,
          },
          Select: {
            controlHeight: 40,
          },
          Card: {
            borderRadiusLG: 12,
          },
          Table: {
            borderRadius: 10,
          },
        },
      },
    },
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    title: '管理系统',
    theme: 'dark',
    colorPrimary: '#667eea',
    menu: {
      locale: false,
    },
    headerTheme: 'dark',
  },
  routes: [
    {
      path: '/login',
      component: './Login',
      layout: false,
    },
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: 'CRUD 示例',
      path: '/table',
      component: './Table',
    },
    {
      name: '用户管理',
      path: '/user-management',
      component: './UserManagement',
    },
    {
      name: '个人中心',
      path: '/profile',
      component: './Profile',
    },
    {
      name: '系统设置',
      path: '/settings',
      component: './Settings',
    },
  ],
  npmClient: 'npm',
  access: {
    initialPermission: {
      admin: ['*'],
      user: ['user:view', 'user:edit'],
    },
  },
});
