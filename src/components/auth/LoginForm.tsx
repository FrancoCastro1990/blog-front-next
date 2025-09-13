'use client';

import { Form, Input, Button, Card, Typography, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useLoginMutation } from '@/hooks/mutations/useLoginMutation';
import { LoginRequest } from '@/types';

const { Title, Text } = Typography;

export default function LoginForm() {
  const [form] = Form.useForm();
  const loginMutation = useLoginMutation();

  const onFinish = (values: LoginRequest) => {
    loginMutation.mutate(values);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <Card
        style={{
          width: '100%',
          maxWidth: 400,
          borderRadius: 12,
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2} style={{ margin: 0 }}>
              Iniciar Sesión
            </Title>
            <Text type="secondary">
              Accede a tu panel administrativo
            </Text>
          </div>

          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Por favor ingresa tu email' },
                { type: 'email', message: 'Email inválido' }
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="admin@blog.com"
                autoComplete="email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Contraseña"
              rules={[
                { required: true, message: 'Por favor ingresa tu contraseña' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loginMutation.isPending}
                style={{ height: 48 }}
              >
                {loginMutation.isPending ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: 'center' }}>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Demo: admin@blog.com / admin123456
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  );
}