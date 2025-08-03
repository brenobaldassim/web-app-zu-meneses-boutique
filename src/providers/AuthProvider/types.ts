import type { User } from '@/@types/User';

export interface UseAuthManagerReturn {
	user: User | null;
	isUserLoading: boolean;
	handleLogin: (email: string, password: string) => Promise<void>;
	handleLogout: () => void;
}
