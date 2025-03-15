import { apiClient } from './client';

interface User {
	username: string;
	bio: string;
	role: string;
	avatar_url: string;
}

interface LoginResponse {
	message: string;
	access: string;
	refresh: string;
	user: User;
}

export const login = async (
	username: string,
	password: string
): Promise<LoginResponse> => {
	const response = await apiClient.post('/author/login', {
		username,
		password,
	});
	return response.data;
};

export const logout = async () => {
	try {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
	} catch (error) {
		console.error('Logout error:', error);
		throw error;
	}
};
