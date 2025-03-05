import { Comment } from '../types';

import { apiClient } from './client';

const createComment = async (
	threadId: number,
	description: string
): Promise<Comment> => {
	const response = await apiClient.post(`/thread/${threadId}/comment/create`, {
		description,
	});
	return response.data;
};

export default { createComment };
