import {
  ProForm,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { Descriptions, Modal, Tag } from 'antd';
import React from 'react';
import { FormValues, UserItem } from '../service';

interface UserModalProps {
  visible: boolean;
  type: 'add' | 'edit' | 'view';
  values: UserItem | null;
  onCancel: () => void;
  onSubmit: (values: FormValues) => Promise<boolean>;
}

const UserModal: React.FC<UserModalProps> = ({
  visible,
  type,
  values,
  onCancel,
  onSubmit,
}) => {
  const isView = type === 'view';
  const isEdit = type === 'edit';

  // 查看模式
  if (isView && values) {
    return (
      <Modal
        open={visible}
        title="用户详情"
        footer={null}
        onCancel={onCancel}
        width={600}
      >
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="头像">
            {values.avatar ? (
              <img
                src={values.avatar}
                alt="avatar"
                style={{ width: 60, height: 60, borderRadius: 8 }}
              />
            ) : (
              '-'
            )}
          </Descriptions.Item>
          <Descriptions.Item label="用户名">
            {values.username}
          </Descriptions.Item>
          <Descriptions.Item label="昵称">{values.nickname}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{values.email}</Descriptions.Item>
          <Descriptions.Item label="手机号">
            {values.phone || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="角色">
            {values.roles?.map((role) => (
              <Tag key={role} color={role === 'admin' ? 'red' : 'blue'}>
                {role === 'admin' ? '管理员' : '普通用户'}
              </Tag>
            ))}
          </Descriptions.Item>
          <Descriptions.Item label="状态">
            <Tag color={values.status === 'active' ? 'green' : 'red'}>
              {values.status === 'active' ? '正常' : '禁用'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">
            {values.createdAt}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    );
  }

  // 新增/编辑模式
  return (
    <Modal
      open={visible}
      title={isEdit ? '编辑用户' : '新增用户'}
      onCancel={onCancel}
      footer={null}
      width={500}
    >
      <ProForm
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={
          values || {
            status: 'active',
            roles: ['user'],
          }
        }
        onFinish={onSubmit}
      >
        <ProFormText
          name="username"
          label="用户名"
          placeholder="请输入用户名"
          rules={[{ required: true, message: '请输入用户名' }]}
          disabled={isEdit}
        />
        {!isEdit && (
          <ProFormText
            name="password"
            label="密码"
            placeholder="请输入密码"
            rules={[{ required: true, message: '请输入密码' }]}
          />
        )}
        <ProFormText
          name="nickname"
          label="昵称"
          placeholder="请输入昵称"
          rules={[{ required: true, message: '请输入昵称' }]}
        />
        <ProFormText
          name="email"
          label="邮箱"
          placeholder="请输入邮箱"
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入正确的邮箱格式' },
          ]}
        />
        <ProFormText name="phone" label="手机号" placeholder="请输入手机号" />
        <ProFormSelect
          name="roles"
          label="角色"
          mode="multiple"
          options={[
            { label: '管理员', value: 'admin' },
            { label: '普通用户', value: 'user' },
          ]}
          rules={[{ required: true, message: '请选择角色' }]}
        />
        <ProFormSwitch
          name="status"
          label="状态"
          checkedChildren="正常"
          unCheckedChildren="禁用"
        />
      </ProForm>
    </Modal>
  );
};

export default UserModal;
