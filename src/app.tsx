// 运行时配置
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { history } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Space } from 'antd';

export async function getInitialState(): Promise<{
  name: string;
  avatar: string;
}> {
  return { name: '管理员', avatar: '' };
}

export const layout = () => {
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      danger: true,
    },
  ];

  const handleUserMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      history.push('/login');
    } else if (key === 'profile') {
      history.push('/profile');
    } else if (key === 'settings') {
      history.push('/settings');
    }
  };

  return {
    avatar: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    name: '管理员',
    rightContentRender: () => (
      <Dropdown
        menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
        placement="bottomRight"
        trigger={['click']}
      >
        <Space
          style={{ cursor: 'pointer', padding: '4px 8px', borderRadius: 8 }}
        >
          <Avatar
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
            icon={<UserOutlined />}
          />
          <span style={{ color: 'rgba(255, 255, 255, 0.85)' }}>管理员</span>
        </Space>
      </Dropdown>
    ),
  };
};
