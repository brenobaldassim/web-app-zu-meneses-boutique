/**
 * Environment configuration
 * Centralized access to environment variables with type safety
 */

// Helper function to get required env variable
const getRequired = (key: string, value: string | undefined): string => {
	if (!value) {
		throw new Error(`Environment variable ${key} is required but not defined`);
	}
	return value;
};

export const env = {
	API_URL: getRequired('VITE_API_URL', import.meta.env.VITE_API_URL),
	APP_ENVIRONMENT: getRequired('VITE_APP_ENVIRONMENT', import.meta.env.VITE_APP_ENVIRONMENT),
} as const;

export type EnvConfig = typeof env;
