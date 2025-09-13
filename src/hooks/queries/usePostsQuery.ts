import { useQuery } from '@tanstack/react-query';
import { postService } from '@/lib/api/services/postService';
import { PostFilters } from '@/types';

export const usePostsQuery = (filters?: PostFilters) => {
  return useQuery({
    queryKey: ['posts', filters],
    queryFn: () => postService.getPosts(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
  });
};

export const usePostQuery = (id: string) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => postService.getPost(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};