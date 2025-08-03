import type { User } from '@/@types/User';
import { api } from '@/services/api';
import { useQuery } from '@/services/query/hooks/useQuery';
import type { UseQueryResult } from '@/services/query/types';

interface UseGetUserProfileProps {
	onSuccess: (data: User) => void;
	onError?: (error: unknown) => void;
	enabled?: boolean;
}

export const useGetUserProfile = ({
	onSuccess,
	onError,
	enabled = true,
}: UseGetUserProfileProps): UseQueryResult<User> => {
	return useQuery({
		queryKey: 'user-profile',
		queryFn: async () => {
			const response = await api.get<User>('/auth/profile');
			return response.data;
		},
		onSuccess,
		onError: onError ?? (() => {}),
		enabled,
	});
};
