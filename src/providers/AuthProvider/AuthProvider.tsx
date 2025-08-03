import React from 'react';
import { useAuthManager } from './hooks/useAuthManager';
import { createContext } from 'react';
import type { UseAuthManagerReturn } from './types';

const AuthContext = createContext<UseAuthManagerReturn | null>(null);

interface AuthContextProviderProps {
	children: React.ReactNode;
}
const AuthProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
	const manager = useAuthManager();
	return <AuthContext.Provider value={manager}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
