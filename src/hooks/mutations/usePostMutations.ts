import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { postService } from '@/lib/api/services/postService';
import { CreatePostRequest, UpdatePostRequest } from '@/types';

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostRequest) => postService.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      message.success('Post creado exitosamente');
    },
    onError: (error: any) => {
      console.error('Create post error:', error);
      const errorMessage = error.response?.data?.message || 'Error al crear el post';
      message.error(errorMessage);
    },
  });
};

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePostRequest }) =>
      postService.updatePost(id, data),
    onSuccess: (updatedPost) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', updatedPost.id] });
      message.success('Post actualizado exitosamente');
    },
    onError: (error: any) => {
      console.error('Update post error:', error);
      const errorMessage = error.response?.data?.message || 'Error al actualizar el post';
      message.error(errorMessage);
    },
  });
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => postService.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      message.success('Post eliminado exitosamente');
    },
    onError: (error: any) => {
      console.error('Delete post error:', error);
      const errorMessage = error.response?.data?.message || 'Error al eliminar el post';
      message.error(errorMessage);
    },
  });
};