import { useMutation } from '@/services/query/hooks/useMutation';
import type { SignUpFormData, SignUpResponse } from '../types';
import { api } from '@/services/api';

interface UseSignUpProps {
	onSuccess: (data: SignUpResponse) => void;
	onError: (error: unknown, variables: SignUpFormData, context: unknown) => void;
}

export const useSignUp = ({ onSuccess, onError }: UseSignUpProps) => {
	return useMutation({
		mutationFn: async (data: SignUpFormData): Promise<SignUpResponse> => {
			const response = await api.post<SignUpResponse>('/auth', data);
			return response.data;
		},
		onSuccess,
		onError,
	});
};
