'use client';

import { Layout } from 'antd';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import PostList from '@/components/blog/PostList';
import { usePostsQuery } from '@/hooks/queries/usePostsQuery';

const { Content } = Layout;

export default function HomePage() {
  const { data: posts, isLoading, error } = usePostsQuery();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      
      <Content style={{ padding: '48px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <PostList
            posts={posts || []}
            isLoading={isLoading}
            error={error}
            title="Mi Blog Personal"
          />
        </div>
      </Content>
      
      <Footer />
    </Layout>
  );
}