import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { authService } from '@/lib/api/services/authService';
import { User } from '@/types';

export const useAuth = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('No access token');
      }
      return authService.getCurrentUser();
    },
    enabled: isClient && !!localStorage.getItem('access_token'),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const isAuthenticated = isClient && !!localStorage.getItem('access_token') && !!user;

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  const canCreatePosts = () => hasPermission('CREATE_POSTS');
  const canUpdatePosts = () => hasPermission('UPDATE_POSTS');
  const canDeletePosts = () => hasPermission('DELETE_POSTS');
  const isAdmin = () => hasPermission('ADMIN');

  return {
    user,
    isAuthenticated,
    isLoading: !isClient || isLoading,
    error,
    hasPermission,
    canCreatePosts,
    canUpdatePosts,
    canDeletePosts,
    isAdmin,
  };
};