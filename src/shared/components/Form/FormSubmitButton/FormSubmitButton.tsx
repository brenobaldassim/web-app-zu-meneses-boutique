import { Loader2 } from 'lucide-react';

interface FormSubmitButtonProps {
	disabled: boolean;
	loading: boolean;
}

export function FormSubmitButton({ disabled, loading }: FormSubmitButtonProps) {
	return (
		<button
			className='bg-primary-contrast text-primary-contrast-text p-3 rounded-3xl hover:cursor-pointer w-full disabled:opacity-50 disabled:cursor-not-allowed'
			disabled={disabled}
		>
			{loading ? (
				<div className='flex items-center justify-center gap-2'>
					<Loader2 className='animate-spin text-primary' />
				</div>
			) : (
				'Login'
			)}
		</button>
	);
}
