import '@/App.css';
import { useAuth } from '@/providers/AuthProvider/hooks/useAuth';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { validateSignUpForm } from './utils/validateSignUpForm';
import { FormInput } from '@/shared/components/Form/FormInput';
import { getFieldErrors } from '@/shared/utils/getFieldErrors';
import type { SignUpActionState, SignUpFormData } from './types';
import { FormSubmitButton } from '@/shared/components/Form/FormSubmitButton/FormSubmitButton';
import { UserPlusIcon } from 'lucide-react';

export function SignUp() {
	const { handleSignUp, isUserLoading } = useAuth();
	const [form, formAction] = useActionState(handleSignUpAction, { errors: {}, success: false });
	const { pending } = useFormStatus();

	const emailError = form.errors?.email?.[0];
	const passwordError = form.errors?.password?.[0];
	const confirmPasswordError = form.errors?.confirmPassword?.[0];

	async function handleSignUpAction(_: SignUpActionState, formData: FormData): Promise<SignUpActionState> {
		const { validationResult, data } = validateSignUpForm(formData);

		if (validationResult.success) {
			await handleSignUp(data.email, data.password, data.confirmPassword);

			return {
				success: true,
				errors: undefined,
				data,
			};
		}

		const fieldErrors = getFieldErrors<SignUpFormData>(validationResult.error);

		return {
			errors: fieldErrors,
			success: false,
			data,
		};
	}

	return (
		<div className='flex flex-col items-center justify-center h-screen '>
			<form
				id='signup-form'
				action={formAction}
				className='flex flex-col items-center justify-center h-120  w-90 md:w-120 p-4 gap-4 '
			>
				<h1 className='text-2xl font-bold text-primary-contrast flex items-center gap-2'>
					<UserPlusIcon className='text-primary-contrast' strokeWidth={3} size={28} /> Criar Conta
				</h1>
				<FormInput type='text' name='email' placeholder='Email' error={emailError} defaultValue={form.data?.email} />
				<FormInput
					type='password'
					name='password'
					placeholder='Senha'
					error={passwordError}
					defaultValue={form.data?.password}
				/>
				<FormInput
					type='password'
					name='confirmPassword'
					placeholder='Confirmar Senha'
					error={confirmPasswordError}
					defaultValue={form.data?.confirmPassword}
				/>
				<FormSubmitButton label='Criar Conta' disabled={pending || isUserLoading} loading={isUserLoading} />
			</form>
		</div>
	);
}
