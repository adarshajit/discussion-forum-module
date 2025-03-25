import { useQuery } from '@tanstack/react-query';
import commentApi from '../api/comment';
import { Comment } from '../types';

export const useComments = (threadId: string | undefined) => {
	return useQuery<Comment[], Error>({
		queryKey: ['comments', threadId],
		queryFn: () => commentApi.getComments(threadId),
		enabled: !!threadId,
		retry: false,
	});
};
