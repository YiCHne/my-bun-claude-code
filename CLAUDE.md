# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

这是一个基于 UmiJS Max + Ant Design 5 的管理后台项目，采用紫色渐变主题 (#667eea -> #764ba2)。

## Common Commands

```bash
# 使用 npm
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm run format   # 代码格式化 (prettier)
npm run setup    # UmiJS 初始化

# 使用 bun (更快)
bun install      # 安装依赖
bun run dev      # 启动开发服务器
bun run build    # 构建生产版本
```

## Architecture

### 技术栈

- **框架**: UmiJS Max 4.x + React 18
- **UI**: Ant Design 5.x + Pro Components
- **主题**: 紫色渐变 (#667eea)

### 目录结构

- `src/pages/` - 页面组件
- `src/services/` - API 服务层
- `src/models/` - 全局状态
- `src/components/` - 公共组件
- `mock/` - Mock 接口

### 路由配置

路由在 `.umirc.ts` 的 `routes` 字段中定义，主要页面：

- `/login` - 登录页 (layout: false)
- `/home` - 首页
- `/access` - 权限演示
- `/table` - CRUD 示例
- `/user-management` - 用户管理
- `/profile` - 个人中心
- `/settings` - 系统设置

### Mock 接口

Mock 文件位于 `mock/` 目录：

- `auth.ts` - 登录/登出
- `userAPI.ts` - 用户 CRUD
- `userManagement.ts` - 用户管理
- `profile.ts` - 个人中心
- `settings.ts` - 系统设置

### API 服务

服务层在 `src/services/`：

- `auth/` - 认证相关
- `user.ts` - 用户接口
- `settings.ts` - 设置接口
- `demo/` - 示例接口
