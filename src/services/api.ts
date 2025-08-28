import axios, { AxiosError } from 'axios';
import { env } from '@/config/env';
import { StorageKeys } from '@/shared/constants';

export const api = axios.create({
	baseURL: env.API_URL,
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem(StorageKeys.TOKEN);
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		if (
			error.response?.status === 401 &&
			error.config?.url &&
			!error.config.url.includes('/auth/login') &&
			!error.config.url.includes('/auth/signup')
		) {
			localStorage.removeItem(StorageKeys.TOKEN);

			if (error.response?.data) {
				(error.response.data as Error).message = 'Session expired, please login again';
			}
		}
		return Promise.reject(error);
	},
);
