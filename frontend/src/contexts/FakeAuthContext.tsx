import { useEffect, useReducer } from 'react';
import { AuthAction, AuthProviderProps, AuthState } from '../types';
import { AuthContext } from '../hooks/useAuth';

const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
};

const reducer = (state: AuthState, action: AuthAction) => {
	switch (action.type) {
		case 'login':
      console.log(action.payload)
			return { ...state, user: action.payload, isAuthenticated: true };
		case 'logout':
			return { ...state, user: null, isAuthenticated: false };
		default:
			throw new Error('Unknown action');
	}
};

const FAKE_USER = {
	username: 'john_doe',
	bio: 'I love to code and occassionaly sip coffee! ☕️',
	password: 'test123',
  avatarUrl: 'https://api.dicebear.com/5.x/open-peeps/svg?head=hatHip&face=smile&accessoriesProbability=100&accessories=glasses&skinColor=edb98a&clothingColor=fdea6b&backgroundColor=c0aede&'
};

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [{ user, isAuthenticated }, dispatch] = useReducer(
		reducer,
		initialState
	);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch({ type: 'login', payload: JSON.parse(storedUser) });
    }
  }, []);

	const login = (username: string, password: string) => {
		if (username === FAKE_USER.username && password === FAKE_USER.password) {
      localStorage.setItem('user', JSON.stringify(FAKE_USER));
			dispatch({ type: 'login', payload: FAKE_USER });
		}
	};

	const logout = () => {
    localStorage.removeItem('user');
		dispatch({ type: 'logout' });
	};

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthProvider };
