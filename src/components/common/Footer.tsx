'use client';

import { Layout, Typography, Space, Divider } from 'antd';
import { GithubOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

export default function Footer() {
  return (
    <AntFooter style={{ textAlign: 'center', padding: '48px 24px' }}>
      <Space direction="vertical" size="middle">
        <Space size="large">
          <GithubOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
          <TwitterOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
          <LinkedinOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
        </Space>
        
        <Divider />
        
        <Text type="secondary">
          © 2024 Mi Blog Personal. Desarrollado con Next.js 15 y Ant Design
        </Text>
      </Space>
    </AntFooter>
  );
}