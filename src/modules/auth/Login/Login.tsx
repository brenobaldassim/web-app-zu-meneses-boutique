import '@/App.css';
import { useAuth } from '@/providers/AuthProvider/hooks/useAuth';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { validateLoginForm } from './utils/validateLoginForm';
import { FormInput } from '@/shared/components/Form/FormInput';
import { getFieldErrors } from '@/shared/utils/getFieldErrors';
import type { LoginActionState, LoginFormData } from './types';
import { FormSubmitButton } from '@/shared/components/Form/FormSubmitButton/FormSubmitButton';
import { LogInIcon } from 'lucide-react';

export function Login() {
	const { handleLogin, isUserLoading } = useAuth();
	const [form, formAction] = useActionState(handleLoginAction, { errors: {}, success: false });
	const { pending } = useFormStatus();

	const passwordError = form.errors?.password?.[0];
	const emailError = form.errors?.email?.[0];

	async function handleLoginAction(_: LoginActionState, formData: FormData): Promise<LoginActionState> {
		const { validationResult, data } = validateLoginForm(formData);

		if (validationResult.success) {
			await handleLogin(data.email, data.password);

			return {
				success: true,
				errors: undefined,
				data,
			};
		}

		const fieldErrors = getFieldErrors<LoginFormData>(validationResult.error);

		return {
			errors: fieldErrors,
			success: false,
			data,
		};
	}

	return (
		<div className='flex flex-col items-center justify-center h-screen '>
			<form
				id='login-form'
				action={formAction}
				className='flex flex-col items-center justify-center h-120  w-90 md:w-120 p-4 gap-4 '
			>
				<h1 className='text-2xl font-bold text-primary-contrast flex items-center gap-2'>
					<LogInIcon className='text-primary-contrast' strokeWidth={3} size={28} /> Login
				</h1>
				<FormInput type='text' name='email' placeholder='Email' error={emailError} defaultValue={form.data?.email} />
				<FormInput
					type='password'
					name='password'
					placeholder='Senha'
					error={passwordError}
					defaultValue={form.data?.password}
				/>
				<FormSubmitButton disabled={pending || isUserLoading} loading={isUserLoading} />
			</form>
		</div>
	);
}
