'use client';

import { Row, Col, Typography } from 'antd';
import { FileTextOutlined, EyeOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import StatsCard from '@/components/admin/StatsCard';
import { usePostsQuery } from '@/hooks/queries/usePostsQuery';
import Loading from '@/components/common/Loading';

const { Title } = Typography;

export default function AdminDashboard() {
  const { data: posts, isLoading, error } = usePostsQuery();

  if (isLoading) {
    return <Loading message="Cargando dashboard..." />;
  }

  if (error) {
    return (
      <div className="error-message">
        Error al cargar las estadísticas: {error.message}
      </div>
    );
  }

  const totalPosts = posts?.length || 0;
  const recentPosts = posts?.slice(0, 5) || [];

  return (
    <div>
      <Title level={1} style={{ marginBottom: '32px' }}>
        Dashboard Administrativo
      </Title>

      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={12} lg={6}>
          <StatsCard
            title="Total de Posts"
            value={totalPosts}
            icon={<FileTextOutlined />}
            color="#1890ff"
          />
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <StatsCard
            title="Posts Recientes"
            value={recentPosts.length}
            icon={<EyeOutlined />}
            color="#52c41a"
          />
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <StatsCard
            title="Borradores"
            value={0}
            icon={<EditOutlined />}
            color="#faad14"
          />
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <StatsCard
            title="Publicados"
            value={totalPosts}
            icon={<PlusOutlined />}
            color="#722ed1"
          />
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <Title level={3} style={{ marginBottom: '16px' }}>
              Posts Recientes
            </Title>
            
            {recentPosts.length > 0 ? (
              <div>
                {recentPosts.map((post) => (
                  <div
                    key={post.id}
                    style={{
                      borderBottom: '1px solid #f0f0f0',
                      padding: '16px 0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <Title level={5} style={{ margin: 0, marginBottom: '4px' }}>
                        {post.title}
                      </Title>
                      <span style={{ color: '#8c8c8c', fontSize: '14px' }}>
                        Por {post.author} • {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#8c8c8c', textAlign: 'center', padding: '40px 0' }}>
                No hay posts recientes
              </p>
            )}
          </div>
        </Col>
        
        <Col xs={24} lg={8}>
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <Title level={3} style={{ marginBottom: '16px' }}>
              Acciones Rápidas
            </Title>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href="/admin/posts/create"
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  background: '#f6f8fa',
                  borderRadius: '6px',
                  color: '#1890ff',
                  textDecoration: 'none',
                  transition: 'background 0.2s ease'
                }}
              >
                <PlusOutlined style={{ marginRight: '8px' }} />
                Crear nuevo post
              </a>
              
              <a
                href="/admin/posts"
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  background: '#f6f8fa',
                  borderRadius: '6px',
                  color: '#1890ff',
                  textDecoration: 'none',
                  transition: 'background 0.2s ease'
                }}
              >
                <FileTextOutlined style={{ marginRight: '8px' }} />
                Ver todos los posts
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}