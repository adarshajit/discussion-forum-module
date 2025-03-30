import { useEffect, useState } from 'react';
import { Thread } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { useDiscussions } from '../../hooks/useDiscussions';
import DiscussionItem from './DiscussionItem';
import Loader from '../Loader';
import Search from '../Search';
import Error from '../../pages/Error';

const DiscussionList = () => {
	const { data: threads = [], isLoading, error } = useDiscussions();
	const [filteredThreads, setFilteredThreads] = useState<Thread[]>([]);
	const { user } = useAuth();

	useEffect(() => {
		setFilteredThreads(threads);
	}, [threads]);
	

	const handleSearch = (results: Thread[]) => {
		setFilteredThreads(results);
	};

	if (isLoading) {
		return (
			<div className='w-1/2'>
				<Loader message='Hang tight, fetching all the discussions for you! 😊' />
			</div>
		);
	}

	if (error) {
		return <Error message="Failed to load discussions. Please try again later" />;
	}

	return (
		<div className='p-10 w-1/2 h-full'>
			<p className='text-3xl font-bold'>Welcome back, {user?.username} ✨</p>
			<Search threads={threads} onSearch={handleSearch} />
			{filteredThreads.length === 0 && (
				<p className='text-2xl font-bold text-gray-400 mt-10 text-center h-screen'>
					The thread you're looking for does not exist! 👀
				</p>
			)}
			<ul className='list bg-base-100 rounded-box shadow-md w-full'>
				{filteredThreads.map((thread) => (
					<DiscussionItem thread={thread} key={thread.id}/>
				))}
			</ul>
		</div>
	);
};

export default DiscussionList;
