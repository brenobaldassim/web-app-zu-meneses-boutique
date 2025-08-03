import { z } from 'zod';

export const signUpSchema = z
	.object({
		email: z.email('Email deve ter um formato válido'),
		password: z.string().min(4, 'Senha deve ter pelo menos 4 caracteres'),
		confirmPassword: z.string().min(4, 'Confirmação de senha deve ter pelo menos 4 caracteres'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Senhas não conferem',
		path: ['confirmPassword'],
	});
