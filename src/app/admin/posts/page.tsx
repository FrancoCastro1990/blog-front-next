'use client';

import { Table, Button, Space, Typography, Popconfirm, Tag, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import { usePostsQuery } from '@/hooks/queries/usePostsQuery';
import { useDeletePostMutation } from '@/hooks/mutations/usePostMutations';
import Loading from '@/components/common/Loading';
import { Post } from '@/types';

const { Title } = Typography;

export default function AdminPostsPage() {
  const [searchText, setSearchText] = useState('');
  const { data: posts, isLoading, error } = usePostsQuery();
  const deletePostMutation = useDeletePostMutation();

  const handleDelete = (id: string) => {
    deletePostMutation.mutate(id);
  };

  const filteredPosts = posts?.filter(post =>
    post.title.toLowerCase().includes(searchText.toLowerCase()) ||
    post.author.toLowerCase().includes(searchText.toLowerCase())
  ) || [];

  const columns = [
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Post) => (
        <div>
          <div style={{ fontWeight: '500', marginBottom: '4px' }}>
            {text}
          </div>
          <div style={{ color: '#8c8c8c', fontSize: '12px' }}>
            ID: {record.id.substring(0, 8)}...
          </div>
        </div>
      ),
    },
    {
      title: 'Autor',
      dataIndex: 'author',
      key: 'author',
      width: 120,
    },
    {
      title: 'Fecha',
      key: 'date',
      width: 150,
      render: (_: any, record: Post) => (
        <div>
          <div>{dayjs(record.createdAt).format('DD/MM/YYYY')}</div>
          <div style={{ color: '#8c8c8c', fontSize: '12px' }}>
            {dayjs(record.createdAt).format('HH:mm')}
          </div>
        </div>
      ),
    },
    {
      title: 'Estado',
      key: 'status',
      width: 100,
      render: () => (
        <Tag color="green">Publicado</Tag>
      ),
    },
    {
      title: 'Acciones',
      key: 'actions',
      width: 180,
      render: (_: any, record: Post) => (
        <Space size="small">
          <Link href={`/posts/${record.id}`} target="_blank">
            <Button
              type="text"
              icon={<EyeOutlined />}
              size="small"
              title="Ver post"
            />
          </Link>
          
          <Link href={`/admin/posts/edit/${record.id}`}>
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              title="Editar post"
            />
          </Link>
          
          <Popconfirm
            title="¿Eliminar post?"
            description="Esta acción no se puede deshacer"
            onConfirm={() => handleDelete(record.id)}
            okText="Eliminar"
            cancelText="Cancelar"
            okType="danger"
          >
            <Button
              type="text"
              icon={<DeleteOutlined />}
              size="small"
              danger
              title="Eliminar post"
              loading={deletePostMutation.isPending}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return <Loading message="Cargando posts..." />;
  }

  if (error) {
    return (
      <div className="error-message">
        Error al cargar los posts: {error.message}
      </div>
    );
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <Title level={2} style={{ margin: 0 }}>
          Gestión de Posts
        </Title>
        
        <Link href="/admin/posts/create">
          <Button type="primary" icon={<PlusOutlined />} size="large">
            Crear Post
          </Button>
        </Link>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <Input
          placeholder="Buscar posts por título o autor..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: '400px' }}
          size="large"
        />
      </div>

      <div style={{
        background: 'white',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <Table
          columns={columns}
          dataSource={filteredPosts}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} de ${total} posts`,
          }}
          scroll={{ x: true }}
        />
      </div>
    </div>
  );
}