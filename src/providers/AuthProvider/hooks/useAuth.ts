import { useContext } from 'react';
import type { UseAuthManagerReturn } from '../types';
import { AuthContext } from '../AuthProvider';

export const useAuth = (): UseAuthManagerReturn => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
