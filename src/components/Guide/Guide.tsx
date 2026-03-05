import {
  RocketOutlined,
  SettingOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { Card, Row, Space, Typography } from 'antd';
import React from 'react';
import styles from './Guide.less';

interface Props {
  name: string;
}

// 脚手架示例组件
const Guide: React.FC<Props> = (props) => {
  const { name } = props;
  return (
    <div className={styles.container}>
      <Card className={styles.welcomeCard} bordered={false}>
        <div className={styles.iconWrapper}>
          <SmileOutlined className={styles.icon} />
        </div>
        <Typography.Title level={2} className={styles.title}>
          欢迎使用 <span className={styles.highlight}>{name}</span>
        </Typography.Title>
        <Typography.Paragraph className={styles.description}>
          这是一个现代化的管理系统，基于 React + UmiJS + Ant Design 构建。
        </Typography.Paragraph>
      </Card>

      <Row gutter={[24, 24]} className={styles.features}>
        <Card className={styles.featureCard} bordered={false}>
          <Space direction="vertical" align="center" size="large">
            <div className={styles.featureIcon}>
              <RocketOutlined />
            </div>
            <Typography.Title level={4}>快速开发</Typography.Title>
            <Typography.Text type="secondary">
              基于 UmiJS 4.0，提供完整的应用开发解决方案
            </Typography.Text>
          </Space>
        </Card>
        <Card className={styles.featureCard} bordered={false}>
          <Space direction="vertical" align="center" size="large">
            <div className={styles.featureIcon}>
              <SettingOutlined />
            </div>
            <Typography.Title level={4}>权限管理</Typography.Title>
            <Typography.Text type="secondary">
              基于 RBAC 的完整权限控制体系
            </Typography.Text>
          </Space>
        </Card>
        <Card className={styles.featureCard} bordered={false}>
          <Space direction="vertical" align="center" size="large">
            <div className={styles.featureIcon}>
              <SmileOutlined />
            </div>
            <Typography.Title level={4}>美观 UI</Typography.Title>
            <Typography.Text type="secondary">
              紫色渐变主题，现代简洁的设计风格
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </div>
  );
};

export default Guide;
