import { FC, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { useAppDispatch } from './store/hooks';
import { toast } from 'react-toastify';
import { getTokenFromLocalStorage } from './helper/localstorage.helper';
import { AuthService } from './services/auth.service';
import { login, logout } from './store/user/userSlice';

const App: FC = () => {
	const dispatch = useAppDispatch();

	const checkAuth = async () => {
		const token = getTokenFromLocalStorage();
		try {
			if (token) {
				const data = await AuthService.getProfile();
				if (data) {
					dispatch(login(data));
				} else {
					dispatch(logout());
				}
			}
		} catch (err: any) {
			const error = err.response?.data.message;
			toast.error(error.toString());
		}
	};

	useEffect(() => {
		checkAuth();
	}, []);

	return <RouterProvider router={router} />;
};

export default App;
