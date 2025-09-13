'use client';

import { Typography, Space, Tag, Divider, Button } from 'antd';
import { CalendarOutlined, UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import dayjs from 'dayjs';
import { Post } from '@/types';

const { Title, Text } = Typography;

interface PostDetailProps {
  post: Post;
}

export default function PostDetail({ post }: PostDetailProps) {
  const router = useRouter();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={() => router.back()}
        style={{ marginBottom: '24px' }}
      >
        Volver
      </Button>

      <Title level={1} style={{ marginBottom: '16px' }}>
        {post.title}
      </Title>

      <Space size="middle" style={{ marginBottom: '24px' }}>
        <Space size="small">
          <CalendarOutlined />
          <Text type="secondary">
            {dayjs(post.createdAt).format('DD MMMM YYYY')}
          </Text>
        </Space>
        <Space size="small">
          <UserOutlined />
          <Text type="secondary">{post.author}</Text>
        </Space>
      </Space>

      {post.updatedAt && (
        <Text type="secondary" style={{ display: 'block', marginBottom: '24px' }}>
          Última actualización: {dayjs(post.updatedAt).format('DD MMMM YYYY')}
        </Text>
      )}

      <Divider />

      <div style={{ lineHeight: '1.8', fontSize: '16px' }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '');
              const inline = props.inline;
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code 
                  className={className} 
                  style={{
                    background: '#f6f8fa',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontFamily: 'Fira Code, monospace'
                  }}
                  {...props}
                >
                  {children}
                </code>
              );
            },
            h1: ({ children }) => (
              <Title level={2} style={{ marginTop: '32px', marginBottom: '16px' }}>
                {children}
              </Title>
            ),
            h2: ({ children }) => (
              <Title level={3} style={{ marginTop: '24px', marginBottom: '12px' }}>
                {children}
              </Title>
            ),
            h3: ({ children }) => (
              <Title level={4} style={{ marginTop: '20px', marginBottom: '10px' }}>
                {children}
              </Title>
            ),
            blockquote: ({ children }) => (
              <div style={{
                borderLeft: '4px solid #1890ff',
                paddingLeft: '16px',
                margin: '16px 0',
                fontStyle: 'italic',
                background: '#f6f8fa',
                padding: '16px'
              }}>
                {children}
              </div>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}