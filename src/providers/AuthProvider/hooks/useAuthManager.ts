import { useState } from 'react';
import type { User } from '@/@types/User';
import type { UseAuthManagerReturn } from '../types';
import { StorageKeys } from '@/constants';
import { useLogin } from '@/modules/auth/Login/hooks/useLogin';
import type { LoginResponse } from '@/modules/auth/Login/types';
import { useSignUp } from '@/modules/auth/SignUp/hooks/useSignUp';
import type { SignUpResponse } from '@/modules/auth/SignUp/types';

export const useAuthManager = (): UseAuthManagerReturn => {
	const [user, setUser] = useState<User | null>(null);

	const { mutateAsync: loginMutation, isPending: isLoginLoading } = useLogin({
		onSuccess: onLoginSuccess,
		onError: onLoginError,
	});

	const { mutateAsync: signUpMutation, isPending: isSignUpLoading } = useSignUp({
		onSuccess: onSignUpSuccess,
		onError: onSignUpError,
	});

	const isUserLoading = isLoginLoading || isSignUpLoading;

	function onLoginSuccess(data: LoginResponse): void {
		localStorage.setItem(StorageKeys.TOKEN, data.token);
		setUser(data.user);
	}

	function onLoginError(error: unknown): void {
		alert(error);
	}

	function onSignUpSuccess(data: SignUpResponse): void {
		localStorage.setItem(StorageKeys.TOKEN, data.token);
		setUser(data.user);
	}

	function onSignUpError(error: unknown): void {
		alert(error);
	}

	async function handleLogin(email: string, password: string): Promise<void> {
		await loginMutation({ email, password });
	}

	async function handleSignUp(email: string, password: string, confirmPassword: string): Promise<void> {
		await signUpMutation({ email, password, confirmPassword });
	}

	function handleLogout(): void {
		localStorage.removeItem(StorageKeys.TOKEN);
		setUser(null);
	}

	return { user, isUserLoading, handleLogin, handleSignUp, handleLogout };
};
