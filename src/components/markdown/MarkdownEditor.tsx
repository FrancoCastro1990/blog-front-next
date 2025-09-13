'use client';

import { useState } from 'react';
import { Row, Col, Input, Button, Space } from 'antd';
import { EyeOutlined, EditOutlined, CopyOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from '@/styles/components/Editor.module.css';

const { TextArea } = Input;

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
}

export default function MarkdownEditor({ 
  value, 
  onChange, 
  placeholder = "Escribe tu contenido en Markdown...",
  height = 600
}: MarkdownEditorProps) {
  const [previewMode, setPreviewMode] = useState<'split' | 'preview' | 'edit'>('split');

  const insertText = (before: string, after: string = '') => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    onChange(newText);
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const toolbarButtons = [
    { label: 'H1', action: () => insertText('# ') },
    { label: 'H2', action: () => insertText('## ') },
    { label: 'H3', action: () => insertText('### ') },
    { label: 'Bold', action: () => insertText('**', '**') },
    { label: 'Italic', action: () => insertText('*', '*') },
    { label: 'Code', action: () => insertText('`', '`') },
    { label: 'Link', action: () => insertText('[', '](url)') },
    { label: 'Quote', action: () => insertText('> ') },
    { label: 'List', action: () => insertText('- ') },
    { label: 'Code Block', action: () => insertText('```\n', '\n```') },
  ];

  const renderEditor = () => (
    <TextArea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={styles.editorInput}
      style={{ height, minHeight: height }}
      autoSize={false}
    />
  );

  const renderPreview = () => (
    <div className={styles.preview} style={{ height, minHeight: height }}>
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
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {value || '*Nada que mostrar...*'}
      </ReactMarkdown>
    </div>
  );

  return (
    <div className={styles.editorContainer}>
      <div className={styles.toolbarContainer}>
        <div className={styles.toolbar}>
          {toolbarButtons.map((button) => (
            <button
              key={button.label}
              onClick={button.action}
              className={styles.toolbarButton}
              type="button"
            >
              {button.label}
            </button>
          ))}
        </div>
        
        <div className={styles.previewMode}>
          <Button.Group size="small">
            <Button
              type={previewMode === 'edit' ? 'primary' : 'default'}
              icon={<EditOutlined />}
              onClick={() => setPreviewMode('edit')}
            >
              Editar
            </Button>
            <Button
              type={previewMode === 'split' ? 'primary' : 'default'}
              onClick={() => setPreviewMode('split')}
            >
              Ambos
            </Button>
            <Button
              type={previewMode === 'preview' ? 'primary' : 'default'}
              icon={<EyeOutlined />}
              onClick={() => setPreviewMode('preview')}
            >
              Vista previa
            </Button>
          </Button.Group>
        </div>
      </div>

      {previewMode === 'edit' && renderEditor()}
      
      {previewMode === 'preview' && renderPreview()}
      
      {previewMode === 'split' && (
        <Row style={{ height }}>
          <Col span={12}>
            {renderEditor()}
          </Col>
          <Col span={12}>
            {renderPreview()}
          </Col>
        </Row>
      )}
    </div>
  );
}