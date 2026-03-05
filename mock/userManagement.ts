// 模拟用户数据
const mockUsers = [
  {
    id: '1',
    username: 'admin',
    nickname: '管理员',
    email: 'admin@example.com',
    phone: '13800138000',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    roles: ['admin'],
    status: 'active',
    createdAt: '2024-01-01 10:00:00',
    password: '123456',
  },
  {
    id: '2',
    username: 'user',
    nickname: '普通用户',
    email: 'user@example.com',
    phone: '13900139000',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
    roles: ['user'],
    status: 'active',
    createdAt: '2024-01-15 14:30:00',
    password: '123456',
  },
  {
    id: '3',
    username: 'test',
    nickname: '测试用户',
    email: 'test@example.com',
    phone: '13700137000',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test',
    roles: ['user'],
    status: 'disabled',
    createdAt: '2024-02-01 09:15:00',
    password: '123456',
  },
];

let nextId = 4;

// 分页辅助函数
const paginate = (
  list: typeof mockUsers,
  current: number = 1,
  pageSize: number = 10,
) => {
  const start = (current - 1) * pageSize;
  const end = start + pageSize;
  return {
    list: list.slice(start, end),
    total: list.length,
    current,
    pageSize,
  };
};

export default {
  // 获取用户列表
  'GET /api/v1/admin/users': (req: any, res: any) => {
    const { current = 1, pageSize = 10, keyword } = req.query || {};

    let filteredUsers = [...mockUsers];

    // 关键词搜索
    if (keyword) {
      const kw = keyword.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (u) =>
          u.username.toLowerCase().includes(kw) ||
          u.nickname.toLowerCase().includes(kw) ||
          u.email.toLowerCase().includes(kw),
      );
    }

    res.json({
      success: true,
      data: paginate(filteredUsers, Number(current), Number(pageSize)),
      errorMessage: '',
    });
  },

  // 获取用户详情
  'GET /api/v1/admin/users/:id': (req: any, res: any) => {
    const user = mockUsers.find((u) => u.id === req.params.id);
    if (user) {
      res.json({
        success: true,
        data: user,
        errorMessage: '',
      });
    } else {
      res.json({
        success: false,
        data: null,
        errorMessage: '用户不存在',
      });
    }
  },

  // 新增用户
  'POST /api/v1/admin/users': (req: any, res: any) => {
    const { username, nickname, email, phone, roles, status, password } =
      req.body || {};

    // 检查用户名是否存在
    if (mockUsers.some((u) => u.username === username)) {
      res.json({
        success: false,
        data: null,
        errorMessage: '用户名已存在',
      });
      return;
    }

    // 检查邮箱是否存在
    if (mockUsers.some((u) => u.email === email)) {
      res.json({
        success: false,
        data: null,
        errorMessage: '邮箱已被使用',
      });
      return;
    }

    const newUser = {
      id: String(nextId++),
      username,
      nickname,
      email,
      phone,
      roles: roles || ['user'],
      status: status || 'active',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      createdAt: new Date().toLocaleString('zh-CN'),
      password: password || '123456',
    };

    mockUsers.push(newUser);
    res.json({
      success: true,
      data: newUser,
      errorMessage: '',
    });
  },

  // 更新用户
  'PUT /api/v1/admin/users/:id': (req: any, res: any) => {
    const index = mockUsers.findIndex((u) => u.id === req.params.id);
    if (index === -1) {
      res.json({
        success: false,
        errorMessage: '用户不存在',
      });
      return;
    }

    // 检查邮箱是否被其他用户使用
    if (req.body.email) {
      const emailExists = mockUsers.some(
        (u) => u.email === req.body.email && u.id !== req.params.id,
      );
      if (emailExists) {
        res.json({
          success: false,
          errorMessage: '邮箱已被其他用户使用',
        });
        return;
      }
    }

    // 如果要修改密码
    if (req.body.password) {
      mockUsers[index].password = req.body.password;
    }

    // 更新其他字段（不包含password）
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pwd, ...updateData } = req.body;
    mockUsers[index] = { ...mockUsers[index], ...updateData };

    res.json({
      success: true,
      errorMessage: '',
    });
  },

  // 删除用户
  'DELETE /api/v1/admin/users/:id': (req: any, res: any) => {
    const index = mockUsers.findIndex((u) => u.id === req.params.id);
    if (index === -1) {
      res.json({
        success: false,
        errorMessage: '用户不存在',
      });
      return;
    }

    // 不允许删除admin
    if (mockUsers[index].username === 'admin') {
      res.json({
        success: false,
        errorMessage: '不能删除管理员账号',
      });
      return;
    }

    mockUsers.splice(index, 1);
    res.json({
      success: true,
      errorMessage: '',
    });
  },

  // 批量删除
  'DELETE /api/v1/admin/users/batch': (req: any, res: any) => {
    const { ids } = req.body || [];
    const adminIds = mockUsers
      .filter((u) => u.username === 'admin' && ids.includes(u.id))
      .map((u) => u.id);

    if (adminIds.length > 0) {
      res.json({
        success: false,
        errorMessage: '不能删除管理员账号',
      });
      return;
    }

    const remainingUsers = mockUsers.filter((u) => !ids.includes(u.id));
    mockUsers.length = 0;
    mockUsers.push(...remainingUsers);

    res.json({
      success: true,
      errorMessage: '',
    });
  },
};
