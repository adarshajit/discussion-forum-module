import { useQuery } from '@tanstack/react-query';
import discussionApi from '../api/discussion';
import { ThreadDetails } from '../types';

export const useDiscussionDetails = (id: string | undefined) => {
	return useQuery<ThreadDetails, Error>({
		queryKey: ['threadDetails', id],
		queryFn: () => discussionApi.getThreadDetails(id),
		enabled: !!id,
	});
};
