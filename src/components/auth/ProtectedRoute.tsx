'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Loading from '@/components/common/Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

export default function ProtectedRoute({ 
  children, 
  requiredPermission 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, hasPermission, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <Loading message="Verificando autenticación..." />;
  }

  if (!isAuthenticated) {
    return <Loading message="Redirigiendo al login..." />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '50px',
        color: '#ff4d4f'
      }}>
        No tienes permisos para acceder a esta página
      </div>
    );
  }

  return <>{children}</>;
}