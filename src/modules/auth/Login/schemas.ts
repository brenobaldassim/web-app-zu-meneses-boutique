import { z } from 'zod';

export const loginSchema = z.object({
	email: z.email('Email deve ter um formato válido'),
	password: z.string().min(4, 'Senha deve ter pelo menos 4 caracteres'),
});
