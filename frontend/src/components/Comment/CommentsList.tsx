import { Comment } from '../../types';
import CommentItem from './CommentItem';
import Loader from '../Loader';
import Error from '../../pages/Error';
import { useComments } from '../../hooks/useComments';

const CommentsList = ({ threadId }: { threadId: string | undefined }) => {
  const { data: comments, isLoading, error } = useComments(threadId);

  if (isLoading) {
    return <Loader message="Fetching comments..." />;
  }

  if (error instanceof Error) {
    return <Error message={`Failed to load comments: ${error.message}`} />;
  }

  if (!comments || comments.length === 0) {
    return (
      <p className="mt-10 text-2xl text-gray-500 font-bold">
        No comments yet. Share your thoughts!
      </p>
    );
  }

  return (
    <>
      <p className="mt-10 text-2xl font-bold">{comments.length} Comments</p>
      <ul className="list w-full bg-base-100 rounded-box shadow-md">
        {comments.map((comment: Comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </ul>
    </>
  );
};

export default CommentsList;
