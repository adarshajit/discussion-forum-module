import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ThreadDetails } from '../types';

import CreateComments from '../components/Comment/CreateComments';
import CommentsList from '../components/Comment/CommentsList';
import discussionApi from '../api/discussion';
import Loader from '../components/Loader';
import { DEFAULT_PROFILE_IMAGE_URL } from '../utils/constants';

const DiscussionDetails = () => {
	const { id } = useParams();
	const [thread, setThread] = useState<ThreadDetails | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchThreadDetails = async () => {
			try {
				const data = await discussionApi.getThreadDetails(id)
				setThread(data);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : 'Failed to fetch thread details'
				);
			} finally {
				setLoading(false);
			}
		};

		fetchThreadDetails();
	}, [id]);

	if (loading)
		return <Loader message='Fetching....'/>

	if (error) return <div className='text-error p-4'>{error}</div>;
	if (!thread) return <div className='text-error p-4'>Thread not found</div>;

	return (
		<div className='py-16 px-32 flex flex-col gap-3'>
			<h1 className='text-4xl font-bold'>{thread.title}</h1>
				<p>Category: {thread.category.toUpperCase()}</p>
				<Link to='/' className='text-violet-600'>
					Back to Home Feed
				</Link>

			<div className='flex gap-8 pt-10 w-full'>
				<img
					className='size-16 rounded-box'
					src={thread.author.avatar_url ?? DEFAULT_PROFILE_IMAGE_URL}
					alt={thread.author.username}
				/>
				<div className='flex flex-col'>
					<div className='flex flex-col gap-2 font-bold'>
						<Link to="/profile" className='text-xl'>{thread.author.username}</Link>
						<span className='text-md text-gray-500'>
							Posted on {new Date(thread.created_at).toLocaleDateString()}
						</span>
					</div>

					<p className='pt-3 text-xl'>{thread.description}</p>

				</div>
			</div>

      <CreateComments thread={thread}/>
      <CommentsList threadId={id}/>
		</div>
	);
};

export default DiscussionDetails;
