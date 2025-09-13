import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import { authService } from '@/lib/api/services/authService';
import { LoginRequest } from '@/types';

export const useLoginMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (response) => {
      const { user, accessToken, refreshToken } = response.data;
      
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      localStorage.setItem('user_data', JSON.stringify(user));
      
      queryClient.setQueryData(['user'], user);
      message.success('¡Bienvenido!');
      router.push('/admin');
    },
    onError: (error: any) => {
      console.error('Login error:', error);
      message.error('Credenciales inválidas');
    },
  });
};

export const useLogoutMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        await authService.logout({ refreshToken });
      }
    },
    onSuccess: () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_data');
      queryClient.clear();
      message.success('Sesión cerrada exitosamente');
      router.push('/login');
    },
    onError: (error: any) => {
      console.error('Logout error:', error);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_data');
      queryClient.clear();
      router.push('/login');
    },
  });
};