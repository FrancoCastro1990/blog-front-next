import type { Metadata } from 'next';
import { Providers } from './providers';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Mi Blog Personal',
  description: 'Blog personal desarrollado con Next.js 15 y Ant Design',
  keywords: ['blog', 'next.js', 'react', 'typescript', 'ant design'],
  authors: [{ name: 'Blog Admin' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ErrorBoundary>
          <Providers>
            {children}
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}