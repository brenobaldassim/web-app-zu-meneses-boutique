import type { ErrorDataResponse } from '@/@types/Error';
import type { AxiosError } from 'axios';

export const getErrorData = (response: AxiosError['response'] | undefined): ErrorDataResponse => {
	const data = response?.data as ErrorDataResponse;
	return {
		message: data.message || 'Something went wrong, please try again',
		statusCorde: data.statusCorde,
	};
};
