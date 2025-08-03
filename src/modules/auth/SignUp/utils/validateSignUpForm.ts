import { signUpSchema } from '../schemas';

export const validateSignUpForm = (formData: FormData) => {
	const data = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
		confirmPassword: formData.get('confirmPassword') as string,
	};

	return { validationResult: signUpSchema.safeParse(data), data };
};
