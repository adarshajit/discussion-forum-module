import { Thread, ThreadDetails } from '../types';

import { apiClient } from './client';

const getThreads = async (): Promise<Thread[]> => {
	const response = await apiClient.get('/threads/');
	return response.data;
};

const getThreadDetails = async (
	threadId: string | undefined
): Promise<ThreadDetails> => {
	const response = await apiClient.get(`/thread/${threadId}`);
	return response.data;
};

export default { getThreads, getThreadDetails };
