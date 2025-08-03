import type { User } from '@/@types/User';

export interface UseAuthManagerReturn {
	user: User | null;
	isUserLoading: boolean;
	handleLogin: (email: string, password: string) => Promise<void>;
	handleSignUp: (email: string, password: string, confirmPassword: string) => Promise<void>;
	handleLogout: () => void;
}
