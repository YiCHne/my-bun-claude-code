// 模拟用户数据
const mockUsers = [
  {
    id: '1',
    username: 'admin',
    password: '123456',
    nickname: '管理员',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    email: 'admin@example.com',
    phone: '138****8888',
    roles: ['admin'],
    permissions: ['*'],
    createdAt: '2024-01-01 10:00:00',
  },
  {
    id: '2',
    username: 'user',
    password: '123456',
    nickname: '普通用户',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
    email: 'user@example.com',
    phone: '139****9999',
    roles: ['user'],
    permissions: ['user:view', 'user:edit'],
    createdAt: '2024-01-15 10:00:00',
  },
];

// 模拟当前登录用户（实际应该从 token 解析）
let currentUserId = '1';

export default {
  // 获取当前用户信息
  'GET /api/v1/user/profile': (req: any, res: any) => {
    const user = mockUsers.find((u) => u.id === currentUserId);
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userInfo } = user;
      res.json({
        success: true,
        data: userInfo,
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

  // 更新当前用户信息
  'PUT /api/v1/user/profile': (req: any, res: any) => {
    const { nickname, email, phone } = req.body || {};
    const userIndex = mockUsers.findIndex((u) => u.id === currentUserId);

    if (userIndex !== -1) {
      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        nickname: nickname || mockUsers[userIndex].nickname,
        email: email || mockUsers[userIndex].email,
        phone: phone || mockUsers[userIndex].phone,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userInfo } = mockUsers[userIndex];
      res.json({
        success: true,
        data: userInfo,
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

  // 修改密码
  'POST /api/v1/user/password': (req: any, res: any) => {
    const { currentPassword, newPassword } = req.body || {};
    const user = mockUsers.find((u) => u.id === currentUserId);

    if (!user) {
      res.json({
        success: false,
        data: null,
        errorMessage: '用户不存在',
      });
      return;
    }

    if (user.password !== currentPassword) {
      res.json({
        success: false,
        data: null,
        errorMessage: '当前密码错误',
      });
      return;
    }

    if (newPassword && newPassword.length < 6) {
      res.json({
        success: false,
        data: null,
        errorMessage: '新密码长度不能少于6位',
      });
      return;
    }

    // 更新密码
    user.password = newPassword;
    res.json({
      success: true,
      data: null,
      errorMessage: '',
    });
  },

  // 上传头像（模拟）
  'POST /api/v1/user/avatar': (req: any, res: any) => {
    const { avatar } = req.body || {};
    const userIndex = mockUsers.findIndex((u) => u.id === currentUserId);

    if (userIndex !== -1 && avatar) {
      mockUsers[userIndex].avatar = avatar;
      res.json({
        success: true,
        data: { avatar },
        errorMessage: '',
      });
    } else {
      res.json({
        success: false,
        data: null,
        errorMessage: '上传头像失败',
      });
    }
  },
};
