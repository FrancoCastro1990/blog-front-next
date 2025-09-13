import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import {
  Post,
  CreatePostRequest,
  UpdatePostRequest,
  PostFilters,
} from '@/types';

export const postService = {
  async getPosts(filters?: PostFilters): Promise<Post[]> {
    const response = await apiClient.get<Post[]>(API_ENDPOINTS.POSTS.BASE, {
      params: filters,
    });
    return response.data;
  },

  async getPost(id: string): Promise<Post> {
    const response = await apiClient.get<Post>(API_ENDPOINTS.POSTS.BY_ID(id));
    return response.data;
  },

  async createPost(data: CreatePostRequest): Promise<Post> {
    const response = await apiClient.post<Post>(API_ENDPOINTS.POSTS.CREATE, data);
    return response.data;
  },

  async updatePost(id: string, data: UpdatePostRequest): Promise<Post> {
    const response = await apiClient.put<Post>(
      API_ENDPOINTS.POSTS.UPDATE(id),
      data
    );
    return response.data;
  },

  async deletePost(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.POSTS.DELETE(id));
  },
};