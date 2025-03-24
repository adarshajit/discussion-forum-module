import { ReactNode } from 'react';

export interface Author {
	username: string;
	bio?: string | null;
	role?: string;
	avatar_url: string;
}

export interface Comment {
	id: number;
	description: string;
	author: Author;
	created_at: string;
	updated_at: string;
}

export interface Thread {
	id: number;
	title: string;
	description: string;
	category: string;
	author: Author;
	created_at: string;
	updated_at: string;
}

export interface ThreadDetails {
	id: number;
	title: string;
	description: string;
	category: string;
	author: Author;
	upvotes: number;
	created_at: string;
	updated_at: string;
	comments: Comment[];
}

export interface AuthState {
	user: Author | null;
	isAuthenticated: boolean;
}

export type AuthAction =
	| { type: 'login'; payload: Author }
	| { type: 'logout' };

export interface AuthContextType {
	user: AuthState['user'];
	isAuthenticated: boolean;
	login: (username: string, password: string) => void;
	logout: () => void;
}

export interface AuthProviderProps {
	children: ReactNode;
}

export interface Notification {
	id: number;
	title: string;
	description: string;
}
