import { loginSchema } from '../schemas';

export const validateLoginForm = (formData: FormData) => {
	const data = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	};

	return { validationResult: loginSchema.safeParse(data), data };
};
