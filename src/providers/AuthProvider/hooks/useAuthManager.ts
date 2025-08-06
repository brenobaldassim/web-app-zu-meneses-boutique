import { useState } from 'react';
import type { User } from '@/@types/User';
import type { UseAuthManagerReturn } from '../types';
import { StorageKeys } from '@/shared/constants';
import { useLogin } from '@/modules/auth/Login/hooks/useLogin';
import type { LoginResponse } from '@/modules/auth/Login/types';
import { useSignUp } from '@/modules/auth/SignUp/hooks/useSignUp';
import type { SignUpResponse } from '@/modules/auth/SignUp/types';
import { useGetUserProfile } from '@/shared/hooks/useGetUserProfile';
import { AxiosError } from 'axios';

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

	const { isLoading: isUserProfileLoading } = useGetUserProfile({
		onSuccess: onLoadUserProfileSuccess,
		onError: onLoadUserProfileError,
		enabled: !!localStorage.getItem(StorageKeys.TOKEN) && !user,
	});

	const isUserLoading: boolean = isLoginLoading || isSignUpLoading || isUserProfileLoading;

	async function handleLogin(email: string, password: string): Promise<void> {
		await loginMutation({ email, password });
	}

	function onLoginSuccess(data: LoginResponse): void {
		localStorage.setItem(StorageKeys.TOKEN, data.token);
		setUser(data.user);
	}

	function onLoginError(error: unknown): void {
		alert(error);
	}

	async function handleSignUp(email: string, password: string, confirmPassword: string): Promise<void> {
		await signUpMutation({ email, password, confirmPassword });
	}

	function onSignUpSuccess(data: SignUpResponse): void {
		localStorage.setItem(StorageKeys.TOKEN, data.token);
		setUser(data.user);
	}

	function onSignUpError(error: unknown): void {
		alert(error);
	}

	function onLoadUserProfileSuccess(data: User): void {
		setUser(data);
	}

	function onLoadUserProfileError(error: unknown): void {
		if (error instanceof AxiosError && error.response?.status === 401) {
			handleLogout();
		}
	}

	function handleLogout(): void {
		localStorage.removeItem(StorageKeys.TOKEN);
		setUser(null);
	}

	return { user, isUserLoading, handleLogin, handleSignUp, handleLogout };
};
