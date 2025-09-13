'use client';

import { Layout } from 'antd';
import { useParams } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import PostDetail from '@/components/blog/PostDetail';
import { usePostQuery } from '@/hooks/queries/usePostsQuery';
import Loading from '@/components/common/Loading';

const { Content } = Layout;

export default function PostDetailPage() {
  const params = useParams();
  const postId = params.id as string;

  const { data: post, isLoading, error } = usePostQuery(postId);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      
      <Content style={{ padding: '48px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {isLoading && <Loading message="Cargando post..." />}
          
          {error && (
            <div className="error-message">
              Error al cargar el post: {error.message}
            </div>
          )}
          
          {post && <PostDetail post={post} />}
          
          {!isLoading && !error && !post && (
            <div style={{ textAlign: 'center', padding: '50px 0' }}>
              <h2>Post no encontrado</h2>
              <p>El post que buscas no existe o ha sido eliminado.</p>
            </div>
          )}
        </div>
      </Content>
      
      <Footer />
    </Layout>
  );
}