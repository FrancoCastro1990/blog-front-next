export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    ME: '/api/auth/me',
  },
  
  // Posts endpoints
  POSTS: {
    BASE: '/api/posts',
    BY_ID: (id: string) => `/api/posts/${id}`,
    CREATE: '/api/posts',
    UPDATE: (id: string) => `/api/posts/${id}`,
    DELETE: (id: string) => `/api/posts/${id}`,
  },
  
  // Utility endpoints
  HEALTH: '/health',
  ROOT: '/',
} as const;