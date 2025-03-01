import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import CreateComments from './CreateComments';
import Comments from './Comments';

interface Thread {
	id: number;
	title: string;
	description: string;
	category: string;
	author: string;
	upvotes: number;
	created_at: string;
	updated_at: string;
	comments: any[];
}

const DiscussionDetails = () => {
	const { id } = useParams();
	const [thread, setThread] = useState<Thread | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchThreadDetails = async () => {
			try {
				const response = await fetch(`http://localhost:8000/forum/thread/${id}`);
				if (!response.ok) {
					throw new Error('Thread not found');
				}
				const data = await response.json();
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
		return (
			<div className='flex justify-center items-center h-screen'>Loading...</div>
		);
	if (error) return <div className='text-error p-4'>{error}</div>;
	if (!thread) return <div className='text-error p-4'>Thread not found</div>;

	return (
		<div className='py-16 px-32 flex flex-col gap-3'>
			<h1 className='text-4xl font-semibold'>{thread.title}</h1>
			<Link to='/' className='text-violet-600'>
				Back to Home Feed
			</Link>

			<div className='flex gap-8 pt-10 w-full'>
				<img
					className='size-16 rounded-box'
					src='https://img.daisyui.com/images/profile/demo/1@94.webp'
					alt={thread.author}
				/>
				<div className='flex flex-col'>
					<div className='flex flex-col gap-2 font-bold'>
						<span className='text-lg'>{thread.author}</span>
						<span className='text-sm text-gray-500'>
							Posted on {new Date(thread.created_at).toLocaleDateString()}
						</span>
					</div>

					<p className='pt-3'>{thread.description}</p>

					<div className='flex gap-3'>
						<button className='btn btn-square btn-ghost'>
							{thread.upvotes}
							<svg
								className='size-[1.2em]'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
							>
								<g
									strokeLinejoin='round'
									strokeLinecap='round'
									strokeWidth='2'
									fill='none'
									stroke='currentColor'
								>
									<path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'></path>
								</g>
							</svg>
						</button>
					</div>
				</div>
			</div>

      <CreateComments thread={thread}/>
      <Comments comments={thread.comments}/>
		</div>
	);
};

export default DiscussionDetails;
