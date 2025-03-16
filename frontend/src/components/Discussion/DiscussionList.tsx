import { useEffect, useState } from 'react';
import { Thread } from '../../types';
import DiscussionApi from '../../api/discussion';
import DiscussionItem from './DiscussionItem';
import Loader from '../Loader';
import Search from '../Search';
import { useAuth } from '../../hooks/useAuth';

const DiscussionList = () => {
	const [threads, setThreads] = useState<Thread[]>([]);
	const [filteredThreads, setFilteredThreads] = useState<Thread[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const { user } = useAuth();

	useEffect(() => {
		const fetchThreads = async () => {
			try {
				setLoading(true);
				const data = await DiscussionApi.getThreads();
				setThreads(data);
				setFilteredThreads(data);
			} catch (error) {
				console.error('Error:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchThreads();
	}, []);

	const handleSearch = (results: Thread[]) => {
		setFilteredThreads(results);
	};

	if (loading) {
		return (
			<div className='w-1/2'>
				<Loader message='Hang tight, fetching all the discussions for you! 😊' />
			</div>
		);
	}

	return (
		<div className='p-10 w-1/2 h-full'>
			<p className='text-3xl font-bold'>Welcome back, {user?.username} ✨</p>
			<Search threads={threads} onSearch={handleSearch} />
			{filteredThreads.length === 0 && (
				<p className='text-2xl font-bold text-gray-400 mt-10 text-center'>The thread you're looking for does not exist! 👀</p>
			)}
			<ul className='list bg-base-100 rounded-box shadow-md'>
				{filteredThreads.map((thread: Thread) => (
					<div className='w-full' key={thread.id}>
						<DiscussionItem thread={thread} />
					</div>
				))}
			</ul>
		</div>
	);
};

export default DiscussionList;
