import { Thread, ThreadDetails } from '../types';

import { apiClient } from './client';

const createThread = async (threadData: object) => {
	const response = await apiClient.post('/forum/thread/create', threadData);
	return response.data;
};

const getThreads = async (): Promise<Thread[]> => {
	const response = await apiClient.get('/forum/threads/');
	return response.data;
};

const getThreadDetails = async (
	threadId: string | undefined
): Promise<ThreadDetails> => {
	const response = await apiClient.get(`/forum/thread/${threadId}`);
	return response.data;
};

export default { createThread, getThreads, getThreadDetails };
