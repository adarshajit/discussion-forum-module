import { Link, useParams } from 'react-router';
import { DEFAULT_PROFILE_IMAGE_URL } from '../utils/constants';
import { useDiscussionDetails } from '../hooks/useDiscussionDetails';
import Loader from '../components/Loader';
import CreateComments from '../components/Comment/CreateComments';
import CommentsList from '../components/Comment/CommentsList';
import Error from './Error';

const DiscussionDetails = () => {
	const { id } = useParams();
	const { data: thread, isLoading, isError, error } = useDiscussionDetails(id);

	if (isLoading) {
		return <Loader message='Fetching thread details...' />;
	}

	if (isError) {
		const errorMessage =
			error instanceof Error ? error.message : 'Failed to fetch thread details';
		return <Error message={errorMessage} />;
	}

	if (!thread) {
		return <div className='text-error p-4'>Thread not found</div>;
	}

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
						<Link to='/profile' className='text-xl'>
							{thread.author.username}
						</Link>
						<span className='text-md text-gray-500'>
							Posted on {new Date(thread.created_at).toLocaleDateString()}
						</span>
					</div>

					<p className='pt-3 text-xl'>{thread.description}</p>
				</div>
			</div>

			<CreateComments thread={thread} />
			<CommentsList threadId={id} />
		</div>
	);
};

export default DiscussionDetails;
