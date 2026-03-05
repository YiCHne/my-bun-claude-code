// 模拟用户数据
const mockUsers = [
  {
    id: '1',
    username: 'admin',
    password: '123456', // 实际项目中应该是加密存储
    nickname: '管理员',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    roles: ['admin'],
    permissions: ['*'],
  },
  {
    id: '2',
    username: 'user',
    password: '123456',
    nickname: '普通用户',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
    roles: ['user'],
    permissions: ['user:view', 'user:edit'],
  },
];

// 生成模拟token
const generateToken = (userId: string) => {
  return `mock-token-${userId}-${Date.now()}`;
};

export default {
  // 登录接口
  'POST /api/v1/login': (req: any, res: any) => {
    const { username, password } = req.body || {};

    // 查找用户
    const user = mockUsers.find(
      (u) => u.username === username && u.password === password,
    );

    if (user) {
      const token = generateToken(user.id);
      res.json({
        success: true,
        data: {
          token,
          userId: user.id,
          username: user.username,
          nickname: user.nickname,
          avatar: user.avatar,
          roles: user.roles,
          permissions: user.permissions,
        },
        errorMessage: '',
      });
    } else {
      res.json({
        success: false,
        data: null,
        errorMessage: '用户名或密码错误',
      });
    }
  },

  // 登出接口
  'POST /api/v1/logout': (req: any, res: any) => {
    res.json({
      success: true,
      errorMessage: '',
    });
  },

  // 获取当前用户信息
  'GET /api/v1/currentUser': (req: any, res: any) => {
    // 从请求头获取token
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token || !token.startsWith('mock-token-')) {
      res.json({
        success: false,
        data: null,
        errorMessage: '未登录或登录已过期',
      });
      return;
    }

    // 从token解析用户id
    const userId = token.replace('mock-token-', '').split('-')[0];
    const user = mockUsers.find((u) => u.id === userId);

    if (user) {
      res.json({
        success: true,
        data: {
          token,
          userId: user.id,
          username: user.username,
          nickname: user.nickname,
          avatar: user.avatar,
          roles: user.roles,
          permissions: user.permissions,
        },
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
};
