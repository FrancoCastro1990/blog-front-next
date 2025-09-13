'use client';

import { Row, Col, Empty, Typography } from 'antd';
import { Post } from '@/types';
import PostCard from './PostCard';
import Loading from '@/components/common/Loading';

const { Title } = Typography;

interface PostListProps {
  posts: Post[];
  isLoading?: boolean;
  error?: any;
  title?: string;
}

export default function PostList({ 
  posts, 
  isLoading, 
  error, 
  title = 'Posts Recientes' 
}: PostListProps) {
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

  if (!posts || posts.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Empty
          description="No hay posts disponibles"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  }

  return (
    <div>
      <Title level={1} style={{ textAlign: 'center', marginBottom: '48px' }}>
        {title}
      </Title>
      <Row gutter={[24, 24]}>
        {posts.map((post) => (
          <Col key={post.id} xs={24} sm={12} lg={12} xl={12}>
            <PostCard post={post} />
          </Col>
        ))}
      </Row>
    </div>
  );
}