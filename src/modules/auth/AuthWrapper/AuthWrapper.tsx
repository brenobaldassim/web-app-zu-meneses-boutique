import { useState } from 'react';
import { Login } from '../Login';
import { SignUp } from '../SignUp';

export const AuthWrapper = () => {
	const [isLogin, setIsLogin] = useState<boolean>(true);

	const toggleMode = () => {
		setIsLogin(!isLogin);
	};

	return (
		<div className='flex flex-col items-center justify-center h-screen '>
			<div className='relative'>
				<div
					className={`transition-all duration-700 ease-in-out transform absolute inset-0 ${
						isLogin ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8  pointer-events-none'
					}`}
				>
					<Login />
				</div>

				<div
					className={`transition-all duration-700 ease-in-out transform ${
						!isLogin
							? 'opacity-100 translate-y-0  pointer-events-auto'
							: 'opacity-0 -translate-y-8  pointer-events-none'
					}`}
				>
					<SignUp />
				</div>
			</div>
			<div className='w-90 md:w-120 flex justify-end'>
				<button
					type='button'
					onClick={toggleMode}
					className='text-primary-contrast px-5 font-bold text-xs hover:cursor-pointer hover:text-primary-contrast/60 underline transition-colors duration-200'
				>
					{isLogin ? 'Não tem uma conta? Criar conta' : 'Já tem uma conta? Fazer login'}
				</button>
			</div>
		</div>
	);
};
