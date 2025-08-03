import type { DefaultLoginActionState } from '@/@types/Form';
import type { User } from '@/@types/User';
import type { z } from 'zod';
import type { loginSchema } from './schemas';

export type LoginFormData = z.infer<typeof loginSchema>;

export type LoginResponse = {
	user: User;
	token: string;
};

export interface LoginActionState extends DefaultLoginActionState {
	errors?: {
		email?: string[];
		password?: string[];
		_form?: string[];
	};
	success?: boolean;
	data?: Partial<LoginFormData>;
}
