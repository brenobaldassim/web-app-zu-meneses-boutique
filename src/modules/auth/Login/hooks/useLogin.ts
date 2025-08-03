import { useMutation } from '@/services/query/hooks/useMutation';
import type { LoginFormData, LoginResponse } from '../types';
import { api } from '@/services/api';

interface UseLoginProps {
	onSuccess: (data: LoginResponse) => void;
	onError: (error: unknown, variables: LoginFormData, context: unknown) => void;
}

export const useLogin = ({ onSuccess, onError }: UseLoginProps) => {
	return useMutation({
		mutationFn: async (data: LoginFormData): Promise<LoginResponse> => {
			const response = await api.post<LoginResponse>('/auth/login', data);
			return response.data;
		},
		onSuccess,
		onError,
	});
};
