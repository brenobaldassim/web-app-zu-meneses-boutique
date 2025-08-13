import type { DefaultToastOptions } from 'react-hot-toast';
import { theme } from './styles/theme';

const STORAGE_PREFIX = '@zmb-web-app';

export const StorageKeys = {
	TOKEN: `${STORAGE_PREFIX}:token`,
};

export const TOAST_OPTIONS: DefaultToastOptions = {
	style: {
		background: theme.colors.primaryContrast,
		color: theme.colors.primary,
		borderRadius: '10px',
		border: `2px solid ${theme.colors.primary}`,
	},
	iconTheme: {
		primary: theme.colors.primary,
		secondary: theme.colors.primaryContrast,
	},
	error: {
		style: {
			background: theme.colors.primaryContrast,
			color: theme.colors.alert,
			borderRadius: '10px',
			border: `2px solid ${theme.colors.alert}`,
		},
		iconTheme: {
			primary: theme.colors.alert,
			secondary: theme.colors.primaryContrast,
		},
	},
};
