import type { ToastOptions } from 'react-hot-toast';
import { theme } from './styles/theme';

const STORAGE_PREFIX = '@zmb-web-app';

export const StorageKeys = {
	TOKEN: `${STORAGE_PREFIX}:token`,
};

export const TOAST_OPTIONS: ToastOptions = {
	style: {
		background: theme.colors.primaryContrast,
		color: theme.colors.primary,
	},
	iconTheme: {
		primary: theme.colors.primary,
		secondary: theme.colors.primaryContrast,
	},
};
