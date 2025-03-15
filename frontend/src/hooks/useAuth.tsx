import { createContext, useContext } from 'react';
import { AuthContextType } from '../types';

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("AuthContext was used outside AuthProvider");
  }

  return context;
};