import axios from 'axios';

export const apiClient = axios.create({
	baseURL: 'https://discussion-forum-module.onrender.com/forum',
	headers: {
		'Content-Type': 'application/json',
	},
});
