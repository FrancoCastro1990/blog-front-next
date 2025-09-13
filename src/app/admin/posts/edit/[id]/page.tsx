'use client';

import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import PostForm from '@/components/admin/PostForm';
import { usePostQuery } from '@/hooks/queries/usePostsQuery';
import { useUpdatePostMutation } from '@/hooks/mutations/usePostMutations';
import { UpdatePostRequest } from '@/types';
import Loading from '@/components/common/Loading';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const { data: post, isLoading, error } = usePostQuery(postId);
  const updatePostMutation = useUpdatePostMutation();

  const handleSubmit = async (values: UpdatePostRequest) => {
    try {
      await updatePostMutation.mutateAsync({ id: postId, data: values });
      router.push('/admin/posts');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (isLoading) {
    return <Loading message="Cargando post..." />;
  }

  if (error) {
    return (
      <div className="error-message">
        Error al cargar el post: {error.message}
      </div>
    );
  }

  if (!post) {
    return (
      <div className="error-message">
        Post no encontrado
      </div>
    );
  }

  return (
    <PostForm
      title="Editar Post"
      initialValues={post}
      onSubmit={handleSubmit}
      isLoading={updatePostMutation.isPending}
    />
  );
}