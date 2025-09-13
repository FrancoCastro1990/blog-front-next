export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  author: string;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  author?: string;
}

export interface PostFilters {
  status?: 'published' | 'draft';
  orderBy?: 'createdAt' | 'updatedAt' | 'title';
  order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}