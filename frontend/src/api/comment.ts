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

const getComments = async (threadId: string | undefined) => {
	const response = await apiClient.get(`/thread/${threadId}/comments`);
	return response.data;
};

export default { createComment, getComments };
