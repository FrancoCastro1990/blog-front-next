'use client';

import { Spin, Typography } from 'antd';

const { Text } = Typography;

interface LoadingProps {
  message?: string;
  size?: 'small' | 'default' | 'large';
}

export default function Loading({ message = 'Cargando...', size = 'large' }: LoadingProps) {
  return (
    <div className="loading-center">
      <Spin size={size} tip={message}>
        <div style={{ padding: '50px' }}>
          <Text type="secondary">{message}</Text>
        </div>
      </Spin>
    </div>
  );
}