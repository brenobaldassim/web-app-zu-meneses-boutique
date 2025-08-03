import type { DefaultLoginActionState } from '@/@types/Form';
import type { User } from '@/@types/User';
import type { z } from 'zod';
import type { signUpSchema } from './schemas';

export type SignUpFormData = z.infer<typeof signUpSchema>;

export type SignUpResponse = {
	user: User;
	token: string;
};

export interface SignUpActionState extends DefaultLoginActionState {
	errors?: {
		email?: string[];
		password?: string[];
		confirmPassword?: string[];
		_form?: string[];
	};
	success?: boolean;
	data?: Partial<SignUpFormData>;
}
