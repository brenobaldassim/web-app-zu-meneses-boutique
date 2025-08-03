import { useState } from 'react';
import { Login } from '../Login';
import { SignUp } from '../SignUp';

export const AuthWrapper = () => {
	const [isLoginMode, setIsLoginMode] = useState<boolean>(true);

	const toggleMode = () => {
		setIsLoginMode(!isLoginMode);
	};

	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			{isLoginMode ? <Login /> : <SignUp />}

			<div className='mt-4 text-center'>
				<button
					type='button'
					onClick={toggleMode}
					className='text-primary-contrast hover:text-primary-contrast/80 underline transition-colors'
				>
					{isLoginMode ? 'Não tem uma conta? Criar conta' : 'Já tem uma conta? Fazer login'}
				</button>
			</div>
		</div>
	);
};
