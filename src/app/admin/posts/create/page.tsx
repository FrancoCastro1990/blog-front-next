'use client';

import { useRouter } from 'next/navigation';
import PostForm from '@/components/admin/PostForm';
import { useCreatePostMutation } from '@/hooks/mutations/usePostMutations';
import { CreatePostRequest } from '@/types';

export default function CreatePostPage() {
  const router = useRouter();
  const createPostMutation = useCreatePostMutation();

  const handleSubmit = async (values: CreatePostRequest) => {
    try {
      await createPostMutation.mutateAsync(values);
      router.push('/admin/posts');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <PostForm
      title="Crear Nuevo Post"
      onSubmit={handleSubmit}
      isLoading={createPostMutation.isPending}
    />
  );
}