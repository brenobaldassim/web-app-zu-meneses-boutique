import './App.css';
import { Route, Routes } from 'react-router';
import { AuthWrapper } from './modules/auth/AuthWrapper';
import { useAuth } from './providers/AuthProvider/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { TOAST_OPTIONS } from './shared/constants';

function App() {
	const { user, isUserLoading } = useAuth();

	if (isUserLoading) {
		return (
			<div className='bg-tertiary'>
				<div className='flex items-center justify-center h-screen'>
					<Loader2 size={40} className='animate-spin text-primary-contrast' />
					<Toaster toastOptions={TOAST_OPTIONS} />
				</div>
			</div>
		);
	}

	if (!user) {
		return (
			<div className='bg-tertiary'>
				<AuthWrapper />
				<Toaster toastOptions={TOAST_OPTIONS} />
			</div>
		);
	}

	return (
		<div className='bg-tertiary'>
			<Routes>
				<Route
					path='/'
					element={
						<div className='text-2xl font-bold text-primary-contrast flex items-center justify-center h-screen'>
							Home
						</div>
					}
				/>
			</Routes>
			<Toaster toastOptions={TOAST_OPTIONS} />
		</div>
	);
}

export default App;
