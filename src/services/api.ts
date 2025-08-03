import axios from 'axios';
import { env } from '@/config/env';
import { StorageKeys } from '@/constants';

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
