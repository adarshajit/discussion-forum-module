import { useEffect, useReducer, useState } from 'react';
import { AuthAction, AuthProviderProps, AuthState } from '../types';
import { AuthContext } from '../hooks/useAuth';
import * as authApi from '../api/authentication';
import Loader from '../components/Loader';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const reducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'logout':
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error('Unknown action');
  }
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      dispatch({ type: 'login', payload: JSON.parse(storedUser) });
    }
    setLoading(false); // Set loading to false after initialization
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await authApi.login(username, password);
      
      localStorage.setItem('token', response.access);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      dispatch({ type: 'login', payload: response.user });
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      dispatch({ type: 'logout' });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return <Loader message='Loading...'/>
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };