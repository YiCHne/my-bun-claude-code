import {
  changePassword,
  getUserProfile,
  updateUserProfile,
  uploadAvatar,
} from '@/services/user';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  Space,
  Typography,
  Upload,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';

interface UserProfile {
  id: string;
  username: string;
  nickname: string;
  avatar: string;
  email: string;
  phone: string;
  roles: string[];
  createdAt: string;
}

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await getUserProfile();
      if (res.success) {
        setProfile(res.data);
        form.setFieldsValue({
          nickname: res.data.nickname,
          email: res.data.email,
          phone: res.data.phone,
        });
      }
    } catch (error) {
      console.error('获取用户信息失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleFinish = async (values: {
    nickname: string;
    email: string;
    phone: string;
  }) => {
    try {
      const res = await updateUserProfile(values);
      if (res.success) {
        message.success('保存成功');
        fetchProfile();
      } else {
        message.error('保存失败');
      }
    } catch (error) {
      message.error('保存失败');
    }
  };

  const handlePasswordChange = async (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      const res = await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      if (res.success) {
        message.success('密码修改成功');
        form.resetFields();
      } else {
        message.error(res.errorMessage || '密码修改失败');
      }
    } catch (error) {
      message.error('密码修改失败');
    }
  };

  const handleAvatarUpload = async (file: File) => {
    // 模拟上传，实际应该上传到服务器
    const reader = new FileReader();
    reader.onload = async (e) => {
      const avatarUrl = e.target?.result as string;
      try {
        const res = await uploadAvatar({ avatar: avatarUrl });
        if (res.success) {
          message.success('头像上传成功');
          fetchProfile();
        }
      } catch (error) {
        message.error('头像上传失败');
      }
    };
    reader.readAsDataURL(file);
    return false;
  };

  return (
    <PageContainer header={{ title: '个人中心' }} loading={loading}>
      <div className={styles.container}>
        <Card className={styles.infoCard} bordered={false}>
          <div className={styles.avatarSection}>
            <Upload showUploadList={false} beforeUpload={handleAvatarUpload}>
              <div className={styles.avatarWrapper}>
                <Avatar
                  size={100}
                  src={profile?.avatar}
                  style={{
                    background:
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                  icon={<UserOutlined />}
                />
                <div className={styles.avatarMask}>
                  <UploadOutlined />
                  <span>更换头像</span>
                </div>
              </div>
            </Upload>
            <Typography.Title level={4} className={styles.username}>
              {profile?.nickname || '管理员'}
            </Typography.Title>
            <Typography.Text type="secondary">
              {profile?.roles?.includes('admin') ? '超级管理员' : '普通用户'}
            </Typography.Text>
          </div>
        </Card>

        <Card className={styles.formCard} bordered={false}>
          <Typography.Title level={4}>基本信息</Typography.Title>
          {profile && (
            <Descriptions column={2} className={styles.descriptions}>
              <Descriptions.Item label="用户ID">{profile.id}</Descriptions.Item>
              <Descriptions.Item label="用户名">
                {profile.username}
              </Descriptions.Item>
              <Descriptions.Item label="邮箱">
                {profile.email}
              </Descriptions.Item>
              <Descriptions.Item label="手机号">
                {profile.phone}
              </Descriptions.Item>
              <Descriptions.Item label="角色">
                {profile.roles?.includes('admin') ? '超级管理员' : '普通用户'}
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {profile.createdAt}
              </Descriptions.Item>
            </Descriptions>
          )}
        </Card>

        <Card className={styles.formCard} bordered={false}>
          <Typography.Title level={4}>修改信息</Typography.Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            className={styles.profileForm}
          >
            <Form.Item
              label="昵称"
              name="nickname"
              rules={[{ required: true, message: '请输入昵称' }]}
            >
              <Input placeholder="请输入昵称" />
            </Form.Item>
            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入正确的邮箱格式' },
              ]}
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item label="手机号" name="phone">
              <Input placeholder="请输入手机号" />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  保存修改
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>

        <Card className={styles.formCard} bordered={false}>
          <Typography.Title level={4}>修改密码</Typography.Title>
          <Form
            layout="vertical"
            onFinish={handlePasswordChange}
            className={styles.passwordForm}
          >
            <Form.Item
              label="当前密码"
              name="currentPassword"
              rules={[{ required: true, message: '请输入当前密码' }]}
            >
              <Input.Password placeholder="请输入当前密码" />
            </Form.Item>
            <Form.Item
              label="新密码"
              name="newPassword"
              rules={[
                { required: true, message: '请输入新密码' },
                { min: 6, message: '密码至少6位' },
              ]}
            >
              <Input.Password placeholder="请输入新密码" />
            </Form.Item>
            <Form.Item
              label="确认新密码"
              name="confirmPassword"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: '请确认新密码' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入的密码不一致'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="请确认新密码" />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  修改密码
                </Button>
                <Button htmlType="button" onClick={() => form.resetFields()}>
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </PageContainer>
  );
};

export default ProfilePage;
