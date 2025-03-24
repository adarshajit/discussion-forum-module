import { apiClient } from './client';
import { Notification } from '../types';

const getNotifications = async (): Promise<Notification[]> => {
	const response = await apiClient.get(`/notifications/show-all`);
	return response.data;
};

export default { getNotifications };
