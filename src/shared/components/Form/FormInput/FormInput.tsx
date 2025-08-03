import { useState } from 'react';

import { EyeIcon, EyeClosedIcon } from 'lucide-react';

interface FormInputProps {
	type: string;
	name: string;
	placeholder: string;
	error?: string;
	defaultValue?: string;
}

export function FormInput({ type, name, placeholder, error, defaultValue }: FormInputProps) {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	return (
		<div className='flex flex-col gap-1 w-full'>
			<div className='relative flex items-center gap-2 w-full'>
				<input
					type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
					name={name}
					defaultValue={defaultValue || ''}
					placeholder={placeholder}
					security={type === 'password' ? 'password' : 'text'}
					className='w-full flex items-center text-sm  focus:border-primary-contrast p-3 px-4 rounded-3xl border-2 border-secondary text-primary-contrast placeholder:text-primary-contrast/50 placeholder:text-sm '
				/>
				{type === 'password' && (
					<button
						className='absolute right-4 hover:cursor-pointer'
						type='button'
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? (
							<EyeClosedIcon size={24} className='text-primary-contrast' />
						) : (
							<EyeIcon size={24} className='text-primary-contrast' />
						)}
					</button>
				)}
			</div>
			{error && <p className='text-alert text-xs'>*{error}</p>}
		</div>
	);
}
