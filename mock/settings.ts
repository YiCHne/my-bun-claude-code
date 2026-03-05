// 模拟系统设置数据
let systemSettings = {
  siteName: '管理系统',
  siteDescription: '基于 UmiJS + Ant Design 的现代化管理后台',
  email: 'admin@example.com',
  language: 'zh-CN',
  theme: 'dark',
  notifications: {
    email: true,
    system: true,
    security: true,
  },
};

export default {
  // 获取系统设置
  'GET /api/v1/system/settings': (req: any, res: any) => {
    res.json({
      success: true,
      data: systemSettings,
      errorMessage: '',
    });
  },

  // 更新系统设置
  'PUT /api/v1/system/settings': (req: any, res: any) => {
    const { siteName, siteDescription, email, language, theme, notifications } =
      req.body || {};

    systemSettings = {
      ...systemSettings,
      siteName: siteName || systemSettings.siteName,
      siteDescription: siteDescription || systemSettings.siteDescription,
      email: email || systemSettings.email,
      language: language || systemSettings.language,
      theme: theme || systemSettings.theme,
      notifications: notifications || systemSettings.notifications,
    };

    res.json({
      success: true,
      data: systemSettings,
      errorMessage: '',
    });
  },

  // 更新通知设置
  'PUT /api/v1/system/notifications': (req: any, res: any) => {
    const { notifications } = req.body || {};

    if (notifications) {
      systemSettings.notifications = {
        ...systemSettings.notifications,
        ...notifications,
      };
    }

    res.json({
      success: true,
      data: systemSettings.notifications,
      errorMessage: '',
    });
  },
};
