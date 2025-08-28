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
import toast from 'react-hot-toast';
import { getErrorData } from '@/shared/utils/getErrorData';
import { useNavigate } from 'react-router';

export const useAuthManager = (): UseAuthManagerReturn => {
	const [user, setUser] = useState<User | null>(null);
	const navigate = useNavigate();
	const asyncNavigate = async () => {
		await navigate('/');
	};

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
		enabled: !!localStorage.getItem(StorageKeys.TOKEN) && !user && !isLoginLoading && !isSignUpLoading,
	});

	const isUserLoading: boolean = isLoginLoading || isSignUpLoading || isUserProfileLoading;

	async function handleLogin(email: string, password: string): Promise<void> {
		await loginMutation({ email, password });
	}

	function onLoginSuccess(data: LoginResponse): void {
		localStorage.setItem(StorageKeys.TOKEN, data.token);
		setUser(data.user);
		asyncNavigate().catch((error) => {
			console.error(error);
		});
	}

	function onLoginError(error: AxiosError): void {
		const { message } = getErrorData(error.response);
		toast.error(message);
	}

	async function handleSignUp(email: string, password: string, confirmPassword: string): Promise<void> {
		await signUpMutation({ email, password, confirmPassword });
	}

	function onSignUpSuccess(data: SignUpResponse): void {
		localStorage.setItem(StorageKeys.TOKEN, data.token);
		setUser(data.user);
		asyncNavigate().catch((error) => {
			console.error(error);
		});
	}

	function onSignUpError(error: AxiosError): void {
		const { message } = getErrorData(error.response);
		toast.error(message);
	}

	function onLoadUserProfileSuccess(data: User): void {
		setUser(data);
	}

	function onLoadUserProfileError(error: AxiosError): void {
		const { message } = getErrorData(error.response);
		if (error.response?.status === 401) {
			handleLogout();
		}
		toast.error(message);
	}

	function handleLogout(): void {
		localStorage.removeItem(StorageKeys.TOKEN);
		setUser(null);
	}

	return { user, isUserLoading, handleLogin, handleSignUp, handleLogout };
};
