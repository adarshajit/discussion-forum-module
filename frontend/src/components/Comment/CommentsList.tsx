import { useEffect, useState } from 'react';
import { Comment } from '../../types';
import CommentItem from './CommentItem';
import commentApi from '../../api/comment';
import Loader from '../Loader';

const CommentsList = ({ threadId }: { threadId: string | undefined }) => {
	const [comments, setComments] = useState<Comment[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchThreadComments = async () => {
			try {
				const data = await commentApi.getComments(threadId);
				setComments(data.comments);
			} catch (err) {
				throw new Error("Failed to fetch thread comments!" + err)
			} finally {
				setLoading(false);
			}
		};

		fetchThreadComments();
	}, [threadId]);

	if (loading) return <Loader message='Fetching comments...' />;

	return (
		<>
			<p className='mt-10 text-2xl font-bold'>{comments.length} Comments</p>
			{!comments.length && (
				<p className='mt-10 text-2xl text-gray-500 font-bold'>
					No comments yet. Share your thoughts!
				</p>
			)}
			<ul className='list w-full bg-base-100 rounded-box shadow-md'>
				{comments.map((comment: Comment) => (
					<CommentItem key={comment.id} comment={comment} />
				))}
			</ul>
		</>
	);
};

export default CommentsList;
