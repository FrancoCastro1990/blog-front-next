export const APP_CONFIG = {
  name: 'Mi Blog Personal',
  description: 'Blog personal desarrollado con Next.js 15 y Ant Design',
  version: '1.0.0',
  author: 'Blog Admin',
} as const;

export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  timeout: 10000,
  retries: 3,
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
} as const;

export const PERMISSIONS = {
  READ_POSTS: 'READ_POSTS',
  CREATE_POSTS: 'CREATE_POSTS',
  UPDATE_POSTS: 'UPDATE_POSTS',
  DELETE_POSTS: 'DELETE_POSTS',
  ADMIN: 'ADMIN',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  ADMIN: '/admin',
  ADMIN_POSTS: '/admin/posts',
  ADMIN_CREATE_POST: '/admin/posts/create',
  ADMIN_EDIT_POST: (id: string) => `/admin/posts/edit/${id}`,
  POST_DETAIL: (id: string) => `/posts/${id}`,
} as const;

export const QUERY_KEYS = {
  POSTS: 'posts',
  POST: 'post',
  USER: 'user',
} as const;