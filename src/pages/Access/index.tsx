import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { Button, Card, Typography } from 'antd';

const { Title, Text } = Typography;

const AccessPage: React.FC = () => {
  const access = useAccess();
  return (
    <PageContainer
      ghost
      header={{
        title: '权限示例',
      }}
    >
      <Card style={{ borderRadius: 12 }}>
        <Title level={4}>权限控制示例</Title>
        <Text type="secondary">
          演示基于角色的访问控制（RBAC）功能，展示不同角色用户看到的界面差异。
        </Text>
        <div style={{ marginTop: 24 }}>
          <Access accessible={access.canSeeAdmin}>
            <Button type="primary">只有 Admin 可以看到这个按钮</Button>
          </Access>
          {!access.canSeeAdmin && (
            <Text type="warning">您没有管理员权限，无法看到管理功能</Text>
          )}
        </div>
      </Card>
    </PageContainer>
  );
};

export default AccessPage;
