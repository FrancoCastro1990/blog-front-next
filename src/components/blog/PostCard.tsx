'use client';

import { Card, Tag, Space, Typography, Button } from 'antd';
import { CalendarOutlined, UserOutlined, ReadOutlined } from '@ant-design/icons';
import Link from 'next/link';
import dayjs from 'dayjs';
import { Post } from '@/types';
import styles from '@/styles/components/PostCard.module.css';
import MarkdownPreview from '@/components/markdown/MarkdownPreview';

const { Title, Paragraph, Text } = Typography;

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  // Limitar el preview a los primeros 150 caracteres, pero renderizar como markdown
  const excerpt = post.content.length > 150 
    ? post.content.substring(0, 150) + '...'
    : post.content;

  return (
    <Card className={styles.postCard} hoverable>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Title level={3} style={{ marginBottom: '12px', lineHeight: '1.3' }}>
          {post.title}
        </Title>
        
        <Space className={styles.metadata} size="middle">
          <Space size="small">
            <CalendarOutlined />
            <Text type="secondary">
              {dayjs(post.createdAt).format('DD MMM YYYY')}
            </Text>
          </Space>
          <Space size="small">
            <UserOutlined />
            <Text type="secondary">{post.author}</Text>
          </Space>
        </Space>

        <div className={styles.postContent}>
          <MarkdownPreview  content={excerpt} style={{ maxHeight: 120, overflow: 'hidden' }} />
        </div>

        <div className={styles.tagContainer}>
          <Link href={`/posts/${post.id}`}>
            <Button 
              type="link" 
              icon={<ReadOutlined />}
              className={styles.readMore}
              block
            >
              Leer más
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}