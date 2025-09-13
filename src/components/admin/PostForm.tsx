'use client';

import { Form, Input, Button, Space, Typography } from 'antd';
import { SaveOutlined, EyeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import MarkdownEditor from '@/components/markdown/MarkdownEditor';
import { CreatePostRequest, UpdatePostRequest, Post } from '@/types';

const { Title } = Typography;

interface PostFormProps {
  initialValues?: Partial<Post>;
  onSubmit: (values: any) => void;
  isLoading?: boolean;
  title: string;
}

export default function PostForm({
  initialValues,
  onSubmit,
  isLoading = false,
  title
}: PostFormProps) {
  const [form] = Form.useForm();
  const router = useRouter();

  const handleFinish = (values: any) => {
    onSubmit(values);
  };

  const handlePreview = () => {
    const values = form.getFieldsValue();
    if (values.title && values.content) {
      // Store in session storage for preview
      sessionStorage.setItem('postPreview', JSON.stringify(values));
      window.open('/admin/posts/preview', '_blank');
    }
  };

  return (
    <div style={{ maxWidth: '100%' }}>
      <Title level={2} style={{ marginBottom: '24px' }}>
        {title}
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={initialValues}
        size="large"
      >
        <Form.Item
          name="title"
          label="Título"
          rules={[
            { required: true, message: 'El título es obligatorio' },
            { min: 5, message: 'El título debe tener al menos 5 caracteres' },
            { max: 200, message: 'El título no puede exceder 200 caracteres' }
          ]}
        >
          <Input
            placeholder="Ingresa el título del post"
            style={{ fontSize: '18px', fontWeight: '500' }}
          />
        </Form.Item>

        <Form.Item
          name="author"
          label="Autor"
          rules={[
            { required: true, message: 'El autor es obligatorio' },
            { min: 2, message: 'El nombre del autor debe tener al menos 2 caracteres' }
          ]}
        >
          <Input placeholder="Nombre del autor" />
        </Form.Item>

        <Form.Item
          name="content"
          label="Contenido"
          rules={[
            { required: true, message: 'El contenido es obligatorio' },
            { min: 50, message: 'El contenido debe tener al menos 50 caracteres' }
          ]}
        >
          <MarkdownEditor
            value={form.getFieldValue('content') || ''}
            onChange={(value) => form.setFieldValue('content', value)}
            placeholder="Escribe el contenido del post en Markdown..."
            height={500}
          />
        </Form.Item>

        <Form.Item>
          <Space size="middle">
            <Button
              type="primary"
              icon={<SaveOutlined />}
              htmlType="submit"
              loading={isLoading}
              size="large"
            >
              {isLoading ? 'Guardando...' : 'Guardar Post'}
            </Button>
            
            <Button
              icon={<EyeOutlined />}
              onClick={handlePreview}
              size="large"
            >
              Vista Previa
            </Button>
            
            <Button
              onClick={() => router.back()}
              size="large"
            >
              Cancelar
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}