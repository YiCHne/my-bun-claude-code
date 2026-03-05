import {
  getSystemSettings,
  updateNotifications,
  updateSystemSettings,
} from '@/services/settings';
import { BellOutlined, GlobalOutlined, LockOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  message,
  Select,
  Switch,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';

const { Title, Text } = Typography;

interface SettingsFormValues {
  siteName: string;
  siteDescription: string;
  email: string;
  language: string;
  theme: string;
}

interface NotificationSettings {
  email: boolean;
  system: boolean;
  security: boolean;
}

const SettingsPage: React.FC = () => {
  const [form] = Form.useForm<SettingsFormValues>();
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    system: true,
    security: true,
  });

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await getSystemSettings();
      if (res.success) {
        form.setFieldsValue({
          siteName: res.data.siteName,
          siteDescription: res.data.siteDescription,
          email: res.data.email,
          language: res.data.language,
          theme: res.data.theme,
        });
        setNotifications(res.data.notifications);
      }
    } catch (error) {
      console.error('获取设置失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleFinish = async (values: SettingsFormValues) => {
    try {
      const res = await updateSystemSettings(values);
      if (res.success) {
        message.success('保存成功');
      } else {
        message.error('保存失败');
      }
    } catch (error) {
      message.error('保存失败');
    }
  };

  const handleNotificationChange = async (
    key: keyof NotificationSettings,
    value: boolean,
  ) => {
    const newNotifications = { ...notifications, [key]: value };
    setNotifications(newNotifications);
    try {
      const res = await updateNotifications({
        notifications: newNotifications,
      });
      if (res.success) {
        message.success('通知设置已更新');
      } else {
        message.error('更新失败');
        setNotifications(notifications);
      }
    } catch (error) {
      message.error('更新失败');
      setNotifications(notifications);
    }
  };

  return (
    <PageContainer header={{ title: '系统设置' }} loading={loading}>
      <div className={styles.container}>
        <Card className={styles.card} bordered={false}>
          <div className={styles.sectionHeader}>
            <GlobalOutlined className={styles.sectionIcon} />
            <div>
              <Title level={5} style={{ margin: 0 }}>
                基本设置
              </Title>
              <Text type="secondary">配置网站基本信息</Text>
            </div>
          </div>
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item
              label="网站名称"
              name="siteName"
              rules={[{ required: true, message: '请输入网站名称' }]}
            >
              <Input placeholder="请输入网站名称" />
            </Form.Item>
            <Form.Item label="网站描述" name="siteDescription">
              <Input.TextArea rows={3} placeholder="请输入网站描述" />
            </Form.Item>
            <Form.Item
              label="联系邮箱"
              name="email"
              rules={[
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入正确的邮箱格式' },
              ]}
            >
              <Input placeholder="请输入联系邮箱" />
            </Form.Item>
            <Form.Item label="语言" name="language">
              <Select placeholder="请选择语言">
                <Select.Option value="zh-CN">简体中文</Select.Option>
                <Select.Option value="en-US">English</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="主题模式" name="theme">
              <Select placeholder="请选择主题">
                <Select.Option value="dark">深色模式</Select.Option>
                <Select.Option value="light">浅色模式</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                保存设置
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card className={styles.card} bordered={false}>
          <div className={styles.sectionHeader}>
            <BellOutlined className={styles.sectionIcon} />
            <div>
              <Title level={5} style={{ margin: 0 }}>
                通知设置
              </Title>
              <Text type="secondary">配置系统通知推送方式</Text>
            </div>
          </div>
          <div className={styles.switchList}>
            <div className={styles.switchItem}>
              <div>
                <Text strong>邮件通知</Text>
                <br />
                <Text type="secondary">通过邮件接收系统通知</Text>
              </div>
              <Switch
                checked={notifications.email}
                onChange={(checked) =>
                  handleNotificationChange('email', checked)
                }
              />
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <div className={styles.switchItem}>
              <div>
                <Text strong>系统消息</Text>
                <br />
                <Text type="secondary">在站内接收系统通知</Text>
              </div>
              <Switch
                checked={notifications.system}
                onChange={(checked) =>
                  handleNotificationChange('system', checked)
                }
              />
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <div className={styles.switchItem}>
              <div>
                <Text strong>安全提醒</Text>
                <br />
                <Text type="secondary">接收账号安全相关的提醒</Text>
              </div>
              <Switch
                checked={notifications.security}
                onChange={(checked) =>
                  handleNotificationChange('security', checked)
                }
              />
            </div>
          </div>
        </Card>

        <Card className={styles.card} bordered={false}>
          <div className={styles.sectionHeader}>
            <LockOutlined className={styles.sectionIcon} />
            <div>
              <Title level={5} style={{ margin: 0 }}>
                安全设置
              </Title>
              <Text type="secondary">保障账号安全</Text>
            </div>
          </div>
          <div className={styles.securityList}>
            <div className={styles.securityItem}>
              <div>
                <Text strong>登录密码</Text>
                <br />
                <Text type="secondary">定期修改密码可以提高账号安全性</Text>
              </div>
              <Button onClick={() => message.info('请前往个人中心修改密码')}>
                修改密码
              </Button>
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <div className={styles.securityItem}>
              <div>
                <Text strong>两步验证</Text>
                <br />
                <Text type="secondary">为您的账号添加额外的安全保护</Text>
              </div>
              <Button type="primary">开启</Button>
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <div className={styles.securityItem}>
              <div>
                <Text strong>登录历史</Text>
                <br />
                <Text type="secondary">查看账号的登录记录</Text>
              </div>
              <Button onClick={() => message.info('登录历史功能开发中')}>
                查看
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};

export default SettingsPage;
