import { useQuery } from '@tanstack/react-query';
import DiscussionApi from '../api/discussion';
import { Thread } from '../types';

export const useDiscussions = () => {
	return useQuery<Thread[]>({
		queryKey: ['discussions'],
		queryFn: DiscussionApi.getThreads,
		staleTime: 1000 * 60 * 5, // Cache discussions for 5 minutes
	});
};
