'use client';

import { Card, Statistic, Space } from 'antd';
import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon?: ReactNode;
  suffix?: string;
  prefix?: string;
  loading?: boolean;
  color?: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  suffix,
  prefix,
  loading = false,
  color = '#1890ff'
}: StatsCardProps) {
  return (
    <Card hoverable>
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {icon && (
            <div style={{ 
              fontSize: '24px', 
              color,
              display: 'flex',
              alignItems: 'center'
            }}>
              {icon}
            </div>
          )}
          <Statistic
            title={title}
            value={value}
            suffix={suffix}
            prefix={prefix}
            loading={loading}
            valueStyle={{ color, fontSize: '24px', fontWeight: 'bold' }}
          />
        </div>
      </Space>
    </Card>
  );
}