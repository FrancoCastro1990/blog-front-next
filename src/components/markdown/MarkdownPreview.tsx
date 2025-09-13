'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownPreviewProps {
  content: string;
  className?: string;
  style?: React.CSSProperties;
  fontSize?: number | string;
}

export default function MarkdownPreview({ 
  content, 
  className,
  style,
  fontSize = 12
}: MarkdownPreviewProps) {
  // Si se pasa fontSize, calcular tamaños relativos para headers
  const baseFont = typeof fontSize === 'number' ? fontSize : fontSize ? parseFloat(fontSize) : undefined;
  const getHeaderSize = (mult: number, fallback: number) => baseFont ? baseFont * mult : fallback;
  return (
    <div
      className={className}
      style={{ ...style, fontSize: fontSize ? fontSize : undefined }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        // components={{
        //   code({ className, children, ...props }: any) {
        //     const match = /language-(\w+)/.exec(className || '');
        //     const inline = props.inline;
        //     return !inline && match ? (
        //       <SyntaxHighlighter
        //         style={vscDarkPlus}
        //         language={match[1]}
        //         PreTag="div"
        //         {...props}
        //       >
        //         {String(children).replace(/\n$/, '')}
        //       </SyntaxHighlighter>
        //     ) : (
        //       <code 
        //         className={className} 
        //         style={{
        //           background: '#f6f8fa',
        //           padding: '2px 6px',
        //           borderRadius: '4px',
        //           fontFamily: 'Fira Code, monospace'
        //         }}
        //         {...props}
        //       >
        //         {children}
        //       </code>
        //     );
        //   },
        //   h1: ({ children }) => (
        //     <h1 style={{ 
        //       fontSize: fontSize ? getHeaderSize(2, 28) : '28px',
        //       marginTop: '32px', 
        //       marginBottom: '16px',
        //       paddingBottom: '8px'
        //     }}>
        //       {children}
        //     </h1>
        //   ),
        //   h2: ({ children }) => (
        //     <h2 style={{ 
        //       fontSize: fontSize ? getHeaderSize(1.7, 24) : '24px',
        //       marginTop: '24px', 
        //       marginBottom: '12px',
        //       paddingBottom: '4px'
        //     }}>
        //       {children}
        //     </h2>
        //   ),
        //   h3: ({ children }) => (
        //     <h3 style={{ 
        //       fontSize: fontSize ? getHeaderSize(1.4, 20) : '20px',
        //       marginTop: '20px', 
        //       marginBottom: '10px' 
        //     }}>
        //       {children}
        //     </h3>
        //   ),
        //   blockquote: ({ children }) => (
        //     <blockquote style={{
        //       borderLeft: '4px solid #1890ff',
        //       paddingLeft: '16px',
        //       margin: '16px 0',
        //       fontStyle: 'italic',
        //       background: '#f6f8fa',
        //       padding: '16px',
        //       borderRadius: '4px'
        //     }}>
        //       {children}
        //     </blockquote>
        //   ),
        //   table: ({ children }) => (
        //     <table style={{
        //       borderCollapse: 'collapse',
        //       width: '100%',
        //       margin: '16px 0'
        //     }}>
        //       {children}
        //     </table>
        //   ),
        //   th: ({ children }) => (
        //     <th style={{
        //       border: '1px solid #d9d9d9',
        //       padding: '8px 12px',
        //       background: '#f5f5f5',
        //       fontWeight: '600',
        //       textAlign: 'left'
        //     }}>
        //       {children}
        //     </th>
        //   ),
        //   td: ({ children }) => (
        //     <td style={{
        //       border: '1px solid #d9d9d9',
        //       padding: '8px 12px',
        //       textAlign: 'left'
        //     }}>
        //       {children}
        //     </td>
        //   ),
        // }}
      >
        {content || '*Nada que mostrar...*'}
      </ReactMarkdown>
    </div>
  );
}