import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { Avatar, Button, message, Popconfirm, Space, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import UserModal, { FormValues } from './components/UserModal';
import { userAPI, UserItem } from './service';

const UserManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRows, setSelectedRows] = useState<UserItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('add');
  const [currentRow, setCurrentRow] = useState<UserItem | null>(null);

  // 处理新增
  const handleAdd = async (values: FormValues) => {
    const hide = message.loading('正在添加');
    try {
      const result = await userAPI.addUser(values);
      hide();
      if (result.success) {
        message.success('添加成功');
        setModalVisible(false);
        actionRef.current?.reload();
        return true;
      }
      message.error(result.errorMessage || '添加失败');
      return false;
    } catch (error) {
      hide();
      message.error('添加失败，请重试');
      return false;
    }
  };

  // 处理编辑
  const handleEdit = async (values: FormValues) => {
    if (!currentRow?.id) return false;
    const hide = message.loading('正在更新');
    try {
      const result = await userAPI.updateUser(currentRow.id, values);
      hide();
      if (result.success) {
        message.success('更新成功');
        setModalVisible(false);
        setCurrentRow(null);
        actionRef.current?.reload();
        return true;
      }
      message.error(result.errorMessage || '更新失败');
      return false;
    } catch (error) {
      hide();
      message.error('更新失败，请重试');
      return false;
    }
  };

  // 处理删除
  const handleDelete = async (ids: string[]) => {
    const hide = message.loading('正在删除');
    try {
      const results = await Promise.all(
        ids.map((id) => userAPI.deleteUser(id)),
      );
      hide();
      const allSuccess = results.every((r) => r.success);
      if (allSuccess) {
        message.success('删除成功');
        setSelectedRows([]);
        actionRef.current?.reload();
        return true;
      }
      message.error('部分删除失败');
      return false;
    } catch (error) {
      hide();
      message.error('删除失败，请重试');
      return false;
    }
  };

  // 打开弹窗
  const openModal = (type: 'add' | 'edit' | 'view', record?: UserItem) => {
    setModalType(type);
    setCurrentRow(record || null);
    setModalVisible(true);
  };

  const columns: ProColumns<UserItem>[] = [
    {
      title: '头像',
      dataIndex: 'avatar',
      hideInSearch: true,
      render: (_, record) => (
        <Avatar
          src={record.avatar}
          size={40}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          {record.nickname?.[0]?.toUpperCase() || 'U'}
        </Avatar>
      ),
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      copyable: true,
      formItemProps: {
        rules: [{ required: true, message: '请输入用户名' }],
      },
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      copyable: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      hideInForm: true,
    },
    {
      title: '角色',
      dataIndex: 'roles',
      key: 'roles',
      hideInForm: true,
      render: (_, record) => (
        <Space>
          {record.roles?.map((role) => (
            <Tag key={role} color={role === 'admin' ? 'purple' : 'blue'}>
              {role === 'admin' ? '管理员' : '普通用户'}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      valueEnum: {
        active: { text: '正常', status: 'Success' },
        disabled: { text: '禁用', status: 'Error' },
      },
      render: (_, record) => (
        <Tag color={record.status === 'active' ? 'green' : 'volcano'}>
          {record.status === 'active' ? '正常' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      hideInForm: true,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => openModal('view', record)}
          >
            查看
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => openModal('edit', record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除此用户吗？"
            onConfirm={() => handleDelete([record.id!])}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: '用户管理',
        breadcrumb: {
          routes: [
            { path: '/', breadcrumbName: '首页' },
            { path: '/user-management', breadcrumbName: '用户管理' },
          ],
        },
      }}
    >
      <ProTable<UserItem>
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        request={async (params) => {
          const { data, success } = await userAPI.getUserList({
            current: params.current,
            pageSize: params.pageSize,
            keyword: params.keyword,
          });
          return {
            data: data?.list || [],
            success,
            total: data?.total || 0,
          };
        }}
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => openModal('add')}
          >
            新增用户
          </Button>,
        ]}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
        search={{
          labelWidth: 'auto',
          span: 6,
        }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />

      {selectedRows.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRows.length}</a> 项
            </div>
          }
        >
          <Popconfirm
            title={`确定删除选中的 ${selectedRows.length} 个用户吗？`}
            onConfirm={() => handleDelete(selectedRows.map((r) => r.id!))}
            okText="确定"
            cancelText="取消"
          >
            <Button danger icon={<DeleteOutlined />}>
              批量删除
            </Button>
          </Popconfirm>
        </FooterToolbar>
      )}

      <UserModal
        visible={modalVisible}
        type={modalType}
        values={currentRow}
        onCancel={() => {
          setModalVisible(false);
          setCurrentRow(null);
        }}
        onSubmit={modalType === 'add' ? handleAdd : handleEdit}
      />
    </PageContainer>
  );
};

export default UserManagement;
