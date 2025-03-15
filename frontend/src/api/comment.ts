import { Comment } from '../types';

import { apiClient } from './client';

const createComment = async (
	threadId: number,
	description: string,
	username: string | undefined
): Promise<Comment> => {
	const response = await apiClient.post(
		`/forum/thread/${threadId}/comment/create`,
		{
			description,
			username,
		}
	);
	return response.data;
};

const getComments = async (threadId: string | undefined) => {
	const response = await apiClient.get(`/forum/thread/${threadId}/comments`);
	return response.data;
};

export default { createComment, getComments };
