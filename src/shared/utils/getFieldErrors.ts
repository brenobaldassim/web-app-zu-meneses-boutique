import type { ZodError } from 'zod';

export function getFieldErrors<T extends Record<string, string>>(
	error: ZodError<T>,
): Partial<Record<keyof T, string[]>> {
	const fieldErrors: Record<string, string[]> = {};

	error.issues.forEach((issue) => {
		const field = issue.path[0] as string;
		if (!fieldErrors[field]) {
			fieldErrors[field] = [];
		}
		fieldErrors[field].push(issue.message);
	});

	return fieldErrors as Partial<Record<keyof T, string[]>>;
}
