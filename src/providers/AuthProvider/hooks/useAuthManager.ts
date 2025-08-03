import { useState } from 'react';
import type { User } from '@/@types/User';
import type { UseAuthManagerReturn } from '../types';
import { StorageKeys } from '@/constants';
import { useLogin } from '@/modules/auth/Login/hooks/useLogin';
import type { LoginResponse } from '@/modules/auth/Login/types';

export const useAuthManager = (): UseAuthManagerReturn => {
	const [user, setUser] = useState<User | null>(null);

	const { mutateAsync: loginMutation, isPending: isUserLoading } = useLogin({
		onSuccess: onLoginSuccess,
		onError: onLoginError,
	});

	function onLoginSuccess(data: LoginResponse): void {
		localStorage.setItem(StorageKeys.TOKEN, data.token);
		setUser(data.user);
	}

	function onLoginError(error: unknown): void {
		alert(error);
	}

	async function handleLogin(email: string, password: string): Promise<void> {
		await loginMutation({ email, password });
	}

	function handleLogout(): void {
		localStorage.removeItem(StorageKeys.TOKEN);
		setUser(null);
	}

	return { user, isUserLoading, handleLogin, handleLogout };
};
